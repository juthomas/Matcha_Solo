import React from 'react'
import "./Login.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"

function Login() {
	return (
		<div className="Login">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo.png"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			<div className="broMessage">
				<p>brace yourself for</p>
				🔥 EPIC BROS 🔥
			</div>
			<div className="buttons" >
				<Input placeholder="Mail"/>
				<div className="spacer"/>
				<Input placeholder="Password" type="password"/>
				<div className="spacer"/>
				<div className="spacer"/>
				<Button text="login" onClick="/"/>
			</div>
		</div>
	)
}

export default Login
