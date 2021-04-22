import React, {useState} from 'react'
import "./Register.css"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import axios from 'axios'

function Register() {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const register = () => {
		console.log("click");
		axios.post("http://localhost:3001/user/register", 
		{username: username, password: password})
		.then((response) => {console.log(response)});
	}


	return (
		<div className="Register">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo.png"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			{/* <div className="RegisterForm">
				<input type="text" placeholder="Username..." onChange={(event) => {setUsername(event.target.value)}}/>
				<input type="password" placeholder="Password...." onChange={(event) => {setPassword(event.target.value)}}/>
				<button onClick={register}>Register</button>
			</div> */}
			<div className="buttons" >
				<Input placeholder="Login"/>
				<Spacer height="30px"/>
				<Input placeholder="Firstname"/>
				<Spacer height="30px"/>
				<Input placeholder="Lastname"/>
				<Spacer height="30px"/>
				<Input placeholder="Mail"/>
				<Spacer height="30px"/>
				<Input placeholder="Password" type="password"/>
				<Spacer height="60px"/>
				<Button text="Register" onClick="/mailconfirmation"/>
			</div>
		</div>
	)
}

export default Register