import React, {useState} from 'react'
// import "./Register.css"

import axios from 'axios'

function Register() {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const register = () => {
		console.log("click");
		axios.post("http://localhost:3001/user/register", 
		{username: username, password: password})
		.then((response) => {console.log(response)});
	}


	return (
		<div className="Register">
			<h1>Registration</h1>
			<div className="RegisterForm">
				<input type="text" placeholder="Username..." onChange={(event) => {setUsername(event.target.value)}}/>
				<input type="password" placeholder="Password...." onChange={(event) => {setPassword(event.target.value)}}/>
				<button onClick={register}>Register</button>
			</div>
		</div>
	)
}

export default Register