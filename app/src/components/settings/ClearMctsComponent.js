import React from "react";

import "./ClearMctsComponent.css"

export function ClearMctsComponent(props) {
  const onClick = () => {
    props.clearMcts()
  }

  return (
    <div className="clearMctsComponent">
      <h1 className="clearMctsComponentLabel">clear mcts: </h1>
      <button className="clearMctsComponentButton" onClick={onClick}>clear</button>
    </div>
  )
}