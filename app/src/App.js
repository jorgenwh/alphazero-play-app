import React from "react"
import { useState, useEffect } from "react"

import './App.css';
import { Board } from "./components/Board"
import { InfoBox } from "./components/InfoBox"

let updateQuery = "http://127.0.0.1:5000/get_update"
let addMoveQuery = "http://127.0.0.1:5000/add_move"

const createDefaultState = () => {
  let defaultState = []
  for (let i = 0; i < 64; i++) { defaultState.push(0) }
  defaultState[27] = -1
  defaultState[28] = 1
  defaultState[35] = 1
  defaultState[36] = -1
  return defaultState
}

const createDefaultValids = () => {
  let defaultValids = []
  for (let i = 0; i < 64; i++) { defaultValids.push(0) }
  return defaultValids
}

function App() {
  const [curPlayer, setCurPlayer] = useState(1)
  const [state, setState] = useState(createDefaultState())
  const [validMoves, setValidMoves] = useState(createDefaultValids())
  const [ply, setPly] = useState(1)

  const parseResponse = (response) => {
    setState(response.boardState)
    setValidMoves(response.validMoves)
    setCurPlayer(response.currentPlayer)
    setPly(response.ply)
  }

  useEffect(() => {
    fetch(updateQuery)
      .then((response) => response.json())
      .then((response) => parseResponse(response))
      .catch((err) => console.log(err))
  }, [])

  const applyMove = (boardIdx) => {
    let moveData = {"move": boardIdx}

    fetch(addMoveQuery, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(moveData)
    })

    let nextState = state
    nextState[boardIdx] = curPlayer

    setCurPlayer(-curPlayer)
    setState(nextState)
  }

  return (
    <div className="appContainer">
      <div className="infoBox">
        <InfoBox curPlayer={curPlayer}/>
      </div>
      <div className="gameBoard">
        <Board 
          state={state} 
          validMoves={validMoves} 
          curPlayer={curPlayer} 
          applyMove={applyMove}/>
      </div>
    </div>
  );
}

export default App;
