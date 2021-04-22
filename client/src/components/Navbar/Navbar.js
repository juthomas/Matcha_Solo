import React from 'react'
import "./Navbar.css"

function Navbar() {
	return (
		<div className="Navbar">
		<button>
			{/* <image src={process.env.PUBLIC_URL + "/img/wolf_logo.svg"} /> */}


			<svg>
    			<use xlinkHref={process.env.PUBLIC_URL + "/img/wolf_logo.svg"} ></use>
			</svg>
                  {/* <svg>
        <use xlinkHref={process.env.PUBLIC_URL + "/img/wolf_logo.svg"}></use>
      </svg> */}

		</button>
		<button>Messages</button>
		<button>Profil</button>
		
		</div>
	)
}

export default Navbar
