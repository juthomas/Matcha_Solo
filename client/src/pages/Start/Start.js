import React from 'react'
import "./Start.css"
// import wolf from "./wolf_logo.png"
// import axios from 'axios'

function Start() {
	return (
		<div className="Home">
			{/* <img src={wolf} alt="wolfLogo" class="wolfLogo"/> */}
			{/* <img src={process.env.PUBLIC_URL + "/img/wolf_logo.png"} alt="wolfLogo" className="wolfLogo"/> */}
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
				<a href="#" target="_blank">
					<div className="button">
						<p> Login </p>
						<img src={process.env.PUBLIC_URL + "/img/buttons/triangleButton.png"} alt="triangleButton" className="triangleButton1" />
						<img src={process.env.PUBLIC_URL + "/img/buttons/triangleButton.png"} alt="triangleButton" className="triangleButton2" />
					</div>
				</a>
				<div className="spacer"/>
				<a href="#" target="_blank">
					<div className="button">
						<p> Register </p>
						<img src={process.env.PUBLIC_URL + "/img/buttons/triangleButton.png"} alt="triangleButton" className="triangleButton1" />
						<img src={process.env.PUBLIC_URL + "/img/buttons/triangleButton.png"} alt="triangleButton" className="triangleButton2" />
					</div>
				</a>
			</div>


		</div>
	)
}

export default Start
