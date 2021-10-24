import React from "react"
import { useState, useEffect } from "react"

import './App.css';
import { Board } from "./components/Board"
import { TopInfoBox } from "./components/TopInfoBox"
import { BottomInfoBox } from "./components/BottomInfoBox"
import { getStartBoard, getValidActions, step, isConcluded, getResult, getSum } from "./components/OthelloRules"

const resetQuery = "http://127.0.0.1:5000/reset"
const postStateQuery = "http://127.0.0.1:5000/post_state"

fetch(resetQuery)
  .then((response) => response.json())
  .then((response) => console.log("reset success: " + response.success))
  .catch((err) => console.log(err))

const postBoardAndGetMove = (board, curPlayer) => {
  return fetch(postStateQuery, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"state": board, "curPlayer": curPlayer})
  })
    .then((response) => response.json())
    .then((response) => {
      return response.move
    })
    .catch((err) => console.log(err))
}

function App() {
  const [aiPlayer, setAiPlayer] = useState(-1)
  const [curPlayer, setCurPlayer] = useState(1)
  const [state, setState] = useState(getStartBoard())
  const [validMoves, setValidMoves] = useState(getValidActions(state, curPlayer))
  const [ply, setPly] = useState(1)
  const [winner, setWinner] = useState(0)

  const applyMove = (boardIdx) => {
    // Update state based on the move
    let newCurPlayer = -curPlayer
    let nextState = state.slice()
    step(nextState, boardIdx, curPlayer)
    setState(nextState)
    setPly(ply + 1)

    const concluded = isConcluded(nextState)
    const result = (concluded) ? getResult(nextState) : 0

    if (concluded) {
      setValidMoves(getValidActions(nextState, -curPlayer))
      setWinner(result)
    } else {
      let validMoves = getValidActions(nextState, newCurPlayer)
      if (getSum(validMoves) === 0) {
        validMoves = getValidActions(nextState, curPlayer)
        newCurPlayer = -newCurPlayer
      } else {
        setCurPlayer(newCurPlayer)
      }
      setValidMoves(validMoves) 
    }

    // if the human player made the move, inform the server about the move made
    if (newCurPlayer === aiPlayer) {
      let moveData = postBoardAndGetMove(nextState, newCurPlayer)
      moveData.then((move) => {
        console.log("received move: " + move)

        let nextState2 = nextState.splice()

      })
    }
  }

  return (
    <div className="appContainer">
      <div className="gameContainer">
        <div className="topInfoBox">
          <TopInfoBox 
            curPlayer={curPlayer}
          />
        </div>
        <div className="gameBoard">
          <Board 
            state={state} 
            validMoves={validMoves} 
            curPlayer={curPlayer} 
            applyMove={applyMove}/>
        </div>
        <div className="bottomInfoBox">
          <BottomInfoBox 
            ply={ply}
            winner={winner}
          />
        </div>
      </div>
      <div className="miscContainer">

      </div>
    </div>
  );
}

export default App;