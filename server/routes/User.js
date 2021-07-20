const express = require("express");
const router = express.Router();
const db = require("../config/db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const saltRounds = 10;
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, 'public')
  },
  filename: function (req, file, cb) {
	cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage }).array('file')

router.post("/login", async (req, res) => {
	console.log("Login page");
	const login = req.body.login;
	const password = req.body.password;

	db.query(
		"SELECT * FROM Users WHERE username = ?",
		[login],
		async (err, results) => {
			if (err) {
				console.log("Error : " + err);
			}
			if (results.length) {
				const comparaison = await bcrypt.compare(password, results[0].password);
				if (comparaison) {
					if (results[0].mail_verified === 0) {
						res.json({
							error: true,
							message: "mail not verified",
							id: results[0].id,
						});
					} else {
						// res.json({
						// 	error: false,
						// 	login: login,
						// 	id: results[0].id,
						// 	token: jwt.sign(
						// 		{ userId: results[0].id },
						// 		process.env.TOKEN_SECRET,
						// 		{ expiresIn: "2h" }
						// 	),
						// });

						db.query(
							"UPDATE Users SET lastConnection = ? WHERE id = ?",
							[getFormattedLocalTime(),results[0].id],
							(err2) => {
								if (err2) {
									console.log(err2);
								}
								res.json({
									error: false,
									login: login,
									id: results[0].id,
									token: jwt.sign(
										{ userId: results[0].id },
										process.env.TOKEN_SECRET,
										{ expiresIn: "2h" }
									)
								});
							}
						);



					}
				} else {
					res.json({ error: true, message: "Bad login/password" });
				}
			} else {
				res.json({ error: true, message: "Login doesnt exist" });
			}
		}
	);
});

router.post("/deleteuser", (req, res) => {
	db.query("DELETE FROM Users WHERE id = ?", [id], (err, results) => {
		if (err) {
			console.log(err);
		}
		console.log(results.affectedRows);
	});
});

router.post("/maillink", (req, res) => {
	const id = req.body.id;

	console.log("confirmation id :", id);
	db.query(
		"UPDATE Users SET mail_verified = 1 WHERE id = ?",
		[id],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			res.send({
				error: false,
				result: results.affectedRows,
				id: id,
				token: jwt.sign({ userId: id }, process.env.TOKEN_SECRET, {
					expiresIn: "2h",
				}),
			});
			console.log(results.affectedRows);
		}
	);
});

router.post("/getconfirmationinfo", (req, res) => {
	const id = req.body.id;

	db.query("SELECT * FROM Users WHERE id = ?", [id], (err, results) => {
		if (err) {
			console.log(err);
		} else {
			if (results[0].mail_verified === 1) {
				res.send({
					error: false,
					verified: 1,
					id: results[0].id,
					token: jwt.sign({ userId: results[0].id }, process.env.TOKEN_SECRET, {
						expiresIn: "2h",
					}),
				});
			} else {
				res.send({ error: false, verified: 0 });
			}
		}
	});
});

router.post("/resetcredentials", (req, res) => {
	const mail = req.body.mail;
	var urlPrefix = req.protocol + "://" + req.hostname + ":3000";

	console.log("Mail : " + mail);
	if (
		!(
			req.body.mail.indexOf("@") > 0 &&
			req.body.mail.indexOf("@") + 1 < req.body.mail.lastIndexOf(".") &&
			req.body.mail.lastIndexOf(".") + 2 < req.body.mail.length
		)
	) {
		res.send({ error: true, message: "Incorrect mail" });
		return;
	}
	db.query("SELECT * FROM Users WHERE mail = ?", [mail], (err, results) => {
		if (err) {
			console.log(err);
			res.send({ error: true, message: "SQL error" });
		}
		if (!results.length) {
			res.send({ error: true, message: "Mail doesnt exist" });
		} else {
			let code =
				Math.floor(Math.random() * 88888) + 11111 + "_" + results[0].id;

			db.query(
				"UPDATE Users SET reset_code = ? WHERE id = ?",
				[code, results[0].id],
				(err2, results2) => {
					if (err2) {
						console.log(err2);
						res.send({ error: true, message: "SQL error" });
					}
					if (results2) {
						sendResetMail(urlPrefix, mail, code);
						res.send({ error: false, message: results[0].id });
					}
				}
			);
		}
	});
});

router.post("/setpassword", async (req, res) => {
	const id = req.body.id;
	const code = req.body.code;

	const password = await bcrypt.hash(req.body.password, saltRounds);

	console.log("Set password");
	console.log("id : " + id);
	console.log("code : " + code);
	console.log("password : " + password);

	if (req.body.password.length < 4) {
		res.send({ error: true, message: "Password too short" });
		return;
	}

	db.query("SELECT * FROM Users WHERE id = ?", [id], (err1, results1) => {
		if (err1) {
			console.log(err1);
			res.send({ error: true, message: "SQL error" });
		}
		if (results1[0].reset_code === code) {
			db.query(
				"UPDATE Users SET password = ? WHERE id = ?",
				[password, id],
				(err2, results2) => {
					if (err2) {
						console.log(err2);
						res.send({ error: true, message: "SQL error" });
					}
					if (results2.affectedRows === 1) {
						res.send({
							error: false,
							id: results1[0].id,
							token: jwt.sign(
								{ userId: results1[0].id },
								process.env.TOKEN_SECRET,
								{ expiresIn: "2h" }
							),
						});
					}
				}
			);
		} else {
			//Code doesnt match
			res.send({ error: true, message: "Bad page url" });
		}
	});
});

router.post("/mailconfirmation", (req, res) => {
	const id = req.body.id;
	const code = req.body.code;

	console.log("Confirmation");

	db.query("SELECT * FROM Users WHERE id = ?", [id], (err1, results1) => {
		if (err1) {
			console.log(err1);
			res.send({ error: true, message: "SQL error" });
		}
		if (results1[0].verification_code === code) {
			db.query(
				"UPDATE Users SET mail_verified = 1 WHERE id = ?",
				[id],
				(err2, results2) => {
					if (err2) {
						console.log(err2);
						res.send({ error: true, message: "SQL error" });
					}
				}
			);
		}
		res.send({ result: results1[0].verification_code === code ,
			id: results1[0].id,
			token: jwt.sign(
				{ userId: results1[0].id },
				process.env.TOKEN_SECRET,
				{ expiresIn: "2h" }
			),});
	});
	// res.send("OK");
});

function sendResetMail(urlPrefix, mail, code) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	//   var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
	var resetLink = urlPrefix + "/setpassword/" + code;

	var mailOptions = {
		from: "Meater",
		to: mail,
		subject: "Meater Reset Password",
		html: `<a href='${resetLink}'>
		Click on this link to reset your password
		</a>`,
		text: "Click on this link to reset your password",
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

function sendConfonfirmationMail(urlPrefix, mail, login, id, code) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	//   var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
	var confirmationLink = urlPrefix + "/maillink/" + id;

	var mailOptions = {
		from: "Meater",
		to: mail,
		subject: "Registration to Meater (" + login + ")",
		html: `<a href='${confirmationLink}'>
		Click on this link to confirm your mail
		</a> <p>Or enter this code in app : ${code} </p>`,
		text: "Click on this link to confirm your mail",
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

/**
 * Get Formatted time as :
 * YYYY-MM-DD HH:MM:SS
 * @return string
 */
function getFormattedLocalTime()
{
	let date_object = new Date();
	let date = ("0" + date_object.getDate()).slice(-2);
	let month = ("0" + (date_object.getMonth() + 1)).slice(-2);
	let year = date_object.getFullYear();
	let hours =  ("0" + date_object.getHours()).slice(-2);
	let minutes =  ("0" + date_object.getMinutes()).slice(-2);
	let seconds =  ("0" + date_object.getSeconds()).slice(-2);

	return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

router.post("/register", async (req, res) => {
	console.log("register button");

	// console.log(req.protocol)
	// console.log(req.hostname)
	var urlPrefix = req.protocol + "://" + req.hostname + ":3000";
	console.log(urlPrefix);

	const login = req.body.login;
	const firsname = req.body.firstname;
	const lastname = req.body.lastname;
	const mail = req.body.mail;
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;


	if (req.body.login.length < 4) {
		res.send({ error: true, message: "Login too short" });
		return;
	}

	if (req.body.firstname.length < 1) {
		res.send({ error: true, message: "First blank" });
		return;
	}

	if (req.body.lastname.length < 1) {
		res.send({ error: true, message: "Lastname blank" });
		return;
	}

	if (
		!(
			req.body.mail.indexOf("@") > 0 &&
			req.body.mail.indexOf("@") + 1 < req.body.mail.lastIndexOf(".") &&
			req.body.mail.lastIndexOf(".") + 2 < req.body.mail.length
		)
	) {
		res.send({ error: true, message: "Incorrect mail" });
		return;
	}

	if (req.body.password.length < 4) {
		res.send({ error: true, message: "Password too short" });
		return;
	}

	if (req.body.latitude === '' || req.body.longitude === '')
	{
		res.send({ error: true, message: "Please wait, we are tracking you" });
		return;
	}


	const password = await bcrypt.hash(req.body.password, saltRounds);
	var id = 0;
	var code = Math.floor(Math.random() * 8888) + 1111;

	db.query("SELECT * FROM Users WHERE mail = ?", [mail], (err1, results1) => {
		if (err1) {
			console.log(err1);
		}
		if (!results1.length) {
			db.query(
				"SELECT * FROM Users WHERE username = ?",
				[login],
				(err3, results3) => {
					if (err3) {
						console.log(err3);
						res.send({ error: true, message: "SQL error" });
					}
					if (!results3.length) {
						db.query(
							"INSERT INTO Users (username, name, lastname, mail, password, verification_code, latitude, longitude, dateOfCreation, lastConnection) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
							[login, firsname, lastname, mail, password, code, latitude, longitude, getFormattedLocalTime(), getFormattedLocalTime()],
							(err2, results2) => {
								if (err2) {
									console.log(err2);
									res.send({ error: true, message: "SQL error" });
								}
								sendConfonfirmationMail(
									urlPrefix,
									mail,
									login,
									results2.insertId,
									code
								);
								res.send({ verified: false, id: results2.insertId });
							}
						);
					} else {
						res.send({ error: true, message: "Login allready taken" });
					}
				}
			);
		} else {
			res.send({ error: true, message: "Mail allready registred" });
		}
	});
});

router.post("/get_profile", (req, res) => {
	console.log("get profile");
	const userId = req.body.userId;
	var profileData = [];
	console.log(userId);
	db.query("SELECT * FROM Users WHERE id = ?", [userId],
	(err, results) => {
		var popularity = "";
		var orientation = "";

		if(results.numberofLikes > 10000000)
			popularity = "Worshipped Galactic Entity 🐙";
		else if(results.numberofLikes > 1000)
			popularity = "Dad";
		else if(results.numberofLikes > 500)
			popularity = "King of Kings";
		else if(results.numberofLikes > 100)
			popularity = "Masterchief";
		else if(results.numberofLikes > 50)
			popularity = "Star";
		else if(results.numberofLikes > 15)
			popularity = "Amongus";
		else if(results.numberofLikes > 5)
			popularity = "Adventurer";
		else
			popularity = "NewComer";

			profileData = 
		{
			name:results[0].name,
			gender : results[0].gender,
			orientation : results[0],orientation,
			age : results[0].age,
			city : "FSB 94120",
			lastConnexion: results[0].lastConnexion,
			images : 
			[
				results[0].image1,
				results[0].image2,
				results[0].image3,
				results[0].image4,
				results[0].image5,
			],
			size: results[0].size,
			inspiration : results[0].inspiration,
			technique : results[0].technique,
			surname : results[0].surname,
			description : results[0].description,
			htags: results[0].htags,
			popularity : popularity,
		};
		//console.log(results[0]);
		//console.log(profileData);
		res.json(profileData);
	});
})


router.post("/get_relationships", (req, res) => {
	console.log("get relations");
	const userId = req.body.userId;
	var relationshipsData = [];
	var relationshipsIds = [];

	db.query(
		"SELECT * FROM Relationships WHERE user_id = ?",
		[userId],
		(err, results) => {
			if (err) {
				console.log(err);
				res.send({ error: true, message: "SQL error" });
			}
			if (results.length) {
				results.forEach((elem) => {
					relationshipsIds.push(elem.partner_id);
				});
			}

			var whereIn = "(";
			for (var i in relationshipsIds) {
				if (i != relationshipsIds.length - 1) {
					whereIn += "'" + relationshipsIds[i] + "',";
				} else {
					whereIn += "'" + relationshipsIds[i] + "'";
				}
			}
			whereIn += ")";
			db.query(
				"SELECT * FROM Users WHERE id IN " + whereIn,
				[],
				(err2, results2) => {
					if (err2) {
						console.log(err2);
						res.send({ error: true, message: "SQL error" });
					}
					results2.map((result) => {
						relationshipsData.push({
							id: result.id,
							name: result.name,
							old: result.old,
							gender: result.gender,
							latitude: result.latitude,
							longitude: result.latitude,
						});
					});
				});
				console.log(relationshipsData);
				res.json(relationshipsData);
			});
		});

router.post("/get_previews", (req, res) =>
{
	const userId = req.body.userId;
	const nameBegin = req.body.nameBegin;
	var previewDatas = [];
	var UsersIds = [];
	var messageDatas = [];
	var index = 0;
	db.query("SELECT  * FROM ( SELECT  *, ROW_NUMBER() OVER (PARTITION BY friend_id ORDER BY time_stamp DESC) rn FROM messages WHERE (receiver_id = ? OR sender_id = ?)) x WHERE x.rn = 1", [userId, userId],
	(err, results) => {
		if (err) {
			console.log(err);
		}
		if (results) {
			results.forEach((elem) => {
				UsersIds.push(elem.receiver_id == userId ? elem.sender_id : elem.receiver_id);
				messageDatas.push(elem.Message);
			})
		}
		var whereIn = '(';
			for (var i in UsersIds) {
				if (i != UsersIds.length - 1) {
					whereIn += "'" + UsersIds[i] + "',";
				}
				else {
					whereIn += "'" + UsersIds[i] + "'";
				}
			}
			whereIn += ')';
			console.log(whereIn);
			db.query("SELECT * FROM Users WHERE id IN " + whereIn, (err2, results2) => {
				if (err) {
					console.log(err);
				}
				if(results2)
				{

					results2.forEach((elem) => {
						if(nameBegin.nameBegin === "" || elem.name.startsWith(nameBegin.nameBegin))
						{
						previewDatas.push({
						id: elem.id,
						message: messageDatas[index],
						name: elem.name,
						src: elem.image1,
						lastConnexion : elem.lastConnexion,
						});
					}
						index++;
					})
				}
				db.query("SELECT * FROM Users WHERE (id NOT IN " + whereIn + " AND EXISTS (SELECT * FROM Relationships WHERE ((user1_id = id AND Relationships.user2_id = ?) OR (Relationships.user1_id = ? AND Relationships.user2_id = id)))", [userId, userId], (err2, results3) => {
					if(err)
						console.log(err)
					if(results3)
					{
						results3.forEach((elem) => {
							if(nameBegin.nameBegin === "" || elem.name.startsWith(nameBegin.nameBegin))
							{
							previewDatas.push({
							id: elem.id,
							message: "Begin a conversation with " + elem.name,
							name: elem.name,
							src: elem.image1,
							lastConnexion : elem.lastConnexion,
							});
						}
					}
				)}
			})
			console.log(previewDatas);
			res.json(previewDatas);
		})
	});
})

router.post("/get_messages", (req, res) => {
	console.log("get messages");
	const userId = req.body.userId;
	const friendId = req.body.friendId;
	var messageData = [];

	db.query("SELECT * FROM messages WHERE   (receiver_id = ? AND sender_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY time_stamp", [userId, friendId, userId, friendId],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			if (results.length) {
				results.forEach((elem) => {
					messageData.push({
						id: elem.sender_id,
						message: elem.Message,
						name: elem.receiver_name == userId ? elem.sender_name : elem.receiver_name,
					});
				})
			}
				console.log(messageData);
				res.json(messageData);
			});
})

router.post('/upload', (req, res) => {

    upload(req, res, function (err) {
		
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
		   }
      return res.status(200).send(req.file)
    })
});

router.post("/update_profile", (req, res) => {
	console.log("modify profile");
	const userId = req.body.userId;
	console.log(req.body.image2);
	db.query("UPDATE Users SET gender = ?, orientation = ?, size = ?, inspiration = ?, technique = ?, surname = ?, age = ?, description = ?, htags = ?, image1 = ?, image2 = ?, image3 = ? WHERE (id = ?)",
			[req.body.gender, req.body.orientation, req.body.size, req.body.inspiration, req.body.technique, req.body.surname,req.body.age, req.body.description, req.body.htags, req.body.image1, req.body.image2, req.body.image3, userId],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			});
})

router.post("/send_message", (req, res) => {
	console.log("send message");
	const userId = req.body.userId;
	const friendId = req.body.friendId.currentChatId;
	const message = req.body.message.newMessage;
	const name = req.body.name;
	console.log(message);
	db.query("SELECT idRelationships FROM Relationships WHERE ((user_id = ? AND partner_id = ?) OR (user_id = ? AND partner_id = ?)) ",
			[userId, friendId, friendId, userId],
		(err, results) => {
			console.log(results[0].idRelationships);
			db.query("INSERT INTO Messages (sender_id, receiver_id, Message, friend_id) VALUES (?, ?, ?, ?);",
			[userId, friendId, message, results[0].idRelationships],
			(err2, results2) => {
				if (err) {
					console.log(err);
				}
			});
	if (err) {
		console.log(err);
	}
	});

})


// router.pos

module.exports = router;
