import React from 'react'
import "./Navbar.css"

function Navbar(props) {
	return (
		<div className="Navbar">
			<button style={props.highlight === "1" ? {backgroundColor: "#A2A2A2"} : {}} >
				<img alt="wolf_icon" src={process.env.PUBLIC_URL + "/img/wolf_logo_1.svg"} />
			</button>
			<button>
				<img alt="message_icon" src={process.env.PUBLIC_URL + "/img/message_icon.svg"} />
			</button>
			<button>
				<img alt="profil_icon" src={process.env.PUBLIC_URL + "/img/profil_icon.svg"} />
			</button>
		
		</div>
	)
}

export default Navbar
