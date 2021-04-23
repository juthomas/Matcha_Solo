import React from 'react'
import "./Login.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"


function Login() {
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
				🔥 EPIC BROS 🔥
			</div>
			<div className="buttons" >
				<Input placeholder="Mail"/>
				<Spacer height="30px"/>
				<Input placeholder="Password" type="password"/>
				<Spacer height="30px"/>
				<div className="forgotPassword">
					<a href="/resetcredentials">Forgot your password?</a>
				</div>
				<Spacer height="60px"/>
				<Button text="login" onClick="/loggedin/home"/>
			</div>
		</div>
	)
}

export default Login
