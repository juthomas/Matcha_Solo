import React from 'react'
import "./Input.css"


function Input(props) {
	return (
		<div className="InputComponent">
			<input type={props.type ? props.type : "input"} className="Input" placeholder={props.placeholder} onChange={props.onChange}></input>
		</div>
	)
}

export default Input
