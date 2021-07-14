const express = require("express");
const router = express.Router();
const db = require("../config/db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

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
						res.json({
							error: false,
							login: login,
							id: results[0].id,
							token: jwt.sign(
								{ userId: results[0].id },
								process.env.TOKEN_SECRET,
								{ expiresIn: "2h" }
							),
						});
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
		res.send({ result: results1[0].verification_code === code });
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
							"INSERT INTO Users (username, name, lastname, mail, password, verification_code) VALUES (?, ?, ?, ?, ?, ?);",
							[login, firsname, lastname, mail, password, code],
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
					res.json(relationshipsData);
				}
			);
		}
	);
});

// router.pos

module.exports = router;
