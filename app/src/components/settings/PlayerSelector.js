import React from "react";
import "./PlayerSelector.css"

import { SmallPiece } from "../board/Piece.js";

export function PlayerSelector(props) {
  const handleClick = (piece) => {
    props.setAiPlayer(piece)
  }

  return (
    <div className="playerSelector">
      <h1 className="playerSelectorLabel">alphazero plays as:</h1>
      <div className="selectorPieceContainer">
        <SmallPiece piece={1} handleClick={handleClick} renderValidActionHint={props.aiPlayer !== 1} curPlayer={1}/>
        <SmallPiece piece={-1} handleClick={handleClick} renderValidActionHint={props.aiPlayer !== -1} curPlayer={-1}/>
      </div>
    </div>
  )
}