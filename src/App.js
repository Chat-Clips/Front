import { useState } from 'react';
import Header from './Tools/Header';
import Topbar from './Tools/Top-bar';
import './App.css';
import { useLocation } from 'react-router-dom';
import Chatroom from './Chat/Chat'
import Summary from './Summary/Summary';

export const baseurl='https://2cb4-165-194-17-109.ngrok-free.app'

function App() {
  const [foldsidebar, setFoldsidebar]=useState(false)
  const [chat, setChat]=useState({title: null,roomId: null})
  const [lock, setLock]=useState([])
  const [note, setNote]=useState('');

  const getGptsum=(e)=>{
    setNote(e)
  }

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
          사용 설명:<br/>
          1. 화면을 두 개 이상 띄운다.<br/>
          2. 회원가입을 다른 아이디랑 이름으로 2개 이상 가입한다.<br/>
          3. 2개 이상의 계정으로 로그인을 진행한다.<br/>
          4. 계정 중 하나로 방을 만든 후, 방 아이디를 공유한다.<br/>
          5. 다른 계정도 방 아이디를 치고 해당 방에 들어간다.<br/>
          6. 채팅을 자유롭게 진행한다.<br/>
          7. 채팅을 끝내고 싶으면 채팅 종료 버튼을 클릭한다.<br/>
        </div>
      </div>
    );
  }
  
  const element1=(
    <Readme sidebar={foldsidebar}></Readme>
  )

  const element2=(
    <Chatroom title={chat.title} roomId={chat.roomId} lock={handleLock} note={getGptsum}></Chatroom>
  )

  const element3=(
    <Summary note={note} sidebar={foldsidebar}></Summary>
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