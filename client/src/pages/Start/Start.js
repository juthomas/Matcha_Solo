import React from 'react'
import "./Start.css"
import Button from "../../components/Button/Button"


function Start() {
	return (
		<div className="Start">
			<div className="Background"> 
				<img src={process.env.PUBLIC_URL + "/img/page_start/whitebackground.png"} alt="whiteBackground" className="whitebackground" />
				<img src={process.env.PUBLIC_URL + "/img/page_start/greybackground.png"} alt="greyBackground" className="greybackground" />
				<img src={process.env.PUBLIC_URL + "/img/page_start/blackbackground.png"} alt="blackBackground" className="blackbackground" />
			</div>
			<div className="logoandname" >
				<div className="wolflogo" >
					<img src={process.env.PUBLIC_URL + "/img/wolf_logo.png"} alt="wolfLogo" />
				</div>
				<div className="apptext">
					<div className="appname">Meater</div>
					<div className="appslogan">For males by males</div>
				</div>
			</div>
			<div className="buttons" >
				<Button text="Login" onClick="/login"/>
				<div className="spacer"/>
				<Button text="Register" onClick="/register"/>
			</div>
		</div>
	)
}

export default Start
