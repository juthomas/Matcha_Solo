const express = require('express');
const app = express();
const cors = require('cors')


app.use(cors());
app.use(express.json());

const getProfilesRoute = require("./routes/getProfiles");
app.use("/get_profiles", getProfilesRoute);

const createProfilesRoute = require("./routes/createProfiles");
app.use("/create_profiles", createProfilesRoute);

// const userRoute = require("./routes/User");
// app.use("/user", userRoute);

// const uploadRoute = require("./routes/Upload");
// app.use("/upload", uploadRoute);

app.listen(3001, (req, res) => {
	console.log("Server running");
});