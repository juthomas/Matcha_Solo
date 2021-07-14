// import React from 'react'
import "./Register.css"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

import React, { useEffect, useState } from 'react'


// import axios from 'axios'

function Register() {
	const [login, setLogin] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [validationMessage, setValidationMessage] = useState("Nothing");
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');


	let history = useHistory();

	useEffect(() => {
		if (login.length < 4 && login.length > 0)
		{
			setValidationMessage("Login too short");
		}
		else if (password.length < 4 && password.length > 0)
		{
			setValidationMessage("Password too short");
		}
		else
		{
			setValidationMessage("Nothing");
		}

		// console.log("Latitude : " + latitude);
		// console.log("Longitude : " + longitude);
	}, [login, firstname, lastname, mail, password])

	const onFormSubmit = (e) => {
		e.preventDefault();
		//TODO: verifier fields
		//https://codepen.io/helloheyjess/pen/oXwzLQ
		// if (password < )
		
		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		console.log("Back Host :" + urlPrefix);
		// console.log("mail : :" + mail);
		Axios.post(urlPrefix + "/user/register", {login : login,
												firstname : firstname,
												lastname : lastname,
												mail : mail,
												password : password,
												latitude : latitude,
												longitude : longitude
											})
		.then((response) => {
			console.log("response :", response);
			if (response.data.error === true)
			{
				console.log("Error message :", response.data.message);
				setValidationMessage(response.data.message);

			}
			// else if (response.data.verified === true)
			// {
			// 	localStorage.setItem("meater-token", response.data.token);
			// 	localStorage.setItem("meater-id", response.data.id);
			// 	history.push("/loggedin/home");
			// }
			else
			{
				history.push("/mailconfirmation/" + response.data.id);
			}
		})

	}

	// const register = () => {
	// 	//TODO: verifier fields

	// 	var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
	// 	console.log("Back Host :" + urlPrefix);
	// 	// console.log("mail : :" + mail);
	// 	Axios.post(urlPrefix + "/user/register", {login : login,
	// 											firstname : firstname,
	// 											lastname : lastname,
	// 											mail : mail,
	// 											password : password})
	// 	.then((response) => {
	// 		console.log("response :", response);
	// 		if (response.data.verified === 1)
	// 		{
	// 			history.push("/loggedin/home");
	// 		}
	// 		else
	// 		{
	// 			history.push("/mailconfirmation/" + response.data.id);
	// 		}
	// 	})
	// }

	function getlocationByIp()
	{
		const URL = "https://ip.nf/me.json";

		fetch(URL, {method : "get"})
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			// console.log(data.ip.latitude);
			// console.log(data.ip.longitude);
			setLatitude(data.ip.latitude);
			setLongitude(data.ip.longitude);
		}
			)
	}

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	  };
	  function success(pos) {
		var crd = pos.coords;
		setLatitude(crd.latitude);
		setLongitude(crd.longitude);
	  }
	  
	  function errors(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		  getlocationByIp();
	  }

	useEffect(() => {
	  if (navigator.geolocation) {
		navigator.permissions
		  .query({ name: "geolocation" })
		  .then(function (result) {
			if (result.state === "granted") {
			  navigator.geolocation.getCurrentPosition(success, errors, options);
			} else if (result.state === "prompt") {
			  navigator.geolocation.getCurrentPosition(success, errors, options);
			} else if (result.state === "denied") {
				getlocationByIp();
			}
			result.onchange = function () {
			//   console.log(result.state);
			};
		  });
	  } else {
		alert("Sorry Not available!");
	  }
	}, [])


	

	return (
		<div className="Register">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo_1.svg"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			{/* <div className="RegisterForm">
				<input type="text" placeholder="Username..." onChange={(event) => {setUsername(event.target.value)}}/>
				<input type="password" placeholder="Password...." onChange={(event) => {setPassword(event.target.value)}}/>
				<button onClick={register}>Register</button>
			</div> */}
			<div className="buttons">
				<form onSubmit={onFormSubmit}>
					<Input placeholder="Login" onChange={(event) => {setLogin(event.target.value)}}/>
					<Spacer height="30px"/>
					<Input placeholder="Firstname" onChange={(event) => {setFirstname(event.target.value)}}/>
					<Spacer height="30px"/>
					<Input placeholder="Lastname" onChange={(event) => {setLastname(event.target.value)}}/>
					<Spacer height="30px"/>
					<Input placeholder="Mail" onChange={(event) => {setMail(event.target.value)}}/>
					<Spacer height="30px"/>
					<Input placeholder="Password" type="password" onChange={(event) => {setPassword(event.target.value)}}/>
					{/* <Spacer height="60px"/> */}
					<p style={validationMessage === "Nothing" ? {visibility:"hidden"} : {}} className="validationMessage">{validationMessage}</p>
					{/* <Button text="Register" onClick="/mailconfirmation"/> */}
					<button type="submit" className="ButtonStyle">Register</button>
				</form>
			</div>
		</div>
	)
}

export default Register