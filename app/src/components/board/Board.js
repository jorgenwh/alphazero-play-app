import React from "react"

import "./Board.css"
import { Square } from "./Square.js"

export function Board(props) {
  const board = []
  for (let i = 0; i < 8; i++) {
    const row = []
    for (let j = 0; j < 8; j++) {
      const idx = (j * 8) + i 
      const renderValidActionHint = props.renderValidActionHints && props.validActions[idx] === 1 && props.curPlayer !== props.aiPlayer
      const square = <Square 
                        piece={props.board[idx]}
                        curPlayer={props.curPlayer}
                        aiPlayer={props.aiPlayer}
                        idx={idx} 
                        renderValidActionHint={renderValidActionHint}
                        applyMove={props.applyMove}
                        key={idx}
                      />
      row.push(square)
    }
    board.push(<div className="boardRow" key={i}>{row}</div>)
  }

  return (<div className="board">{board}</div>)
}