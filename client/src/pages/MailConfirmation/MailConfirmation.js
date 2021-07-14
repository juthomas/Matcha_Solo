import React, { useState, useEffect } from 'react'
import "./MailConfirmation.css"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import {useParams, useHistory} from "react-router-dom";

import Axios from 'axios'

function MailConfirmation() {
	let { id } = useParams();
	const [code, setCode] = useState('');
	let history = useHistory();
	const [validationMessage, setValidationMessage] = useState("Nothing");


	useEffect(() => {
		setValidationMessage("Nothing");
	}, [code])

	useEffect(() => {
		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		Axios.post(urlPrefix + "/user/getconfirmationinfo", {id : id})
		.then((response) => {
			if (response.data.verified === 1)
			{
				localStorage.setItem("meater-token", response.data.token);
				localStorage.setItem("meater-id", response.data.id);
				history.push("/loggedin/home");
			}

		});
		const checkMailConfirmation = setInterval(() => {
			var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
			Axios.post(urlPrefix + "/user/getconfirmationinfo", {id : id})
			.then((response) => {
				if (response.data.verified === 1)
				{
					localStorage.setItem("meater-token", response.data.token);
					localStorage.setItem("meater-id", response.data.id);
					history.push("/loggedin/home");
				}

			})



		}, 5000);

		return () => {
			clearInterval(checkMailConfirmation);
		}
	}, [])

	const onFormSubmit = (e) => {
		e.preventDefault();
		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		console.log("Back Host :" + urlPrefix);
		// console.log("mail : :" + mail);
		Axios.post(urlPrefix + "/user/mailconfirmation", {id : id,
												code : code})
		.then((response) => {
			console.log("response :", response);
			if (response.data.result === true)
			{
				history.push("/loggedin/home");
			}
			else
			{
				// console.log("Bad code");
				setValidationMessage("Wrong code");
			}
		});
	}

	return (
		<div className="MailConfirmation">
			{/* Mail Confirmation */}
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo.png"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			<div className="indiceMessage">
			Click on the link sent by email <br/>or 
			enter your confirmation code
			</div>
			<div className="buttons" >
				<form onSubmit={onFormSubmit}>
					<Input placeholder="Code" onChange={(event) => {setCode(event.target.value)}}/>
					<Spacer height="30px"/>
					<p style={validationMessage === "Nothing" ? {visibility:"hidden"} : {}} className="validationMessage">{validationMessage}</p>
					<Spacer height="30px"/>
					{/* <Button text="Ok" onClick="/"/> */}
					<button type="submit" className="ButtonStyle">Ok</button>
				
				</form>
			</div>
		</div>
	)
}


export default MailConfirmation
