import React from "react";

import "./MctsSimulationsSelector.css"

export function MctsSimulationsSelector(props) {
  const onChange = (event) => {
    let newValue = event.target.value
    if (newValue > 2500) { newValue = 2500 }

    console.log("updating num rollouts to: " + newValue)
    props.setMctsSimulations(newValue)
  }

  return (
    <div className="mctsSimulationsSelector">
      <h1 className="mctsSimulationsSelectorLabel">mcts simulations:</h1>
      <input className="mctsSimulationsSelectorInput" type="number" value={props.mctsSimulations} onChange={onChange} required/>
    </div>
  )
}