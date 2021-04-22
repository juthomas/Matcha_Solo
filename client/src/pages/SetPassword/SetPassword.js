import React from 'react'
import "./SetPassword.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"

function SetPassword() {
	return (
		<div className="SetPassword">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo.png"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			<div className="setPasswordMessage">
			Enter your new password
			</div>
			<div className="buttons" >
				<Input placeholder="Password"/>
				<Spacer height="30px"/>
				<Input placeholder="Confirm Password"/>
				<Spacer height="124px"/>
				<Button text="Change Password" onClick="/"/>
			</div>
		</div>
	)
}

export default SetPassword
