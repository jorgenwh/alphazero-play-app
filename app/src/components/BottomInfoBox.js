import React from "react"
import "./BottomInfoBox.css"

import { Piece } from "./Square"

export function BottomInfoBox(props) {
  let winnerDisplay = <h1 className="winner">none</h1>
  if (props.winner !== 0) { winnerDisplay = <Piece piece={props.winner}/> } 
  else if (props.concluded === 0) { winnerDisplay = <h1 className="winner">draw</h1>}

  return (
    <div className="bottomInfoBoxContainer">
      <h1 className="ply">ply: {props.ply}</h1>
      <h1 className="winner">winner: </h1>
      {winnerDisplay}
    </div>
  )
}