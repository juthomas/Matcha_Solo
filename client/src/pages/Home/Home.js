import React from 'react'
import "./Home.css"
import SwipeCard from "../../components/SwipeCard/SwipeCard"

function Home() {
	return (
		<div className="Home">
			<div className="Background"/>

			Home 
			<div className="CurrentMatch">
				<SwipeCard/>
			</div>
			<div className="ReactionBar">
				<button>
				<img alt="like_icon" src={process.env.PUBLIC_URL + "/img/like_icon.svg"} />
				</button>
				<button>
				<img alt="hat_icon" src={process.env.PUBLIC_URL + "/img/hat_icon.svg"} />
				</button>
				<button>
				<img alt="star_icon" src={process.env.PUBLIC_URL + "/img/star_icon.svg"} />

				</button>
				<button>
				<img alt="lightning_icon" src={process.env.PUBLIC_URL + "/img/lightning_icon.svg"} />
				</button>
				<button>
				<img alt="bg_icon" src={process.env.PUBLIC_URL + "/img/bg_icon.svg"} />

				</button>
			</div>
		</div>
	)
}

export default Home
