import React, { useEffect } from 'react'
import "./SwipeCard.css"

function SwipeCard() {

	useEffect(() => {
		const script = document.createElement('script');

		script.src = process.env.PUBLIC_URL + "/scripts/swipe.js";
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		}
	}, []);


	var swipeContent = (<></>)
	for (var i = 0; i < 4; i++)
	{
		swipeContent +=
		(<div className="demo__card">
			<div className="demo__card__top brown">
			<div className="demo__card__img"></div>
			<p className="demo__card__name">Hungry cat {i}</p>
			</div>
			<div className="demo__card__btm">
				<p className="demo__card__we">Whatever</p>
			</div>
			<div className="demo__card__choice m--reject"></div>
			<div className="demo__card__choice m--like"></div>
			<div className="demo__card__drag"></div>
		</div>)
	}


	var numberOfProfiles = 100;

	const items = []
	window.numOfCards = numberOfProfiles;
	for (var i = 0; i < numberOfProfiles; i++) {
		items.push(<div key={i} className="demo__card">
		<div className="demo__card__top brown">
		<div className="demo__card__img"></div>
		<p className="demo__card__name">Boy {i}</p>
		</div>
		<div className="demo__card__btm">
			<p className="demo__card__we">Whatever</p>
		</div>
		<div className="demo__card__choice m--reject"></div>
		<div className="demo__card__choice m--like"></div>
		<div className="demo__card__drag"></div>
	</div>)
	}



	return (
		<div className="SwipeCard">
				{/* <header className="demo__header"></header> */}
				<div className="demo__content">
					<div className="demo__card-cont">
						{items}
					</div>
					{/* <p className="demo__tip">Swipe left or right</p> */}
				</div>
		</div>
	)
}

export default SwipeCard
