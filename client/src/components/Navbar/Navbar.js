import React from 'react'
import {useHistory} from 'react-router-dom'

import "./Navbar.css"

function Navbar(props) {
	let history = useHistory();

	return (
		<div className="Navbar">
			<button 
			onClick={(event) => {history.push("/loggedin/home")}} 
			style={props.highlight === "1" ? {backgroundColor: "#A2A2A2"} : {}} >
				<img alt="wolf_icon" src={process.env.PUBLIC_URL + "/img/wolf_logo_1.svg"} />
			</button>
			<button onClick={(event) => {history.push("/loggedin/messages")}}>
				<img  alt="message_icon" src={process.env.PUBLIC_URL + "/img/message_icon.svg"} />
			</button>
			<button onClick={(event) => {history.push("/loggedin/profile")}}>
				<img alt="profil_icon" src={process.env.PUBLIC_URL + "/img/profil_icon.svg"} />
			</button>
		
		</div>
	)
}

export default Navbar
