import React from "react"

import "./BoardHeader.css"
import { SmallPiece } from "./Piece.js"

export function BoardHeader(props) {
  return (
    <div className="boardHeader">
      <h1 className="boardHeaderGameTitleLabel">othello</h1>
      <h1 className="boardHeaderCurPlayerLabel">current player: </h1>
      <SmallPiece piece={props.curPlayer}/>
    </div>
  )
}