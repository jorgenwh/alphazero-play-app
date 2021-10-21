import React from "react"
import "./InfoBox.css"

import { Piece } from "./Square"

export function InfoBox(props) {
  return (
    <div className="infoBoxContainer">
      <h1 className="gameTitle">othello</h1>
      <h1 className="currentPlayer">current player: </h1>
      <Piece value={props.curPlayer}/>
    </div>
  )
}