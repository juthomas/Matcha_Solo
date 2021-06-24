const express = require('express');
const router = express.Router();
const db = require("../config/db");

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
			else {
				res.json({ loggedIn: false, message: "mail doesnt exist" });
			}
			console.log(err);
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
	var relationshipsIds = [];
	var currentName = "";
	db.query("SELECT a.id, a.Message, a.sender, a.receiver, a.friend_id FROM Messages a LEFT JOIN Messages b ON (a.friend_id = b.friend_id AND a.id < b.id) WHERE b.id is null AND (a.sender = 1 OR a.receiver = 1) ORDER BY a.id DESC	", [userId, userId, userId],
	(err, results) => {
		if (err) {
			console.log(err);
		}
		if (results.length) {
		
		}
	})
}
);

router.post("/get_messages", (req, res) => {
	console.log("get messages");
	const userId = req.body.userId;
	const friendId = req.body.friendId;
	var messageData = [];

	db.query("SELECT  * FROM messages WHERE   (receiver_id = ? AND sender_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY time_stamp", [userId, friendId, userId, friendId],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			if (results.length) {
				results.forEach((elem) => {
					messageData.push({
						id: elem.sender_id,
						message: elem.Message,
						name: elem.receiver_name
					});
				})
			}
				console.log(messageData);
				res.json(messageData);
			});
})

router.post("/send_message", (req, res) => {
	console.log("send message");
	const userId = req.body.userId;
	const friendId = req.body.friendId;
	const message = req.body.message.newMessage;
	const name = req.body.name;
	console.log(message);
	db.query("INSERT INTO Messages (sender_id, receiver_id, Message) VALUES (?, ?, ?);",
			[userId, friendId, message, name],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			});
})


// router.pos

module.exports = router;