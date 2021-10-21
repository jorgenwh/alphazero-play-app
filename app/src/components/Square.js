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
    if (props.state[props.idx] === 0 && props.validMoves[props.idx] === 1) {
      props.applyMove(props.idx)
    } else {
      console.log("Invalid move!")
    }
  }

  return (
    <div className="square" onClick={onClick}>
      <Piece 
        value={props.state[props.idx]} 
        valid={props.validMoves[props.idx]} 
        curPlayer={props.curPlayer}
      />
    </div>
  )
}