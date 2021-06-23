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


// router.pos

module.exports = router;