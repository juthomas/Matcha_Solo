const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const userId = decodedToken.userId;
	console.log("Token : " + token);
	console.log("id : " + userId);
	if (req.body.userId && req.body.userId !== userId) {
		throw 'Invalid user ID';
	} else {
		next();
	}
	} catch {
		res.send({error : true, message : "Invalid Token"});
	}
};

