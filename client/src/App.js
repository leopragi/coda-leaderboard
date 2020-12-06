import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Spin } from 'antd';

import ResultConfirm from './components/ResultConfirm';
import Board from './components/Board';
import HeaderBar from './components/HeaderBar';
import { SEARCH } from './utils/enums';

const { Header, Content, Footer } = Layout;


function getDocumentHeight() {
	const body = document.body;
	const html = document.documentElement;
	
	return Math.max(
		body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight
	);
};

function getScrollTop() {
	return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}


function App() {
  let [selection, setSelection] = useState([])
  let [visible, setVisibility] = useState(false)
  let [teams, setTeams] = useState([])
  let [podium, setPodium] = useState([])
  let [loading, setLoading] = useState(false)
  let [nameSorted, setNameSorted] = useState(false)
  let [page, setPage] = useState(0)

  async function getTeam(page) {
    const {data:{podium, teams}} = await axios.get('/api/team', {params: {page}});
    return {podium, teams}
  }

  window.onscroll = async() => {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    setPage(++page);
    const {teams: pagedTeams} = await getTeam(page)
    setTeams([...teams, ...pagedTeams])
  };

  async function publishResult(selection) {
    const { data } = await axios.post('/api/team/publish', { selection });
    setTeams(data.teams);  
    setPodium(data.podium);  
  }


  async function getPagedTeams (page) {
    setLoading(true)
    const {podium, teams} = await getTeam(page)
    setPodium(podium);  
    setTeams(teams);  
    setLoading(false)
  }

  async function getSortedTeams (sort = SEARCH.SCORE) {
    setLoading(true)
    const {data} = await axios.get(`/api/team/sort/${sort}`);
    setPodium(data.podium);  
    setTeams(data.teams);  
    setLoading(false)
  }

  async function searchTeams (text) {
    setLoading(true)
    const {data} = await axios.get('/api/team/search', {params: {q: text}});
    setPodium(data.podium);  
    setTeams(data.teams);  
    setLoading(false)
  }

  useEffect(() => {
    getPagedTeams(0)
  }, []);

  if(selection.length == 2) {
    if(visible == false) {
      setVisibility(true)
    }
  }

  const onConfirm = async() => {
    await publishResult(selection)
    setSelection([])
    setVisibility(false)
  }

  const onCancel = () => {
    setSelection([])
    setVisibility(false)
  }

  const onSearch = async(text) => {
    setPage(0)
    if(!text) {
      await getPagedTeams(0)
    } else {
      await searchTeams(text)
    }
  }

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: 75, zIndex: 100 }}>
        <HeaderBar 
          onSearch={onSearch} 
          onSort={async() => {
            if(!nameSorted) await getSortedTeams(SEARCH.NAME)
            else await getPagedTeams(0)
            setNameSorted(!nameSorted)
          }}
          nameSorted={nameSorted}
          refreshTeam={getPagedTeams}
        />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 100 }}>
        {loading ? <div style={{ textAlign: 'center'}}>
          <Spin size="large" />
        </div> : (podium || []).length == 0 && (teams || []).length == 0? 'No data found.': (
          <>
            <Board 
              teams={podium} 
              setSelection={setSelection}
              selection={selection}
              podium={true}
              gridStyle={{
                width: '33.3%',
                textAlign: 'center',
                overflow: 'hidden'
              }}
            />
            <Board 
              teams={teams} 
              setSelection={setSelection}
              selection={selection}
              gridStyle={{
                width: '25%',
                textAlign: 'center',
                overflow: 'hidden'
              }}
            />
          </>
        )}
        <ResultConfirm 
          selection={selection}
          visible={visible}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Created by LeoPragi (Pragatheeswaran)
      </Footer>
    </Layout>
  )

}

export default App;
