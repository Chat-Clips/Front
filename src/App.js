import { useState ,useRef, useEffect } from 'react';
import Header from './Tools/Header';
import Topbar from './Tools/Top-bar';
import './App.css';
import Login from './Login/Login';
import Summary from './Summary/Summary';
import { Navigate } from 'react-router-dom';

//닉네임 - 메세지 - 시간

function App() {
  const [foldsidebar, setFoldsidebar]=useState(false)

  const handlesidebar = () =>{
    setFoldsidebar(!foldsidebar)
  }

  return(
    <div>
      <Topbar title='#chat' sidebar={foldsidebar}></Topbar>
      <Chatroom sidebar={foldsidebar}></Chatroom>
      <Header sidebarAction={handlesidebar}></Header>
    </div>
  );
}

//라우팅할 때 채팅과 요약페이지 분리
function Chatroom(props){
  const [text, setText]=useState('');
  const [chat, setChat]=useState([]);
  const [lock, setLock]=useState(false);
  const messageEndRef = useRef();

  const finBtn=()=>{
    if(!lock){setLock(true)}
  }

  const onChange=(e)=>{
    const inputText=e.target.value;
    setText(inputText);
  }

  const activeEnter = (e) => {
    if(e.key === "Enter"){
      sendMsg();
    }
  }

  const sendMsg = () => {
    let copyChat = [...chat];
    if(text !== '' && !lock) {
      copyChat.push(text);
      setChat(copyChat);
      setText('');
    }
  }

  useEffect(()=>{
    messageEndRef.current.scrollIntoView({behavior: 'smooth'});
  }, [chat]);
  
  return (
    <div>
      {lock ?
      (
        <Summary sidebar={props.sidebar} />
      ) :
      (
        <div>
          <button className='finbtn' onClick={finBtn}>회의 끝내기</button>
          <div className={props.sidebar ? 'wrapper_fold' :'wrapper_unfold'}>
            <div className={props.sidebar ? 'chat_fold' : 'chat_unfold'}>
              <ul className='_ul'>
                <ChatList ChatList={chat} />
              </ul>
              <div ref={messageEndRef}></div>
            </div>
          </div>
          <input onChange={onChange} onKeyDown={(e)=>activeEnter(e)} className={props.sidebar ? 'chat_bar_fold' :'chat_bar_unfold'} type='text' name='text' placeholder='   메세지 보내기' value={text}></input>      
        </div>
      )}
    </div>
  );
}

function ChatList({ChatList}){
  return(
    ChatList.map((chat, i)=>{
      return(
        <li key={i}>
          {chat}
        </li>
      );
    })
  );
}

export default App;