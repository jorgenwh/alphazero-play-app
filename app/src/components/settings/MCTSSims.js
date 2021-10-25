import React from "react";
import "./MCTSSims.css"


export function MCTSSims(props) {
  const onChange = (event) => {
    console.log("updating num rollouts to: " + event.target.value)
    props.setNumRollouts(event.target.value)
  }

  return (
    <div className="mctsSimsContainer">
      <h1 className="numSimsLabel">num sim rollouts:</h1>
      <input className="mctsSimsInputField" type="number" required onChange={onChange}/>
    </div>
  )
}