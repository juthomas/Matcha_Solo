const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nameBase = require('./../datas/prenoms.json')

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

router.get('/', (req, res) => {

	console.log(nameBase[0].fields.genre);

	var result = nameBase.filter(word => word.fields.genre === "Masculin");
	result = result.filter(nameIsUnique);
	result = result.sort(sortByName);

	// for (var i = 0; i < 2000 && i < result.length; i++)
	// {
	// 	console.log(result[i].fields.prenom, "Age :", Math.floor(Math.random() * 12) + 18);
	// }

	for (var i = 0; i < 20 && i < result.length; i++) {
		var currentProfile = result[Math.floor(Math.random() * result.length)]
		console.log(currentProfile.fields.prenom,
			"Age :", Math.floor(Math.random() * 12) + 18,
			"	lat :", ((Math.random() * 120) - 40),
			"	long :", ((Math.random() * 360) - 180));
		profileName = currentProfile.fields.prenom;
		profileGender = currentProfile.fields.genre === "Masculin" ? "Male" : currentProfile.fields.genre;
		profileLocation = null;
		profilePicture = null;
		profileOld = Math.floor(Math.random() * 12) + 18;
		latitude = ((Math.random() * 120) - 40);
		longitude = ((Math.random() * 360) - 180);

		db.query("INSERT INTO Users (name, gender, location, picture, old, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?);",
			[profileName, profileGender, profileLocation, profilePicture, profileOld, latitude, longitude],
			(err, results) => {
				if (err) {
					console.log(err);
				}
				//  res.send(results);
			});
	}
	// [profileName, profileGender, profileLocation, profilePicture, profileOld],
	// (err, results) => {
	// 	console.log(err);
	// 	res.send(results);
	// });

})

module.exports = router;
