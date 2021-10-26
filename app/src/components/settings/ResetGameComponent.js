import React from "react";

import "./ResetGameComponent.css"

export function ResetGameComponent(props) {
  const onClick = () => {
    props.resetGame()
  }

  return (
    <div className="resetGameComponent">
      <h1 className="resetGameComponentLabel">reset game:</h1>
      <button className="resetGameComponentButton" onClick={onClick}>reset</button>
    </div>
  )
}