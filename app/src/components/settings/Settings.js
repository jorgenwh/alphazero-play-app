import React from "react";
import "./Settings.css"

import { PlayerSelector } from "./PlayerSelector.js";
import { MctsSimulationsSelector } from "./MctsSimulationsSelector.js";

export function Settings(props) {

  return (
    <div className="settings">
      <h1 className="settingsTitle">settings</h1>
      <div className="settingsComponentsContainer">
        <PlayerSelector aiPlayer={props.aiPlayer} setAiPlayer={props.setAiPlayer}/>
        <MctsSimulationsSelector mctsSimulations={props.mctsSimulations} setMctsSimulations={props.setMctsSimulations}/> 
      </div>
    </div>
  )
}