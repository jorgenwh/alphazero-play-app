import React from "react";
import "./Settings"

export function SettingsPiece(props) {
  
  const onClick = () => {
    props.setAiPlayer(props.piece)
  }

  if (props.piece === 1 && props.selected) {
    return (
      <div className="blackSettingsPiece" onClick={onClick}></div>
    )
  }
  if (props.piece === -1 && props.selected) {
    return (
      <div className="whiteSettingsPiece" onClick={onClick}></div>
    )
  }
  if (props.piece === 1) {
    return (
      <div className="blackSettingsPieceNotSelected" onClick={onClick}></div>
    )
  }
  if (props.piece === -1) {
    return (
      <div className="whiteSettingsPieceNotSelected" onClick={onClick}></div>
    )
  }
}