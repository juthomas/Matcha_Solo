import React from 'react'
import "./AboutForm.css"

function AboutForm(props) {
	return (
                <div className="AboutForm">
                { 
                        !props.editMod ? <div style={{ fontSize: "30px"}}>{props.subject}{props.value}</div> : props.canEdit ? <div style={{ fontSize: "30px"}}>{props.subject} <br/><textarea style={{ fontSize: "30px"}} 
                        onChange={props.onChange}
                        value={props.value}/></div>
                        : null
                }
                </div>
	)
}

export default AboutForm