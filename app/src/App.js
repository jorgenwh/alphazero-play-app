import React from "react"
import { useState, useEffect } from "react"

import './App.css';
import { Board } from "./components/Board"
import { TopInfoBox } from "./components/TopInfoBox"
import { BottomInfoBox } from "./components/BottomInfoBox"
import { getStartBoard, getValidActions, step, isConcluded, getResult, getSum } from "./components/OthelloRules"
import { Settings } from "./components/settings/Settings"

const resetQuery = "http://127.0.0.1:5000/reset"
const postStateQuery = "http://127.0.0.1:5000/post_state"

fetch(resetQuery)
  .then((response) => response.json())
  .then((response) => console.log("reset success: " + response.success))
  .catch((err) => console.log(err))

const postBoardAndGetMove = (board, curPlayer, numRollouts) => {
  return fetch(postStateQuery, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"board": board, "curPlayer": curPlayer, "numRollouts": numRollouts})
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
  const [aiPlayer, setAiPlayer] = useState(-1) // Which player will AZ play as
  const [numMCTSRollouts, setNumMCTSRollouts] = useState(40)
  const [appliedMove, setAppliedMove] = useState(-1)
  const [validHints, setValidHints] = useState(true)

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
    let nextPly = ply + 1 
    
    setBoard(nextBoard)
    setValidActions(nextValidActions)
    setCurPlayer(nextCurPlayer)
    setWinner(nextWinner)
    setPly(nextPly)
    setAppliedMove(-1)
  }, [appliedMove])

  useEffect(() => {
    if (curPlayer !== aiPlayer) { return }
    setValidHints(false)

    const move = postBoardAndGetMove(board, curPlayer, numMCTSRollouts)
    move.then((move) => {
      console.log("AlphaZero's move: " + move)
      applyMove(move)
      setValidHints(true)
    })
  }, [curPlayer, board, aiPlayer])

  const renderValidActionHints = validHints && curPlayer !== aiPlayer

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
            board={board}
            validActions={validActions}
            curPlayer={curPlayer}
            aiPlayer={aiPlayer}
            renderValidActionHints={renderValidActionHints}
            applyMove={applyMove}/>
        </div>
        <div className="bottomInfoBox">
          <BottomInfoBox 
            winner={winner}
            ply={ply}
            concluded={getSum(validActions) === 0}
          />
        </div>
      </div>
      <div className="settingsContainer">
        <Settings aiPlayer={aiPlayer} setAiPlayer={setAiPlayer} setNumRollouts={setNumMCTSRollouts}/> 
      </div>
    </div>
  );
}

export default App;