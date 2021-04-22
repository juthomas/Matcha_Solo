import React from 'react'
import "./ResetCredentials.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"

function ResetCredentials() {
	return (
		<div className="ResetCredentials">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo.png"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			<div className="resetCredentialsMessage">
				The reset link will be sent 
				to you by email
			</div>
			<div className="buttons" >
				<Input placeholder="Login"/>
				<Spacer height="30px"/>
				<Input placeholder="Mail"/>
				<Spacer height="124px"/>
				<Button text="Send Mail" onClick="/setpassword"/>
			</div>
		</div>
	)
}


export default ResetCredentials
