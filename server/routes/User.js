const express = require('express');
const router = express.Router();
const db = require("../config/db");
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

// const mysql2 = require('mysql2/promise');



// const async = require('async')

router.post("/login", (req, res) => {
	console.log("Login page");
	const mail = req.body.mail;
	const password = req.body.password;

	// console.log("Wsh mail : " + mail);
	db.query("SELECT * FROM Users WHERE mail = ?", [mail],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			if (results.length) {
				if (results[0].password === password) {
					res.json({ loggedIn: true, mail: mail });
				}
				else {
					res.json({ loggedIn: false, message: "Bad mail/password" });
				}
			}
			else 
			{
				res.json({ loggedIn: false, message: "mail doesnt exist" });
			}
			console.log(err);
		});
})

router.post("/get_profile", (req, res) => {
	console.log("get profile");
	const userId = req.body.userId;
	var profileData = [];
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

		if(results[0].orientation >= 0)
		{
			if(results[0].orientation > 1)
				orientation = "Male";
			else if(results[0].orientation == 1)
				orientation = "Female";
			else
				orientation = "No Binary";
		}
		else
			orientation = "Undefined";
			profileData = 
		{
			name:results[0].name,
			gender : results[0].gender,
			orientation : orientation,
			age : results[0].age,
			city : "FSB 94120",
			lastConnexion: results[0].lastConnexion,
			image1: results[0].image1,
			image2:  results[0].image2,
			image3:  results[0].image3,
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

	db.query("SELECT * FROM Relationships WHERE user_id = ?", [userId],
		(err, results) => {


			if (err) {
				console.log(err);
			}
			if (results.length) {
				results.forEach((elem) => {
					relationshipsIds.push(elem.partner_id);

				})
			}

			var whereIn = '(';
			for (var i in relationshipsIds) {
				if (i != relationshipsIds.length - 1) {
					whereIn += "'" + relationshipsIds[i] + "',";
				}
				else {
					whereIn += "'" + relationshipsIds[i] + "'";
				}
			}
			whereIn += ')';
			db.query("SELECT * FROM Users WHERE id IN " + whereIn, [], (err2, results2) => {
				results2.map((result) => {
					relationshipsData.push({
						id: result.id,
						name: result.name,
						old: result.old,
						gender: result.gender,
						latitude: result.latitude,
						longitude: result.latitude
					});
				});
				console.log(relationshipsData);
				res.json(relationshipsData);
			});
		});
})

router.post("/get_previews", (req, res) =>
{
	const userId = req.body.userId;
	var previewDatas = [];
	var UsersIds = [];
	var messageDatas = [];
	var index = 0;
	db.query("SELECT  * FROM ( SELECT  *, ROW_NUMBER() OVER (PARTITION BY friend_id ORDER BY time_stamp DESC) rn FROM messages WHERE (receiver_id = ? OR sender_id = ?)) x WHERE x.rn = 1", [userId, userId],
	(err, results) => {
		if (err) {
			console.log(err);
		}
		if (results.length) {
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
			db.query("SELECT * FROM Users WHERE id IN " + whereIn, [], (err2, results2) => {
				console.log(results2)
				if (err) {
					console.log(err);
				}
				else if(results2.length)
				{
					results2.forEach((elem) => {
						previewDatas.push({
						id: elem.id,
						message: messageDatas[index],
						name: elem.name,
						src: elem.image1,
						lastConnexion : elem.lastConnexion,
						});
						index++;
					})
					console.log(previewDatas);
					res.json(previewDatas);
				}
			})
		})
	});

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