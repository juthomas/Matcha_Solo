import React from 'react'
import "./Input.css"


function Input(props) {
	return (
		<div className="InputComponent">
			<input type={props.type ? props.type : "input"} className="Input" placeholder={props.placeholder}></input>
		</div>
	)
}

export default Input
