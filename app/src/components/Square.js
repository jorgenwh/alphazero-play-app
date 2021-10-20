import React from "react"
import "./Othello.css"

export function Piece(props) {
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
    if (props.state[props.idx] === 0) {
      props.applyMove(props.idx)
    } else {
      console.log("Invalid move!")
    }
  }

  return (
    <div className="square" onClick={onClick}>
      <Piece value={props.state[props.idx]}/>
    </div>
  )
}