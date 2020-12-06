import React, { useState } from 'react';
import { Input, Modal, Tooltip, Button, message } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import axios from 'axios';

export default ({refreshTeam}) => {
    const [teamName, setTeamName] = useState('')
    const [updating, setUpdating] = useState(false)
    const [visible, setVisibility] = useState(false)

    const addTeam = async() => {
        try {
            setUpdating(true)
            await axios.post('/api/team', {teamName});
            message.success('Team added successfully!')
            setUpdating(false)
            setVisibility(false)
            await refreshTeam()
            setTeamName('')    
        } catch(error) {
            message.error('Something went wrong. Please try again later.')
        }
    }

    return (
        <>
        <Tooltip title='Add team'>
            <Button 
                style={{marginLeft: 10}}
                size="large" 
                type="primary" 
                shape="circle" 
                icon={<PlusOutlined />} 
                onClick={() => setVisibility(true)}
            />
        </Tooltip>
        <Modal
          title="Add Team"
          visible={visible}
          onOk={addTeam}
          onCancel={() => setVisibility(false)}
          confirmLoading={updating}
          okText="Confirm"
        >
            <Input 
                placeholder="Type team name" 
                value={teamName} 
                onChange={e => setTeamName(e.target.value)}
            />
        </Modal>
        </>
    )
}
