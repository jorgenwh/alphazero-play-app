import React from "react"

import "./BoardFooter.css"
import { SmallPiece } from "./Piece.js"

export function BoardFooter(props) {
  let winnerDisplay = <h1 className="boardFooterWinnerLabel">none</h1>
  if (props.concluded && props.winner === 0) { winnerDisplay = <h1 className="boardFooterWinnerLabel">draw</h1> }
  if (props.winner !== 0) { winnerDisplay = <SmallPiece piece={props.winner}/> } 

  return (
    <div className="boardFooter">
      <h1 className="boardFooterPlyLabel">ply: {props.ply}</h1>
      <h1 className="boardFooterWinnerLabel">winner: </h1>
      {winnerDisplay}
    </div>
  )
}