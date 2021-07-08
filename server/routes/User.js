const express = require('express');
const router = express.Router();
const db = require("../config/db");
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const saltRounds = 10;
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


router.post("/login", async(req, res) => {
	console.log("Login page");
	const mail = req.body.mail;
	const password = req.body.password;
	
	// console.log("Wsh mail : " + mail);
	db.query("SELECT * FROM Users WHERE mail = ?", [mail],
	async (err, results) => {
		if (err) {
			console.log(err);
		}
		if (results.length) {
			const comparaison = await bcrypt.compare(password, results[0].password);
			if (comparaison) {
				console.log(results[0])
				if (results[0].mail_verified === 0)
				{
					res.json({ error: true, message: "mail not verified" , id: results[0].id});
				}
				else
				{
					res.json({ error: false, mail: mail });
				}
			}
			else {
				res.json({ error: true, message: "Bad mail/password" });
			}
		}
		else {
			res.json({ error: true, message: "mail doesnt exist" });
		}
		console.log(err);
	});
})

router.post("/maillink", (req, res) => {
	const id = req.body.id;

	console.log("confirmation id :", id);
	db.query("UPDATE Users SET mail_verified = 1 WHERE id = ?",[id],
	(err, results) => {
		if (err)
		{
			console.log(err);
		}
		res.send({result: results.affectedRows})
		console.log(results.affectedRows);
	});
})

router.post("/getconfirmationinfo", (req, res) => {
	const id = req.body.id;
	// console.log
	db.query("SELECT * FROM Users WHERE id = ?", [id], (err, result) => {
		if (err)
		{
			console.log(err);
		}
		else
		{
			console.log("mail verified : " + result[0].mail_verified);
			res.send({verified : result[0].mail_verified});
		}
	})

})

router.post("/mailconfirmation", (req, res) => {
	const id = req.body.id;
	const code = req.body.code;

	console.log("Confirmation")

	db.query("SELECT * FROM Users WHERE id = ?", [id],
	(err1, results1) => {
		if (err1)
		{
			console.log(err1);
		}
		if (results1[0].verification_code === code)
		{
			db.query("UPDATE Users SET mail_verified = 1 WHERE id = ?",[id],
			(err2, results2) => {
				if (err2)
				{
					console.log(err2);
				}
				console.log(results2.affectedRows);
			});
		}


		res.send({result : results1[0].verification_code === code});
	})
	// res.send("OK");
})

function sendMail(urlPrefix, mail, login, id, code)
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
		</a> <p>Or enter this code in app : ${code} </p>`,
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

	if (req.body.login.length < 4)
	{
		res.send({error : 1, message : "Login too short"});
		return ;
	}
	
	if (req.body.firstname.length < 1)
	{
		res.send({error : 1, message : "First blank"});
		return ;
	}
	
	if (req.body.lastname.length < 1)
	{
		res.send({error : 1, message : "Lastname blank"});
		return ;
	}
	
	if (req.body.password.length < 4)
	{
		res.send({error : 1, message : "Password too short"});
		return ;
	}

	if (!(req.body.mail.indexOf('@') > 0
		&& req.body.mail.indexOf('@') + 1 < req.body.mail.lastIndexOf('.')
		&& req.body.mail.lastIndexOf('.') + 2 < req.body.mail.length
		))
	{
		res.send({error : 1, message : "Incorrect mail"});
		return ;
	}



	const password = await bcrypt.hash(req.body.password, saltRounds); ;
	var id = 0;
	var code = Math.floor(Math.random() * 8888) + 1111;

	db.query("SELECT * FROM Users WHERE mail = ?", [mail],
		(err1, results1) => {
			if (err1)
			{
				console.log(err1);
			}
			if (!results1.length)
			{
				db.query("SELECT * FROM Users WHERE username = ?", [login],
				(err3, results3) => {
					if (!results3.length)
					{

						db.query("INSERT INTO Users (username, name, lastname, mail, password, verification_code) VALUES (?, ?, ?, ?, ?, ?);",
						[login, firsname, lastname, mail, password, code],
						(err2, results2) => {
							if (err2)
							{
								console.log(err2);
							}
							console.log("New id :", results2.insertId);
							
							sendMail(urlPrefix, mail, login, results2.insertId, code);
							res.send({verified: 0, id : results2.insertId});
							
						});
					}
					else
					{
						res.send({error : 1, message : "Login allready taken"});
					}

				});


			}
			else
			{
				console.log("mail allready registred");
				if (results1[0].mail_verified === 0)
				{
					console.log("verification mail resended");
					sendMail(urlPrefix, mail, login, results1[0].id, results1[0].verification_code);
					res.send({verified : 0, id : results1[0].id});
				}
				else
				{
					res.send({verified : 1, id : results1[0].id});
				}
				// console.log(results1[0].mail_verified);

				// sendMail(urlPrefix, mail, login, results2.insertId);
			}

		}
	)
	// res.send("OK");
	// console.log(`Your mail is ${process.env.MAIL_USERNAME}`);
	// console.log(`Your pass is ${process.env.MAIL_PASSWORD}`);
	


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