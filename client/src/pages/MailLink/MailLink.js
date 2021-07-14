import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from "react-router-dom";
import Axios from 'axios'

function MailLink() {
	let { id } = useParams();
	var [mailRegistred, setMailRegistred] = useState("Nope");
	let history = useHistory();

	// var mailRegistred = "Nope";
	useEffect(() => {

		var urlPrefix = window.location.protocol + "//" + window.location.hostname + ":3001";
		console.log("Back Host :" + urlPrefix + "/user/maillink");
	
		Axios.post(urlPrefix + "/user/maillink", {id : id})
		.then((response) => {
			
			//If result == 1 then user is really affected
			console.log(response.data.result);
			if (response.data.result)
			{
				// setMailRegistred("Yep");
				localStorage.setItem("meater-token", response.data.token);
				localStorage.setItem("meater-id", response.data.id);
				history.push("/loggedin/home");
			}
		})

	}, [])
	


	return (
		<div>
			ID CONFIRMED
			{id}
			{mailRegistred}
		</div>
	)
}

export default MailLink
