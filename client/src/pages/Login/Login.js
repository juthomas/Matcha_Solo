import React, { useState } from 'react'
import "./Login.css"
// import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
// import useLocalStorage from "../../hooks/useLocalStorage"


function Login() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	// const [, setLocalMail] = useLocalStorage('login');//rm dat
	// const [, setLoggedIn] = useLocalStorage('loggedIn');//rm dat

	// const [, setToken] = useLocalStorage('token');
	// const [, setId] = useLocalStorage('id');

	const [validationMessage, setValidationMessage] = useState("Nothing");

	
	let history = useHistory();
	

	const onFormSubmit = (e) => {
		e.preventDefault();
		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		// console.log("Back Host :" + urlPrefix);
		// console.log("login : :" + login);
		Axios.post(urlPrefix + "/user/login", {login : login, password : password})
		.then((response) => {
			// console.log(response);
			if (response.data.error === false)
			{
				// console.log("Token :" + response.data.token);
				// console.log("Id :" + response.data.id);

				// console.log("login : " + response.data.login);
				// localStorage.setItem("loggedIn", true);
				// setLoggedIn(true);
				// localStorage.setItem("login", response.data.login);
				// setLocalMail(response.data.login);//RM dat
				localStorage.setItem("meater-token", response.data.token);
				localStorage.setItem("meater-id", response.data.id);

				// setToken(response.data.token);
				// setId(response.data.id);

				history.push("/loggedin/home");
			}
			else
			{
				// console.log("Error value :", response.data.error);
				// console.log("Error message :", response.data.message);
				if (response.data.message === "mail not verified")
				{
					history.push("/mailconfirmation/" + response.data.id);
				}
				else
				{
					// console.log(response);
					setValidationMessage(response.data.message);
				}
			}
		})
	}

	return (
		<div className="Login">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo_1.svg"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			<div className="broMessage">
				<p>brace yourself for</p>
				???? EPIC BROS ????
				{/* {localMail}
				{loggedIn} */}

			</div>
			<div className="buttons" >
				<form onSubmit={onFormSubmit}>
					<Input placeholder="Login" onChange={(event) => {setLogin(event.target.value)}}/>
					<Spacer height="30px"/>
					<Input placeholder="Password" type="password" onChange={(event) => {setPassword(event.target.value)}}/>
					<Spacer height="30px"/>
					<div className="forgotPassword">
						<a href="/resetcredentials">Forgot your password?</a>
					</div>
					<p style={validationMessage === "Nothing" ? {visibility:"hidden"} : {}} className="validationMessage">{validationMessage}</p>
					{/* <Spacer height="60px"/> */}
					{/* <Button text="login" onClick="/loggedin/home"/> */}
					{/* Problem here */}
					<button type="submit" className="ButtonStyle">login</button>
				</form>
			</div>
		</div>
	)
}

export default Login
