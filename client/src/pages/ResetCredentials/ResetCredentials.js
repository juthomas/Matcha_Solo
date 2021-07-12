import React, {useState} from 'react'
import "./ResetCredentials.css"
import Input from "../../components/Input/Input"
import Spacer from "../../components/Spacer/Spacer"
import Axios from 'axios'


function ResetCredentials() {
	const [mail, setMail] = useState("");
	const [validationMessage, setValidationMessage] = useState("Nothing");


	const onFormSubmit = (e) => {
		e.preventDefault();
		console.log("cc, cv? : " + mail);
		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		Axios.post(urlPrefix + "/user/resetcredentials", {mail : mail})
		.then((response) => {
			if (response.data.error === true)
			{

				console.log("response :", response.data.message);
				setValidationMessage(response.data.message);
			}
			else
			{
				console.log("response :", response.data.message);
				setValidationMessage("Nothing");
			}
			// if (response.data.error === 1)
			// {
			// 	console.log("Error message :", response.data.message);
			// 	setValidationMessage(response.data.message);

			// }
			// else if (response.data.verified === 1)
			// {
			// 	history.push("/loggedin/home");
			// }
			// else
			// {
			// 	history.push("/mailconfirmation/" + response.data.id);
			// }
		})


	}






	return (
		<div className="ResetCredentials">
			<div className="Background"/>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo_1.svg"} alt="wolfLogo" />
				</div>
				<div className="apptext">Meater</div>
			</div>
			<div className="resetCredentialsMessage">
				The reset link will be sent 
				to you by email
			</div>
			<div className="buttons" >
				<form onSubmit={onFormSubmit}>

				{/* <Input placeholder="Login"/> */}
				{/* <Spacer height="30px"/> */}
				<Input placeholder="Mail" onChange={(event) => {setMail(event.target.value)}}/>
				<Spacer height="104px"/>
				<p style={validationMessage === "Nothing" ? {visibility:"hidden"} : {}} className="validationMessage">{validationMessage}</p>
				
				<Spacer height="24px"/>
				{/* <Button text="Send Mail" onClick="/setpassword"/> */}
				<button type="submit" className="ButtonStyle">Send Mail</button>

				</form>
			</div>
		</div>
	)
}


export default ResetCredentials
