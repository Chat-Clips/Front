import './Chat.css'
import { useState ,useRef, useEffect } from 'react';
import Header from '../Tools/Header';
import Topbar from '../Tools/Top-bar';
import '../App.css';
import Summary from '../Summary/Summary';
import * as dayjs from 'dayjs';
import axios from 'axios';
import { Uid } from '../Tools/atoms';
import { useRecoilValue } from 'recoil';

function Chatroom(props){
    const uid=useRecoilValue(Uid);
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

  export default Chatroom;