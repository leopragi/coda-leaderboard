import React from 'react';
import { Badge, Tooltip } from 'antd';
import { MODE_COLOR } from '../utils/enums';
import CheckOutlined from '@ant-design/icons/CheckOutlined'

const CHOOSE_TEXT = Object.freeze({
  win: 'Choose winner',
  loss: 'Choose runner',
  tie: 'Choose tie',
})

export default ({value, mode, onClick, selectedType}) => (
  <Tooltip title={CHOOSE_TEXT[mode]} color={MODE_COLOR[mode]}>
    <Badge 
      onClick={onClick} 
      count={value} 
      style={{ backgroundColor: MODE_COLOR[mode] }} 
      showZero
    >
      <a
        href="#" 
        className={`head-example action-${mode}`}
        style={{backgroundColor: selectedType == mode ? MODE_COLOR[mode]: null}} 
      >
        {selectedType == mode ? 
          <CheckOutlined style={{color: 'white',  fontSize: 24, padding: 8}}/>: null}
      </a>
    </Badge>
  </Tooltip>
)