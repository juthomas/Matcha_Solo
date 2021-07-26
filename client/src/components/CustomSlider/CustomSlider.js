import React from 'react'
import { useCallback, useEffect } from "react";
import "./CustomSlider.css"

import { useState } from "react";
import { useRef } from "react";

function CustomSlider(props) {
    
    // Creating the refs
    const minValRef = useRef(props.min);
    const maxValRef = useRef(props.max);
    const range = useRef(null);
    
    // Creating the state variables
    const [minVal, setMinVal] = useState(props.defaultMin);
    const [maxVal, setMaxVal] = useState(props.defaultMax);
    
    // Convert to percentage
    const getPercent = useCallback((value) => {
        Math.round(((value - props.min) / (props.max - props.min)) * 100);
    }, [props.min, props.max]);
    
    // Set width of the range to change from the left side
    useEffect(() => {
     const minPercent = getPercent(minVal);
     const maxPercent = getPercent(maxValRef.current);
    
     if (range.current) {
       range.current.style.left = `${minPercent}%`;
       range.current.style.width = `${maxPercent - minPercent}%`;
     }
    }, [minVal, getPercent]);
    
    // Set width of the range to change from the right side
    useEffect(() => {
     const minPercent = getPercent(minValRef.current);
     const maxPercent = getPercent(maxVal);
    
     if (range.current) {
       range.current.style.width = `${maxPercent - minPercent}%`;
     }
    }, [maxVal, getPercent]);
    
    // Get min and max values when their state changes
    useEffect(() => {
     props.onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, props.onChange]);

	return (
        <div className="slider__top">
            <div style={{backgroundColor:"white", width:"35px", height:"40px", color:"black", border:"1px solid black", textAlign:"center", marginRight:"20px"}}>{minVal}</div>
            <div>
<input
    type="range"
    min={props.min}
    max={props.max}
    value={minVal}
    onChange={event => {
      const value = Math.min(Number(event.target.value), maxVal - 1);
      setMinVal(value);
      minValRef.current = value;
    }}
    className="thumb thumb--left"
    style={{ zIndex: minVal > props.max - 100 && "5" }}
 />
 {
     props.range ?
<input
    type="range"
    min={props.min}
    max={props.max}
    value={maxVal}
    onChange={event => {
      const value = Math.max(Number(event.target.value), minVal + 1);
      setMaxVal(value);
      maxValRef.current = value;
   }}
   className="thumb thumb--right"
/> 
    : null
}
                <div className="slider">
                    <div className="slider__track"/>

                    <div ref={range} className="slider__range" />
                </div>
            </div>
            {props.range ? <div style={{backgroundColor:"white", width:"35px", height:"40px", border:"1px solid black", color:"black", textAlign:"center", marginLeft:"20px"}}>{maxVal}</div> : null }
      </div>
	)
}

export default CustomSlider