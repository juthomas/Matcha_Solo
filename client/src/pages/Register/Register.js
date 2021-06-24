// import React from 'react'
import "./Register.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

import React, { useState } from 'react'


// import axios from 'axios'

function Register() {
	const [login, setLogin] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	let history = useHistory();


	const register = () => {
		//TODO: verifier fields

		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		console.log("Back Host :" + urlPrefix);
		// console.log("mail : :" + mail);
		Axios.post(urlPrefix + "/user/register", {login : login,
												firstname : firstname,
												lastname : lastname,
												mail : mail,
												password : password})
		.then((response) => {
			console.log("response :", response);
			if (response.data.verified === 1)
			{
				history.push("/loggedin/home");
			}
			else
			{
				history.push("/mailconfirmation/" + response.data.id);
			}
			

			// history.push("/mailconfirmation");
			// console.log(response);
			// if (response.data.loggedIn)
			// {
			// 	// localStorage.setItem("loggedIn", true);
			// 	setLoggedIn(true);
			// 	// localStorage.setItem("mail", response.data.mail);
			// 	setLocalMail(response.data.mail);
			// 	history.push("/loggedin/home");
			// }
		})
	}


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
			<div className="buttons" >
				<Input placeholder="Login" onChange={(event) => {setLogin(event.target.value)}}/>
				<Spacer height="30px"/>
				<Input placeholder="Firstname" onChange={(event) => {setFirstname(event.target.value)}}/>
				<Spacer height="30px"/>
				<Input placeholder="Lastname" onChange={(event) => {setLastname(event.target.value)}}/>
				<Spacer height="30px"/>
				<Input placeholder="Mail" onChange={(event) => {setMail(event.target.value)}}/>
				<Spacer height="30px"/>
				<Input placeholder="Password" type="password" onChange={(event) => {setPassword(event.target.value)}}/>
				<Spacer height="60px"/>
				{/* <Button text="Register" onClick="/mailconfirmation"/> */}
				<button className="ButtonStyle" onClick={register}>Register</button>
			</div>
		</div>
	)
}

export default Register