import React from "react";

import "./MctsSimulationsSelector.css"

export function MctsSimulationsSelector(props) {
  const onChange = (event) => {
    console.log("updating num rollouts to: " + event.target.value)
    props.setMctsSimulations(event.target.value)
  }

  return (
    <div className="mctsSimulationsSelector">
      <h1 className="mctsSimulationsSelectorLabel">mcts simulations:</h1>
      <input className="mctsSimulationsSelectorInput" type="number" value={props.mctsSimulations} onChange={onChange} required/>
    </div>
  )
}