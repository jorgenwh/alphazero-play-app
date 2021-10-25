import React from "react"
import { useState, useEffect } from "react"

import "./App.css"
import { Board } from "./components/board/Board.js"
import { BoardHeader } from "./components/board/BoardHeader.js"
import { BoardFooter } from "./components/board/BoardFooter.js"
import { Settings } from "./components/settings/Settings.js"
import {
  getStartBoard, 
  getValidActions, 
  step, 
  isConcluded, 
  getResult, 
  getSum
} from "./components/logic/OthelloRules.js"

const resetQuery = "http://127.0.0.1:5000/reset"
const postStateQuery = "http://127.0.0.1:5000/post_state"

fetch(resetQuery)
  .then((response) => response.json())
  .then((response) => console.log("reset success: " + response.success))
  .catch((err) => console.log(err))

const postBoardAndGetMove = (board, curPlayer, mctsSimulations) => {
  return fetch(postStateQuery, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"board": board, "curPlayer": curPlayer, "mctsSimulations": mctsSimulations})
  })
    .then((response) => response.json())
    .then((response) => { return response.move })
    .catch((err) => console.log(err))
}

function App() {
  // Game state data 
  const [board, setBoard] = useState(getStartBoard())
  const [validActions, setValidActions] = useState(getValidActions(getStartBoard(), 1))
  const [curPlayer, setCurPlayer] = useState(1)
  const [winner, setWinner] = useState(0)
  const [ply, setPly] = useState(1)

  // Misc variables
  const [aiPlayer, setAiPlayer] = useState(-1) 
  const [mctsSimulations, setMctsSimulations] = useState(50)
  const [renderValidActionHints, setRenderValidActionHints] = useState(true)
  const [appliedMove, setAppliedMove] = useState(-1)

  const applyMove = (move) => {
    if (validActions[move] === 0) { console.log("invalid move! (" + move + ")"); return }
    setAppliedMove(move)
  }

  useEffect(() => {
    if (appliedMove === -1) { return }

    let nextCurPlayer = -curPlayer
    let nextBoard = board.slice()
    step(nextBoard, appliedMove, curPlayer)
    let nextValidActions = getValidActions(nextBoard, nextCurPlayer)
    if (getSum(nextValidActions) === 0) { nextValidActions = getValidActions(nextBoard, curPlayer); nextCurPlayer = curPlayer }
    let nextWinner = isConcluded(nextBoard) ? getResult(nextBoard) : 0
    
    setBoard(nextBoard)
    setValidActions(nextValidActions)
    setCurPlayer(nextCurPlayer)
    setWinner(nextWinner)
    setPly(ply + 1)
    setAppliedMove(-1)
  }, [appliedMove])

  useEffect(() => {
    if (curPlayer !== aiPlayer) { return }
    setRenderValidActionHints(false)

    const move = postBoardAndGetMove(board, curPlayer, mctsSimulations)
    move.then((move) => {
      console.log("AlphaZero's move: " + move)
      applyMove(move)
      setRenderValidActionHints(true)
    })
  }, [curPlayer, board, aiPlayer])

  return (
    <div className="container">
      <div className="left">
        <div className="boardHeaderContainer"><BoardHeader curPlayer={curPlayer}/></div>
        <div className="boardContainer">
          <Board
            board={board}
            validActions={validActions}
            curPlayer={curPlayer}
            aiPlayer={aiPlayer}
            renderValidActionHints={renderValidActionHints}
            applyMove={applyMove}
          />
        </div>
        <div className="boardFooterContainer">
          <BoardFooter
            winner={winner}
            ply={ply}
            concluded={getSum(validActions) === 0}
          />
        </div>
      </div>
      <div className="right">
        <div className="settingsContainer">
          <Settings 
            aiPlayer={aiPlayer} 
            setAiPlayer={setAiPlayer} 
            mctsSimulations={mctsSimulations}
            setMctsSimulations={setMctsSimulations}
          /> 
        </div>
      </div>
    </div>
  );
}

export default App;