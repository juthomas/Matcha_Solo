const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('./auth');
const jwt = require('jsonwebtoken');


router.post('/', auth, (req,res) => {
	// console.log(req.body)
	// console.log(req)


	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const userId = decodedToken.userId;
	console.log("Token : " + token);
	console.log("id : " + userId);

	
	var min_age = 18;
	var max_age = 20;
	var min_likes = 0;
	var max_likes = 1000000;


	db.query("SELECT * FROM Users WHERE id = ?", [userId], (err1, results1) => {
		if (err1)
		{
			console.log(err1)
		}
		else
		{
			if (results1[0].min_age)
			{
				min_age = results1[0].min_age;
			}
			if (results1[0].max_age)
			{
				max_age = results1[0].max_age;
			}
			if (results1[0].min_likes)
			{
				min_likes = results1[0].min_likes;
			}
			if (results1[0].max_likes)
			{
				max_likes = results1[0].max_likes;
			}

			var sql_query = "";
			// SI Orientation == hetero et Gender == Male > search Gender == female && orientation == bisexual || hetero
			if (results1[0].orientation === "Heterosexual" && results[0].gender === "Male")
			{
				sql_query = "SELECT * FROM Users WHERE (age >= ? AND age <= ?) AND (number_of_likes >= ? AND number_of_likes <= ?) " +
				"AND (gender = 'Female') AND (orientation = 'Bisexual' OR orientation = 'Heterosexual') LIMIT ? OFFSET ?";
			}
			// SI Orientation == hetero et Gender == Female > search Gender == male && orientation == bisexual || hetero
			else if (results1[0].orientation === "Heterosexual" && results[0].gender === "Female")
			{
				sql_query = "SELECT * FROM Users WHERE (age >= ? AND age <= ?) AND (number_of_likes >= ? AND number_of_likes <= ?) " +
				"AND (gender = 'Male') AND (orientation = 'Bisexual' OR orientation = 'Heterosexual') LIMIT ? OFFSET ?";
			}
			// SI Orientation == Homo et Gender == Male > search Gender == male && orientation == bisexual || homo
			else if (results1[0].orientation === "Homosexual" && results[0].gender === "Male")
			{
				sql_query = "SELECT * FROM Users WHERE (age >= ? AND age <= ?) AND (number_of_likes >= ? AND number_of_likes <= ?) " +
				"AND (gender = 'Male') AND (orientation = 'Bisexual' OR orientation = 'Homosexual') LIMIT ? OFFSET ?";
			}
			// SI Orientation == Homo et Gender == Female > search Gender == female && orientation == bisexual || homo
			else if (results1[0].orientation === "Homosexual" && results[0].gender === "Female")
			{
				sql_query = "SELECT * FROM Users WHERE (age >= ? AND age <= ?) AND (number_of_likes >= ? AND number_of_likes <= ?) " +
				"AND (gender = 'Female') AND (orientation = 'Bisexual' OR orientation = 'Homosexual') LIMIT ? OFFSET ?";
			}
			// SI Orientation == bisexual et Gender == Male > search (Gender == male && orientation == bisexual || homo) ||
			//														(Gender == female && orientation == bisexual || hetero)
			else if (results1[0].orientation === "Bisexual" && results[0].gender === "Male")
			{
				sql_query = "SELECT * FROM Users WHERE (age >= ? AND age <= ?) AND (number_of_likes >= ? AND number_of_likes <= ?) " +
				"AND ((gender = 'Male' AND (orientation = 'Bisexual' OR orientation = 'Homosexual')) " +
				"OR (gender = 'Female' AND (orientation = 'Bisexual' OR orientation = 'Heterosexual'))) LIMIT ? OFFSET ?";
			}
			// SI Orientation == bisexual et Gender == Female > search (Gender == female && orientation == bisexual || homo) ||
			//														(Gender == male && orientation == bisexual || hetero)
			else if (results1[0].orientation === "Bisexual" && results[0].gender === "Female")
			{
				sql_query = "SELECT * FROM Users WHERE (age >= ? AND age <= ?) AND (number_of_likes >= ? AND number_of_likes <= ?) " +
				"AND ((gender = 'Female' AND (orientation = 'Bisexual' OR orientation = 'Homosexual')) " +
				"OR (gender = 'Male' AND (orientation = 'Bisexual' OR orientation = 'Heterosexual'))) LIMIT ? OFFSET ?";
			}
			else
			{
				sql_query = "SELECT * FROM Users WHERE (age >= ? AND age <= ?) AND (number_of_likes >= ? AND number_of_likes <= ?) LIMIT ? OFFSET ?";
				console.log("No results");
				console.log("Orientation :",results1[0].orientation);
				console.log("Gender :",results1[0].gender);
				// console.log(results1[0]);
			}

			// console.log(results1);
			db.query(sql_query,
			[min_age, max_age, min_likes, max_likes, req.body.limit, req.body.offset], (err2, results2) => {
				if (err2)
				{
					console.log(err2);
				}
				else
				{
					res.send(results2);
				}
			})
		}
	})
})

router.get("/", (req, res) => {
	db.query("SELECT * FROM Users", (err, results) => {
		if (err)
		{
			console.log(err);
		}
		else
		{
			res.send(results);
		}
	})
})

module.exports = router;