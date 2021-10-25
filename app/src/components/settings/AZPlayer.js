import React from "react";
import "./Settings.css"

import { SettingsPiece } from "./SettingsPiece";

export function AZPlayer(props) {
  
  return (
    <div className="AZPlayer">
      <h1 className="AZPlayerLabel">alphazero plays as:</h1>
      <SettingsPiece piece={1} selected={props.aiPlayer === 1} setAiPlayer={props.setAiPlayer}/>
      <SettingsPiece piece={-1} selected={props.aiPlayer === -1} setAiPlayer={props.setAiPlayer}/>
    </div>
  )
}