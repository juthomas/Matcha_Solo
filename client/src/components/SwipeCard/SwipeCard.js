import React, { useEffect, useState, useRef, useCallback } from 'react'
import "./SwipeCard.css"
import $ from "jquery"
import Axios from "axios"
// import reactElementToJSXString from 'react-element-to-jsx-string';

function SwipeCard() {

	const [numberOfProfiles, setNumberOfProfiles] = useState(10);
	// var numberOfProfiles = 10;
	// const [profilesDatas, setProfilesDatas] = useState([]);
	var profilesDatas = useRef([]);
	var dbOffset = useRef(0);
	const dbLimit = 5;
	// const [clicksNumber, setClicksNumber] = useState(0);
	// var items = []
	const [itemsState, setItemsState] = useState([]);


	// window.numOfCards = numberOfProfiles;
	// for (var i = 0; i < numberOfProfiles; i++) {
	// 	items.push(<div key={i} className="demo__card">
	// 	<div className="demo__card__top brown">
	// 	<div className="demo__card__img"></div>
	// 	<p className="demo__card__name">Boy {i}</p>
	// 	</div>
	// 	<div className="demo__card__btm">
	// 		<p className="demo__card__we">Whatever</p>
	// 	</div>
	// 	<div className="demo__card__choice m--reject"></div>
	// 	<div className="demo__card__choice m--like"></div>
	// 	<div className="demo__card__drag"></div>
	// </div>)
	// }
	// console.log(items);


	// useEffect((getNewProfiles), []);



	const refreshProfilesItems = useCallback(() => {
		console.log("beg reload");
		console.log("reload datas", profilesDatas.current);

		console.log("profiles data :", profilesDatas.current);
		var items = profilesDatas.current.map((val, key) => {
			return (
				<div key={key} className="demo__card">
					<div className="card_content">
						<div className="demo__card__img">

							<img style={{ height: "100%", width: "100%", objectFit: "cover" }} src="https://thispersondoesnotexist.com/image" alt="Profile_image"></img>
						</div>
						<div className="demo__card__btm">

							<p className="demo__card__name">Boy {val.name}</p>
							<p className="demo__card__location">Boy {val.name}</p>
						</div>
					</div>
					{/* <div className="demo__card__top brown">
						<div className="demo__card__img">
							<img style={{ height: "100%", }} src="https://thispersondoesnotexist.com/image" alt="Profile_image"></img>
						</div>
						<p className="demo__card__name">Boy {val.name}</p>
					</div>
					<div className="demo__card__btm">
						<p className="demo__card__we">Whatever</p>
					</div> */}
					<div className="demo__card__choice m--reject"></div>
					<div className="demo__card__choice m--like"></div>
					<div className="demo__card__drag"></div>
				</div>
			)
		})
		items = items.reverse()
		if (items.length > 0) {
			for (var u = 0; u < items.length; u++) {
				// console.log("reload datas items", reactElementToJSXString(items[u]));
			}
		}

		console.log("reload");
		setItemsState(items);
	}, [])

	const getNewProfiles = useCallback(() => {
		// Axios.post("http://localhost:3001/get_profiles", 
		// TODO: Replace with a correct thing:
		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		console.log("Back Host :" + urlPrefix);
		Axios.post(urlPrefix + "/get_profiles",
			{ offset: dbOffset.current, limit: dbLimit })
			.then((response) => {
				console.log(response)

				if (dbLimit > response.data.length) {
					dbOffset.current = 0;
				}
				else {
					dbOffset.current += dbLimit;
				}

				profilesDatas.current = profilesDatas.current.splice(profilesDatas.current.length - 1, profilesDatas.current.length);
				console.log("mid current profile data :", profilesDatas.current)

				profilesDatas.current = profilesDatas.current.concat(response.data)

				console.log(response.data)
				console.log(profilesDatas.current)
				refreshProfilesItems()
				setNumberOfProfiles(profilesDatas.current.length)
			});
	}, [refreshProfilesItems]);

	useEffect(() => {
		getNewProfiles()
	}, [getNewProfiles]);

	// useEffect(() => {

	// 	Axios.post("http://localhost:3001/get_profiles", 
	// 	{offset: dbOffset.current, limit: dbLimit})
	// 	.then((response) => {console.log(response)
	// 	if (dbLimit > response.data.length)
	// 	{
	// 		dbOffset.current = 0;
	// 	}
	// 	else
	// 	{
	// 		dbOffset.current += dbLimit;
	// 	}

	// 	profilesDatas.current = profilesDatas.current.splice(profilesDatas.current.length -1, profilesDatas.current.length);
	// 	console.log("mid current profile data :", profilesDatas.current)

	// 	profilesDatas.current = profilesDatas.current.concat(response.data)

	// 	console.log(response.data) 
	// 	console.log(profilesDatas.current)
	// 	setNumberOfProfiles(profilesDatas.current.length)
	// 	});

	// }, [clicksNumber])

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
				console.log(cardsCounter, " : Liked")
			} else if (pullDeltaX <= -decisionVal) {
				$card.addClass("to-left");
				console.log(cardsCounter, " : Disliked")

			}

			if (Math.abs(pullDeltaX) >= decisionVal) {
				$card.addClass("inactive");

				setTimeout(function () {
					$card.addClass("below").removeClass("inactive to-left to-right");
					cardsCounter++;
					if (cardsCounter === numberOfProfiles - 1) {
						console.log("Reload js :", cardsCounter, " : ", numberOfProfiles)

						$(".demo__card").removeClass("below");

						// setClicksNumber(c => c + 1);
						getNewProfiles()
						// Trouver le moyen de mettre cardCounter a 0 au moment au la 
						// liste de cartes se rafraichit
						cardsCounter = 0;

					}
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
				var x = e.pageX != null ? e.pageX : e.originalEvent.touches[0].pageX;
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
			$(document).off();
		}
	}, [numberOfProfiles, getNewProfiles])
	return (
			<div className="SwipeCard">
				{/* <header className="demo__header"></header> */}
				<div className="demo__content">
					<div className="demo__card-cont">
						{itemsState}
					</div>
					{/* <p className="demo__tip">Swipe left or right</p> */}
				</div>
			</div>

	)
}

export default SwipeCard
