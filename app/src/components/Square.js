import React from "react"
import "./Othello.css"

export function Piece(props) {
  if (props.isValid === 1 && props.curPlayer === 1 && props.renderValidActionHints) { return (<div className="blackPieceHint"></div>) }
  if (props.isValid === 1 && props.curPlayer === -1 && props.renderValidActionHints) { return (<div className="whitePieceHint"></div>) }
  if (props.piece === 0) { return null }
  if (props.piece === 1) { return (<div className="blackPiece"></div>) }
  if (props.piece === -1) { return (<div className="whitePiece"></div>) }
  return null
}

export function Square(props) {
  const onClick = (event) => {
    if (props.curPlayer === props.aiPlayer) {
      console.log("it is not your turn to play.")
      return
    }
    props.applyMove(props.idx) 
  }

  return (
    <div className="square" onClick={onClick}>
      <Piece 
        piece={props.piece} 
        isValid={props.isValid} 
        curPlayer={props.curPlayer}
        renderValidActionHints={props.renderValidActionHints}
      />
    </div>
  )
}