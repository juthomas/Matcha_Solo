import React, {useState, useEffect} from 'react'
import "./SetPassword.css"
import Axios from 'axios'
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import {useParams} from 'react-router-dom'
import {useHistory} from 'react-router-dom'


function SetPassword() {
	let {code} = useParams();
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [validationMessage, setValidationMessage] = useState("Nothing");
	let history = useHistory();

	
	// useEffect(() => {
	// 	console.log("Code lenght : " + code.length);
	// 	console.log("Code last index of : " + code.lastIndexOf('_'));
	
	// 	if (code.lastIndexOf('_') <= 0 || code.length <= 1 + code.lastIndexOf('_'))
	// 	{
	// 		console.log("Bad code")
	// 	}
	// 	else
	// 	{
	// 		let id = code.slice( code.lastIndexOf('_') + 1);
	// 	}
		
	// }, [])

	useEffect(() => {
		setValidationMessage("Nothing");
	}, [password, passwordConfirmation])

	const onFormSubmit = (e) => {
		e.preventDefault();
		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		if (password.length < 4)
		{
			setValidationMessage("Password too short");
		}
		else if (password !== passwordConfirmation)
		{
			setValidationMessage("Passwords do not match");
		}
		else
		{
			// console.log("Code lenght : " + code.length);
			// console.log("Code last index of : " + code.lastIndexOf('_'));
		
			if (code.lastIndexOf('_') <= 0 || code.length <= 1 + code.lastIndexOf('_'))
			{
				setValidationMessage("Bad page url");
			}
			else
			{
				let id = code.slice( code.lastIndexOf('_') + 1);
				Axios.post(urlPrefix + "/user/setpassword", {id : id, 
															code : code,
															password : password})
				.then((response) => {
					console.log("response : " + response.data.error);
					if (response.data.error === false)
					{

						//
						localStorage.setItem("meater-token", response.data.token);
						localStorage.setItem("meater-id", response.data.id);
						history.push("/loggedin/home");
					}
					else
					{
						setValidationMessage(response.data.message);
					}
				})

			}
		}

	}

	return (
		<div className="SetPassword">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo_1.svg"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			<div className="setPasswordMessage">
			Enter your new password
			</div>
			<div className="buttons" >
				<form onSubmit={onFormSubmit}>
					<Input placeholder="Password" type="password" onChange={(event) => {setPassword(event.target.value)}}/>
					<Spacer height="30px"/>
					<Input placeholder="Confirm Password" type="password" onChange={(event) => {setPasswordConfirmation(event.target.value)}}/>
					<Spacer height="80px"/>
					<p style={validationMessage === "Nothing" ? {visibility:"hidden"} : {}} className="validationMessage">{validationMessage}</p>
					<Spacer height="2px"/>

					<button type="submit" className="ButtonStyle">Change Password</button>
				</form>
			</div>
		</div>
	)
}

export default SetPassword
