import React from "react"

import "./Piece.css"

export function SmallPiece(props) {
  // This is used for the PlayerSelector component to let the player choose which color to play as
  const onClick = () => {
    if (props.handleClick !== undefined) {
      props.handleClick(props.piece)
    }
  }

  if (props.renderValidActionHint) {
    return (<div className={(props.curPlayer === 1) ? "blackPieceHintSmall" : "whitePieceHintSmall"} onClick={onClick}></div>)
  }

  if (props.piece === 1) {
    return (<div className="blackPieceSmall" onClick={onClick}></div>)
  }

  if (props.piece === -1) {
    return (<div className="whitePieceSmall" onClick={onClick}></div>)
  }

  return null
}

export function Piece(props) {
  if (props.renderValidActionHint) {
    return (<div className={(props.curPlayer === 1) ? "blackPieceHint" : "whitePieceHint"}></div>)
  }

  if (props.piece === 1) {
    return (<div className="blackPiece"></div>)
  }

  if (props.piece === -1) {
    return (<div className="whitePiece"></div>)
  }

  return null
}