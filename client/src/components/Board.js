
import React, { useState } from 'react';
import { Card, message, Statistic } from 'antd';
import ActionBadge from './ActionBadge'
import { MODE } from '../utils/enums';

const podiumStyles = {
  0: {
    backgroundColor: `#fbb034`,
    backgroundImage: `linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)`
  },
  1: {
    backgroundColor: '#b8c6db',
    backgroundImage: `linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)`
  },
  2: {
    backgroundColor: '#772f1a',
    backgroundImage: `linear-gradient(315deg, #772f1a 0%, #f2a65a 74%)`
  }
}


export default function Board ({selection, setSelection, teams=[], gridStyle, podium = false}) {
  if(teams.length === 0) return null
  const chooseAction = (team, type, invalidTypes) => (e) => {
    e.preventDefault()
    const {_id: id, team_name} = team
    if(selection.length == 1) {
      const {id: selectedId, type: selectedType} = selection[0]
      if(selectedId == id && type == selectedType) {
        return setSelection([])
      }

      if(selectedId == id) {
        return message.error('Please choose a different team.')
      }
      if(invalidTypes.includes(selectedType)) {
        return message.error(`Teams cannot be ${selectedType} and ${type}. Try choosing valid result.`)
      }
    }
    setSelection([...selection, { type, id, team_name }])  
  }

  const getSelectedType = (id) => {
    const selected = selection.find(item => item.id == id)
    return selected ? selected.type: null
  }

  return (
    <Card>
    {teams.map((team, i) => (
      <Card.Grid style={{...gridStyle, ...(podium? podiumStyles[i]:{})}}>
        <div className={podium ? "shine-card": ''}>
          <Statistic title={team.team_name} value={team.score} />
          <div style={{marginTop: 24}}>
            <ActionBadge 
              onClick={chooseAction(team, MODE.WIN, [MODE.WIN, MODE.TIE])}
              value={team.wins}
              selectedType={getSelectedType(team._id)}
              mode={MODE.WIN}
            />
            <ActionBadge 
              onClick={chooseAction(team, MODE.LOSS, [MODE.LOSS, MODE.TIE])}
              value={team.losses}
              selectedType={getSelectedType(team._id)}
              mode={MODE.LOSS}
            />
            <ActionBadge 
              onClick={chooseAction(team, MODE.TIE, [MODE.WIN, MODE.LOSS])}
              value={team.ties}
              selectedType={getSelectedType(team._id)}
              mode={MODE.TIE}
            />          
          </div>
        </div>
      </Card.Grid>
    ))}
    </Card>
  )
}