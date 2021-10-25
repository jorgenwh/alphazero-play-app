import React from "react"
import "./Othello.css"

import { Square } from "./Square"

export function Board(props) {
  const board = []
  for (let i = 0; i < 8; i++) {
    const row = []
    for (let j = 0; j < 8; j++) {
      const idx = (j * 8) + i 
      const pieceValue = props.board[idx]
      const isValid = props.validActions[idx]
      const square = <Square 
                        piece={pieceValue} 
                        isValid={isValid}
                        curPlayer={props.curPlayer} 
                        aiPlayer={props.aiPlayer}
                        idx={idx} 
                        renderValidActionHints={props.renderValidActionHints}
                        applyMove={props.applyMove}
                        key={idx}
                      />
      row.push(square)
    }
    board.push(<div className="row" key={i}>{row}</div>)
  }

  return (<div id="board">{board}</div>)
}