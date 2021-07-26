import React from 'react'
import "./ImageDisplay.css"

function ImageDisplay(props) {
	return (
        <div className="flapImage" style={{backgroundColor:"red"}}>                        
            <img src={props.image}  className="profileImage" alt={props.image} style={{}}/>
            {
                props.currentSlide && props.editMod ? 
                <label htmlFor="icon-button-file"> 
                    <input accept="image/*" id="icon-button-file" type="file" style={{display: "none"}} onChange={props.onChange}/>
                    <img src={process.env.PUBLIC_URL + "/img/unnamed.png"} width="75%" className="addIcon" alt="Click to add Image1" />
                </label>
                : null 
            }
        </div>
	)
}

export default ImageDisplay