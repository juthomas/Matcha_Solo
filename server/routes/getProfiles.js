const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req,res) => {
	console.log(req.body)

	db.query("SELECT * FROM Users LIMIT ? OFFSET ?",
	[req.body.limit, req.body.offset], (err, results) => {
	// db.query("SELECT * FROM Users", (err, results) => {
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