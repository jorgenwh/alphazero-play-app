import React from "react"
import "./BottomInfoBox.css"

import { Piece } from "./Square"

export function BottomInfoBox(props) {

  let winnerDisplay = "none"
  if (props.winner !== 0) { winnerDisplay = <Piece value={props.winner}/> } 
  else if (props.concluded) { winnerDisplay = "draw" }

  return (
    <div className="bottomInfoBoxContainer">
      <h1 className="ply">ply: {props.ply}</h1>
      <h1 className="winner">winner: </h1>
      {(props.winner !== 0) ? <Piece value={props.winner}/> : <h1 className="winner">none</h1>}
    </div>
  )
}