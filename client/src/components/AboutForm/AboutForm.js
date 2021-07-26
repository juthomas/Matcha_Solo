import React from 'react'
import "./AboutForm.css"

function AboutForm(props) {
	return (
                <div className="AboutForm">
                { 
                        <div style={{ fontSize: "30px"}}>{props.subject} <br/><textarea disabled={!props.editMod || !props.canEdit} style={{ backgroundColor:"white", color:"black", fontSize:"30px"}} 
                        onChange={props.onChange}
                        value={props.value}/></div>
                        
                }
                </div>
	)
}

export default AboutForm