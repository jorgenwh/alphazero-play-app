import React from "react"
import "./TopInfoBox.css"

import { Piece } from "./Square"

export function TopInfoBox(props) {
  return (
    <div className="topInfoBoxContainer">
      <h1 className="gameTitle">othello</h1>
      <h1 className="currentPlayer">current player: </h1>
      <Piece value={props.curPlayer}/>
    </div>
  )
}