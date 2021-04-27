const mysql = require('mysql2');

const db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'LeMot2PasseMYSQL',
	database : 'Meater'
});

module.exports = db;