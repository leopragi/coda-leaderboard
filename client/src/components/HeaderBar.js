import React, {useState} from 'react';
import SortAscendingOutlined from '@ant-design/icons/SortAscendingOutlined';
import { Typography, Tooltip, Button, Input } from 'antd';
import AddTeam from './AddTeam';

const { Search } = Input;
const { Title } = Typography;


export default ({onSearch, onSort, nameSorted, refreshTeam}) => {

    let [searching, setSearching] = useState(false)
    const onSearchClick = async(text) => {
        setSearching(true)
        await onSearch(text)
        setSearching(false)
    }

    return (
        <div style={{display: 'flex', marginTop: 15}}>
            <div style={{flex: 5}}>
                <Title style={{color: 'white'}}>
                    Coda Leaderboard
                </Title>
            </div>
            <div style={{flex: 3}}>
                <Search 
                    placeholder="Enter team name or points..." 
                    enterButton="Search" 
                    size="large" 
                    onSearch={onSearchClick}
                    loading={searching}
                />
            </div>
            <Tooltip title={nameSorted? "Clear sort": "Sory by Name"}>
                <Button 
                    style={{marginLeft: 10}}
                    size="large" 
                    type="primary" 
                    shape="circle" 
                    icon={<SortAscendingOutlined />} 
                    onClick={onSort}
                />
            </Tooltip>
            <AddTeam refreshTeam={refreshTeam}/>
        </div>
    )
}