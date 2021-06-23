const express = require('express');
const router = express.Router();
const db = require("../config/db");
const nodemailer = require('nodemailer')
// const mysql2 = require('mysql2/promise');

// The credentials for the email account you want to send mail from. 
// https://support.google.com/mail/answer/7126229?hl=fr
const mailCredentials = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
	  // These environment variables will be pulled from the .env file
	  user: process.env.MAIL_USER, 
	  pass: process.env.MAIL_PASS  
	}
}

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

function sendMail(urlPrefix, mail, login, id)
{
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: process.env.MAIL_USERNAME,
		  pass: process.env.MAIL_PASSWORD
		}
	  });
	  
	//   var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
	  var confirmationLink = urlPrefix + "/maillink/" + id;


	  var mailOptions = {
		from: 'Meater',
		to: mail,
		subject: 'Registration to Meater ('+login+')',
		html: `<a href='${confirmationLink}'>
		Click on this link to confirm your mail
      		</a> <p>Or enter this code in app : 1234 </p>`,
		text: 'Click on this link to confirm your mail'
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  });
}

router.post("/register", (req, res) => {
	console.log("register button");

	// console.log(req.protocol)
	// console.log(req.hostname)
	var urlPrefix = req.protocol + "://" + req.hostname + ":3000";
	console.log(urlPrefix);

	const login = req.body.login;
	const firsname = req.body.firstname;
	const lastname = req.body.lastname;
	const mail = req.body.mail;
	const password = req.body.password;
	
	db.query("SELECT * FROM Users WHERE mail = ?", [mail],
		(err1, results1) => {
			if (err1)
			{
				console.log(err1);
			}
			if (!results1.length)
			{
				db.query("INSERT INTO Users (username, name, lastname, mail, password) VALUES (?, ?, ?, ?, ?);",
				[login, firsname, lastname, mail, password],
				(err2, results2) => {
					if (err2)
					{
						console.log(err2);
					}
					console.log("New id :", results2.insertId);
					
					
					sendMail(urlPrefix, mail, login, results2.insertId);
				}
				);
			}
			else
			{
				console.log("mail allready registred");
				if (results1[0].mail_verified === 0)
				{
					console.log("verification mail resended");
					sendMail(urlPrefix, mail, login, results1[0].id);
				}
				// console.log(results1[0].mail_verified);

				// sendMail(urlPrefix, mail, login, results2.insertId);
			}

		}
	)

	// console.log(`Your mail is ${process.env.MAIL_USERNAME}`);
	// console.log(`Your pass is ${process.env.MAIL_PASSWORD}`);
	

	  return("");

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