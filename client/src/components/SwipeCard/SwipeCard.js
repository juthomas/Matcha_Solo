import React, { useEffect, useState } from 'react'
import "./SwipeCard.css"
import $ from "jquery"

function SwipeCard() {

	// useEffect(() => {
	// 	const script = document.createElement('script');

	// 	script.src = process.env.PUBLIC_URL + "/scripts/swipe.js";
	// 	script.async = true;

	// 	document.body.appendChild(script);

	// 	return () => {
	// 		document.body.removeChild(script);
	// 	}
	// }, []);


	// const numberOfProfiles = 10;
	const [numberOfProfiles, setNumberOfProfiles] = useState(10);

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

	useEffect(() => {
		console.log("In :", numberOfProfiles)

		var animating = false;
		var cardsCounter = 0;
		// var numOfCards = 6;//
		// window.numOfCards;
		var decisionVal = 80;
		// var decisionVal = 180;
		var pullDeltaX = 0;
		var deg = 0;
		var $card, $cardReject, $cardLike;
	
		function pullChange() {
			animating = true;
			deg = pullDeltaX / 10;
			$card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");
	
			var opacity = pullDeltaX / 100;
			var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
			var likeOpacity = (opacity <= 0) ? 0 : opacity;
			$cardReject.css("opacity", rejectOpacity);
			$cardLike.css("opacity", likeOpacity);
		};
	
		function release() {
	
			if (pullDeltaX >= decisionVal) {
				$card.addClass("to-right");
			} else if (pullDeltaX <= -decisionVal) {
				$card.addClass("to-left");
			}
	
			if (Math.abs(pullDeltaX) >= decisionVal) {
				$card.addClass("inactive");
	
				setTimeout(function () {
					$card.addClass("below").removeClass("inactive to-left to-right");
					cardsCounter++;
					if (cardsCounter === numberOfProfiles) {
						console.log("Equal :", numberOfProfiles)

						cardsCounter = 0;
						$(".demo__card").removeClass("below");
					}
				}, 300);
			}
	
			if (Math.abs(pullDeltaX) < decisionVal) {
				$card.addClass("reset");
			}
	
			setTimeout(function () {
				$card.attr("style", "").removeClass("reset")
					.find(".demo__card__choice").attr("style", "");
	
				pullDeltaX = 0;
				animating = false;
			}, 300);
		};
	
		$(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function (e) {
			if (animating) return;
	
			$card = $(this);
			$cardReject = $(".demo__card__choice.m--reject", $card);
			$cardLike = $(".demo__card__choice.m--like", $card);
			var startX = e.pageX || e.originalEvent.touches[0].pageX;
	
			$(document).on("mousemove touchmove", function (e) {
				// console.log(e)
				// console.log(e.originalEvent.touches[0])
				var x = e.pageX != null ? e.pageX  : e.originalEvent.touches[0].pageX;
				// console.log(x);
				
				pullDeltaX = (x - startX);
				if (!pullDeltaX) return;
				// console.log("Before pull change");

				pullChange();
			});
	
			$(document).on("mouseup touchend", function () {
				$(document).off("mousemove touchmove mouseup touchend");
				if (!pullDeltaX) return; // prevents from rapid click events
				release();
			});
		});
		return () => {
			console.log("exit :", numberOfProfiles)
			// $(document).detach();
			$(document).off();
			// $(document).
		}
	}, [numberOfProfiles])

	return (
		<>
		<div className="SwipeCard">
				{/* <header className="demo__header"></header> */}
				<div className="demo__content">
					<div className="demo__card-cont">
						{items}
					</div>
					{/* <p className="demo__tip">Swipe left or right</p> */}
				</div>
		</div>
		<button style={{zIndex:500, position:"fixed"}} onClick={()=>{ setNumberOfProfiles(numberOfProfiles + 1); console.log(numberOfProfiles)}}>Useless</button>
		</>
	)
}

export default SwipeCard
