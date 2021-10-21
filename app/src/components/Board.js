import React from "react"
import "./Othello.css"

import { Square } from "./Square"

export function Board(props) {
  console.log(props)
  const board = []
  for (let i = 0; i < 8; i++) {
    const row = []
    for (let j = 0; j < 8; j++) {
      const boardIdx = (i * 8) + j
      const square = <Square 
                        state={props.state} 
                        validMoves={props.validMoves} 
                        curPlayer={props.curPlayer} 
                        idx={boardIdx} 
                        applyMove={props.applyMove}
                      />
      row.push(square)
    }
    board.push(<div className="row">{row}</div>)
  }

  return (
    <div id="board">
      {board} 
    </div>
  )
}