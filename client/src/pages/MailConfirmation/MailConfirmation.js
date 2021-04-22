import React from 'react'
import "./MailConfirmation.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"

function MailConfirmation() {
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
				<Input placeholder="Code"/>
				<Spacer height="100px"/>
				<Button text="Ok" onClick="/"/>
			</div>
		</div>
	)
}


export default MailConfirmation
