import React from "react"
import "./Othello.css"

export function Piece(props) {
  if (props.valid === 1 && props.curPlayer === 1) {
    return (
      <div className="blackPieceHint"></div>
    )
  }
  if (props.valid === 1 && props.curPlayer === -1) {
    return (
      <div className="whitePieceHint"></div>
    )
  }
  if (props.value === 0) {
    return null
  }
  if (props.value === 1) {
    return (
      <div className="blackPiece"></div>
    )
  }
  if (props.value === -1) {
    return (
      <div className="whitePiece"></div>
    )
  }
  return null
}

export function Square(props) {
  const onClick = (event) => {
    if (props.piece === 0 && props.validMove === 1) {
      props.applyMove(props.idx)
    } else {
      console.log("Invalid move! (" + props.idx + ")")
    }
  }

  return (
    <div className="square" onClick={onClick}>
      <Piece 
        value={props.piece} 
        valid={props.validMove} 
        curPlayer={props.curPlayer}
      />
    </div>
  )
}