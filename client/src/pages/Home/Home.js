// import React from 'react'
import "./Home.css"
// import SwipeCard from "../../components/SwipeCard/SwipeCard"


import React, { useEffect, useState, useRef, useCallback } from 'react'
// import "./SwipeCard.css"
import $ from "jquery"
import Axios from "axios"
import {useHistory} from 'react-router-dom'

function Home() {

	let history = useHistory();
	const [numberOfProfiles, setNumberOfProfiles] = useState(10);
	// var numberOfProfiles = 10;
	// const [profilesDatas, setProfilesDatas] = useState([]);
	var profilesDatas = useRef([]);
	var dbOffset = useRef(0);
	const dbLimit = 5;
	// const [clicksNumber, setClicksNumber] = useState(0);
	// var items = []
	const [itemsState, setItemsState] = useState([]);
	// const [token, ] = useLocalStorage('token');
	// const [id,] = useLocalStorage('id');
	// const [cardsCounter, setCardsCounter] = useState(0);

	var cardsCounter = useRef(0);

	// var cardsCounter = 0;//Faire un truc plus propre pour ca
	var animating = false;
	// var numOfCards = 6;//
	// window.numOfCards;
	var decisionVal = 80;
	// var decisionVal = 180;
	var pullDeltaX = 0;
	var deg = 0;
	var $card, $cardReject, $cardLike;

	// window.numOfCards = numberOfProfiles;
	// for (var i = 0; i < numberOfProfiles; i++) {
	// 	items.push(<div key={i} className="demo__card">
	// 	<div className="CardTop brown">
	// 	<div className="CardImage"></div>
	// 	<p className="CardName">Boy {i}</p>
	// 	</div>
	// 	<div className="CardBottom">
	// 		<p className="demo__card__we">Whatever</p>
	// 	</div>
	// 	<div className="CardChoice m--reject"></div>
	// 	<div className="CardChoice m--like"></div>
	// 	<div className="CardDrag"></div>
	// </div>)
	// }
	// console.log(items);


	// useEffect((getNewProfiles), []);



	function	add_friend(id, relationType)
	{
		//Add relation in Relationships table
		console.log("Id : ", id);
		console.log("Relation type : ", relationType);
	}
	var button_clicked_ok = true;
	function button_clicked(like_type)
	{
		if (button_clicked_ok === false)
		{
			return;
		}

		button_clicked_ok = false;
			var $currentCard = $(".CardContainer").children().not(".below").last();
			console.log($currentCard);
			// $cardParent.remove();
		// Swipe a droite
		// if (pullDeltaX >= decisionVal)
		// {
			console.log(cardsCounter.current, " : Liked")
			console.log(profilesDatas.current[cardsCounter.current]);
			
			if (profilesDatas.current[cardsCounter.current])
			add_friend(profilesDatas.current[cardsCounter.current].id, like_type);
			$currentCard.css("transition-duration", "0.5s");
			$currentCard.addClass("to-right");
			
			$currentCard.addClass("inactive");
			
			cardsCounter.current++;
			// setCardsCounter(cardsCounter.current + 1);
			setTimeout(function () {
				$currentCard.css("transition-duration", "0s");
				$currentCard.addClass("below").removeClass("inactive to-left to-right");
				if (cardsCounter.current === numberOfProfiles - 1) {
					console.log("Reload js :", cardsCounter.current, " : ", numberOfProfiles)

					$(".Card").removeClass("below");

					// setClicksNumber(c => c + 1);
					getNewProfiles()
					// Trouver le moyen de mettre cardCounter a 0 au moment au la 
					// liste de cartes se rafraichit
					cardsCounter.current = 0;
					// setCardsCounter(0);

				}
				if (cardsCounter === numberOfProfiles) {
					console.log("Equal :", numberOfProfiles)

					cardsCounter.current = 0;
					// setCardsCounter(0);

					$(".Card").removeClass("below");

				}

				button_clicked_ok = true;

			}, 500);
			// console.log(cardsCounter, " : Liked")
			// console.log(profilesDatas.current[cardsCounter]);
			// add_friend(profilesDatas.current[cardsCounter].id, "friends")
		
		
			// } 

		return;

	};


	const refreshProfilesItems = useCallback(() => {
		console.log("beg reload");
		console.log("reload datas", profilesDatas.current);

		console.log("profiles data :", profilesDatas.current);
		var items = profilesDatas.current.map((val, key) => {
			return (
				<div key={key} className="Card">
					<div className="CardContent">
						<div className="CardImage">

							<img style={{ height: "100%", width: "100%", objectFit: "cover" }} src="https://thispersondoesnotexist.com/image" alt="Profile_image"></img>
						</div>
						<div className="CardBottom">

							<p className="CardName">Boy {val.name}</p>
							<p >Boy {val.name}</p>
						</div>
					</div>
					{/* <div className="CardTop brown">
						<div className="CardImage">
							<img style={{ height: "100%", }} src="https://thispersondoesnotexist.com/image" alt="Profile_image"></img>
						</div>
						<p className="CardName">Boy {val.name}</p>
					</div>
					<div className="CardBottom">
						<p className="demo__card__we">Whatever</p>
					</div> */}
					<div className="CardChoice m--reject"></div>
					<div className="CardChoice m--like"></div>
					<div className="CardDrag"></div>
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
			{
				
				 offset: dbOffset.current, limit: dbLimit 
			},{headers: {'Authorization' : `Bearer ${localStorage.getItem("meater-token")}`}}
			)
			.then((response) => {
				console.log("HAHA");
				console.log("response :" + response)
				
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
				if (response.data.error === true && response.data.message === "Invalid Token")
				{
					history.push("/login");
				}
				console.log(profilesDatas.current)
				refreshProfilesItems()
				setNumberOfProfiles(profilesDatas.current.length)
			});
			console.log("request done");

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


			// Swipe a droite
			if (pullDeltaX >= decisionVal)
			{
				$card.addClass("to-right");
				console.log(cardsCounter.current, " : Liked")
				console.log(profilesDatas.current[cardsCounter.current]);
				add_friend(profilesDatas.current[cardsCounter.current].id, "friends")
			} 
			// Swipe a gauche
			else if (pullDeltaX <= -decisionVal)
			 {
				$card.addClass("to-left");
				console.log(cardsCounter.current, " : Disliked")

			}

			if (Math.abs(pullDeltaX) >= decisionVal) {
				$card.addClass("inactive");

				cardsCounter.current++;
				// setCardsCounter(cardsCounter + 1);


				setTimeout(function () {
					$card.addClass("below").removeClass("inactive to-left to-right");
					if (cardsCounter.current === numberOfProfiles - 1) {
						console.log("Reload js :", cardsCounter.current, " : ", numberOfProfiles)

						$(".Card").removeClass("below");

						// setClicksNumber(c => c + 1);
						getNewProfiles()
						// Trouver le moyen de mettre cardCounter a 0 au moment au la 
						// liste de cartes se rafraichit
						cardsCounter.current = 0;


						// setCardsCounter(0);



					}
					if (cardsCounter === numberOfProfiles) {
						console.log("Equal :", numberOfProfiles)

						cardsCounter.current = 0;


						// setCardsCounter(0);

						$(".Card").removeClass("below");

					}
				}, 300);
			}

			if (Math.abs(pullDeltaX) < decisionVal) {
				$card.addClass("reset");
			}

			setTimeout(function () {
				$card.attr("style", "").removeClass("reset")
					.find(".CardChoice").attr("style", "");

				pullDeltaX = 0;
				animating = false;
			}, 300);
		};

		$(document).on("mousedown touchstart", ".Card:not(.inactive)", function (e) {
			if (animating) return;

			$card = $(this);
			$cardReject = $(".CardChoice.m--reject", $card);
			$cardLike = $(".CardChoice.m--like", $card);
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
		<div className="Home">
			<div className="Background"/>

			{/* Home  */}
			{/* <div className="CurrentMatch"> */}
				{/* <SwipeCard/> */}
				<div className="SwipeCard">
				{/* <header className="demo__header"></header> */}
				<div className="Content">
					<div className="CardContainer">
						{itemsState}
					</div>
					{/* <p className="demo__tip">Swipe left or right</p> */}
				</div>
			</div>
			{/* </div> */}
			<div className="ReactionBar">
				<button onClick={() => button_clicked("like friends")}>
				<img alt="like_icon" src={process.env.PUBLIC_URL + "/img/like_icon.svg"} 
				/>
				</button>
				<button onClick={() => button_clicked("hat friends")}>
				<img alt="hat_icon" src={process.env.PUBLIC_URL + "/img/hat_icon.svg"} />
				</button>
				<button onClick={() => button_clicked("star friends")}>
				<img alt="star_icon" src={process.env.PUBLIC_URL + "/img/star_icon.svg"} />

				</button>
				<button onClick={() => button_clicked("lightning friends")}>
				<img alt="lightning_icon" src={process.env.PUBLIC_URL + "/img/lightning_icon.svg"} />
				</button>
				<button onClick={() => button_clicked("humain friends")}>
				<img alt="bg_icon" src={process.env.PUBLIC_URL + "/img/bg_icon.svg"} />

				</button>
			</div>
		</div>
	)
}

export default Home
