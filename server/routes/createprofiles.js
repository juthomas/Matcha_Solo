const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nameBase = require('./../datas/prenoms.json')
const bcrypt = require('bcrypt');
const saltRounds = 10;

function nameIsUnique(item, position, array) {
	pos = array.map(function (e) { return e.fields.prenom; }).indexOf(item.fields.prenom);
	return pos === position;
}

function sortByName(a, b) {
	if (a.fields.prenom < b.fields.prenom) {
		return -1;
	}
	if (a.fields.prenom > b.fields.prenom) {
		return 1;
	}
	return 0;
}
//http://localhost:3001/create_profiles
router.get('/', async (req, res) => {

	db.query("DELETE FROM Users;",
			[],
			(err, results) => {
				if (err) {
					console.log(err);
				}
				//  res.send(results);
			});

	console.log(nameBase[0].fields.genre);

	var result = nameBase.filter(word => word.fields.genre === "Masculin");
	result = result.filter(nameIsUnique);
	result = result.sort(sortByName);

	// for (var i = 0; i < 2000 && i < result.length; i++)
	// {
	// 	console.log(result[i].fields.prenom, "Age :", Math.floor(Math.random() * 12) + 18);
	// }
	var lastname = ""
	// var lastnameI = Math.floor(Math.random() * 7);



	for (var i = 0; i < 20 && i < result.length; i++) {
		switch (Math.floor(Math.random() * 7)) {
			case 0:
				lastname = "Lundi";
				break;
			case 1:
				lastname = "Mardi";
				break;
			case 2:
				lastname = "Mercredi";
				break;
			case 3:
				lastname = "Jeudi";
				break;
			case 4:
				lastname = "Vendredi";
				break;
			case 5:
				lastname = "Samedi";
				break;
			case 6:
				lastname = "Dimanche";
				break;
			default:
				lastname = "Unnamed";
		}
		var currentProfile = result[Math.floor(Math.random() * result.length)]
		console.log(currentProfile.fields.prenom,
			"Age :", Math.floor(Math.random() * 12) + 18,
			"	lat :", ((Math.random() * 120) - 40),
			"	long :", ((Math.random() * 360) - 180));
		profileName = currentProfile.fields.prenom;
		profileLastname = lastname;
		profileUsername = profileName.toLocaleLowerCase().substr(0, 2) + lastname.toLocaleLowerCase();
		profileGender = currentProfile.fields.genre === "Masculin" ? "Male" : currentProfile.fields.genre;
		profileLocation = null;
		profilePicture = null;
		profileOld = Math.floor(Math.random() * 12) + 18;
		latitude = ((Math.random() * 120) - 40);
		longitude = ((Math.random() * 360) - 180);
		profileMail = currentProfile.fields.prenom + "@gmail.com";
		profilePassword = await bcrypt.hash(currentProfile.fields.prenom + "MDP", saltRounds);

		db.query("INSERT INTO Users (mail, password, name, username, lastname, gender, location, picture, old, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
			[profileMail, profilePassword, profileName, profileUsername, profileLastname, profileGender, profileLocation, profilePicture, profileOld, latitude, longitude],
			(err, results) => {
				if (err) {
					console.log(err);
				}
				//  res.send(results);
			});
	}


	db.query("INSERT INTO Users (mail, password, name, username, lastname, gender, location, picture, old, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
	["root", "root", "root", "root", "root", "male", "", "", 25, -24, 11],
	(err, results) => {
		if (err) {
			console.log(err);
		}
		//  res.send(results);
	});

	// [profileName, profileGender, profileLocation, profilePicture, profileOld],
	// (err, results) => {
	// 	console.log(err);
	// 	res.send(results);
	// });

})

module.exports = router;
