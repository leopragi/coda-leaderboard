import React, { useState } from 'react';
import { Modal } from 'antd';
import { MODE } from '../utils/enums';

const TEXT_MAPPING = Object.freeze({
    win: 'winner',
    loss: 'losser',
    tie: 'tie',
})

const getText = ({team_name, type}) => type == MODE.TIE ? team_name: `${team_name} is the ${TEXT_MAPPING[type]}`

export default ({visible, onConfirm, onCancel, selection}) => {
    const isTie = (selection.filter(s => s.type === MODE.TIE)).length === 2
    const [updating, setUpdating] = useState(false)

    const onConfirmButton = async() => {
      setUpdating(true)
      await onConfirm()
      setUpdating(false)
    }

    return (
        <Modal
          title="Confirm"
          visible={visible}
          onOk={onConfirmButton}
          onCancel={onCancel}
          confirmLoading={updating}
          okText="Confirm"
          cancelText="Clear"
        >
          {isTie ? 
            selection.map(s => getText(s)).join(' and ') + ' is tie' :
            selection.map(s => getText(s)).join(' and ')}
        </Modal>
    )
}
