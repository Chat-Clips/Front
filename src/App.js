import { useState ,useRef, useEffect } from 'react';
import Header from './Tools/Header';
import Topbar from './Tools/Top-bar';
import './App.css';
import { useLocation } from 'react-router-dom';
import Chatroom from './Chat/Chat';

//닉네임 - 메세지 - 시간

function App() {
  const {state} = useLocation();
  const [foldsidebar, setFoldsidebar]=useState(false)
  const uid=state;

  const handlesidebar = () =>{
    setFoldsidebar(!foldsidebar)
  }

  function Readme(props){
    return(
      <div className={props.sidebar ? 'wrapper_fold': 'wrapper_unfold'}>
        <div className={props.sidebar ? 'main_fold': 'main_unfold'}>
          &nbsp;&nbsp;Readme<br />
          &nbsp;&nbsp;피드백 연결
        </div>
      </div>
    );
  }

  return(
    <div>
      <Topbar title='#chat' sidebar={foldsidebar}></Topbar>
      <Chatroom sidebar={foldsidebar}></Chatroom>
      <Header sidebarAction={handlesidebar}></Header>
    </div>
  );
}

export default App;