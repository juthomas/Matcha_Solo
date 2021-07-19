const mysql = require('mysql2');

const db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'Maisjolepro94120',
	database : 'Meater'
});

module.exports = db;