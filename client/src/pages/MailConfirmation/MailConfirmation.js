import React, { useState, useEffect } from 'react'
import "./MailConfirmation.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import {useParams, useHistory} from "react-router-dom";

import Axios from 'axios'

function MailConfirmation() {
	let { id } = useParams();
	const [code, setCode] = useState('');
	let history = useHistory();

	useEffect(() => {
		const checkMailConfirmation = setInterval(() => {
			var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
			Axios.post(urlPrefix + "/user/getconfirmationinfo", {id : id})
			.then((response) => {
				if (response.data.verified === 1)
				{
					history.push("/loggedin/home");
				}

			})



		}, 5000);

		return () => {
			clearInterval(checkMailConfirmation);
		}
	}, [])

	const reqCode = () => {
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
				console.log("Bad code");
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
				<Input placeholder="Code" onChange={(event) => {setCode(event.target.value)}}/>
				<Spacer height="100px"/>
				{/* <Button text="Ok" onClick="/"/> */}
				<button className="ButtonStyle" onClick={reqCode}>Ok</button>
			</div>
		</div>
	)
}


export default MailConfirmation
