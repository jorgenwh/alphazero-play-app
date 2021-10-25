import React from "react";
import "./Settings.css"

import { AZPlayer } from "./AZPlayer";
import { MCTSSims } from "./MCTSSims";

export function Settings(props) {

  return (
    <div className="settings">
      <h1 className="settingsTitle">settings</h1>
      <div className="settingsComponentsContainer">
        <AZPlayer aiPlayer={props.aiPlayer} setAiPlayer={props.setAiPlayer}/> 
        <MCTSSims setNumRollouts={props.setNumRollouts}/> 
      </div>
    </div>
  )
}