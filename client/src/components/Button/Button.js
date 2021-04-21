import React from 'react'
import "./Button.css"

function Button(props) {
	
	return (
		<div className="ButtonComponent">
			<a className="button Button" href={props.onClick}>{props.text}</a>
		</div>
	)
}

export default Button
