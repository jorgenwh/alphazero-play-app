import React from "react"
import { useState } from "react"

import './App.css';
import { Board } from "./components/Board"
import { InfoBox } from "./components/InfoBox"

function createDefaultState() {
  let defaultState = []
  for (let i = 0; i < 64; i++) { defaultState.push(0) }
  defaultState[27] = -1
  defaultState[28] = 1
  defaultState[35] = 1
  defaultState[36] = -1
  return defaultState
}

function App() {
  const [game, setGame] = useState("othello")
  const [curPlayer, setCurPlayer] = useState(1)
  const [state, setState] = useState(createDefaultState())
  const [ply, setPly] = useState(1)

  const [apiData, setApiData] = useState()

  let apiQuery = "http://127.0.0.1:5000/hello/"
  console.log("Querying: " + apiQuery)

  /*fetch(apiQuery)
    .then((results) => results.json())
    .then((data) => setApiData(data))
  */
  console.log(apiData)

  const applyMove = (boardIdx) => {
    let nextState = state
    nextState[boardIdx] = curPlayer

    setCurPlayer(-curPlayer)
    setState(nextState)
    setPly(ply + 1)
  }

  return (
    <div className="appContainer">
      <div className="infoBox">
        <InfoBox game={game} curPlayer={curPlayer}/>
      </div>
      <div className="gameBoard">
        <Board state={state} applyMove={applyMove}/>
      </div>
    </div>
  );
}

export default App;
