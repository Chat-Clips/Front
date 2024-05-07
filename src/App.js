import { useState ,useRef, useEffect } from 'react';
import Header from './Tools/Header';
import Topbar from './Tools/Top-bar';
import './App.css';
import { useLocation } from 'react-router-dom';
import Chatroom from './Chat/Chat';
import Summary from './Summary/Summary';

function App() {
  const {state} = useLocation();
  const [foldsidebar, setFoldsidebar]=useState(false)
  const [chat, setChat]=useState({title: null,roomId: null})
  const [lock, setLock]=useState([])
  const uid=state;

  const handlechild=(name,id)=>{
    let list={
      title : name,
      roomId : id,
    }
    if(name!==null){setChat(list)}
  }

  const handleLock=(id)=>{
    let newlock=[...lock];
    newlock.push(id)
    setLock(newlock)
  }

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


  const element1=(
    <Readme sidebar={foldsidebar}></Readme>
  )

  const element2=(
    <Chatroom title={chat.title} roomId={chat.roomId} lock={handleLock}></Chatroom>
  )

  const element3=(
    <Summary sidebar={foldsidebar}></Summary>
  )
  
  return(
    <div>
      <Topbar title={chat.title} sidebar={foldsidebar}></Topbar>
      {(lock.includes(chat.roomId))?element3:(((chat.roomId===null)&&(chat.title===null))?element1:element2)}
      <Header getinfo={handlechild} sidebarAction={handlesidebar}></Header>
    </div>
  );
}
export default App;