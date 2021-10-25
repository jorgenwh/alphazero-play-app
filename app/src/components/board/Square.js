import React from "react"

import "./Square.css"
import { Piece } from "./Piece.js"

export function Square(props) {
  const onClick = () => {
    if (props.curPlayer !== props.aiPlayer) {
      props.applyMove(props.idx) 
    } else {
      console.log("it is not your turn to play.")
    }
  }

  return (
    <div className="square" onClick={onClick}>
      <Piece 
        piece={props.piece} 
        curPlayer={props.curPlayer}
        renderValidActionHint={props.renderValidActionHint}
      />
    </div>
  )
}