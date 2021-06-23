import React from 'react'
import {useParams} from "react-router-dom";

function MailLink() {
	let { id } = useParams();
	return (
		<div>
			ID CONFIRMED
			{id}
		</div>
	)
}

export default MailLink
