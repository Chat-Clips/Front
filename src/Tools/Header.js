import { useEffect, useState, useRef } from 'react';
import './Modal.css'
import axios from 'axios';
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import dayjs from 'dayjs';
import { connectStomp, disconnectStomp } from '../Chat/Chat';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Uid } from './atoms';
import { wait } from '@testing-library/user-event/dist/utils';
import { Stomp } from '@stomp/stompjs';

function Modal(props){
    const stompClient=useRef(null);
    const uid=useRecoilValue(Uid)
    const {open, close, enter, header }=props
    const [roomname, setRoomname]=useState("")
    const [roomId, setRoomId]=useState('')
   // const [join, setJoin]=useState(false)
    
    const handleclickclosebtn=()=>{
        {close()}
        setRoomId("")
        setRoomname("")
    }
    
    //createChatroom
    const PostcreateRoom = async()=>{
        try{
            const res= await axios.post('/chatroom/createRoom?roomName='+roomname);
            //console.log(res);
            return res;
        }
        catch(error){console.log(error)}        
    }

    const handlecreateRoom = async() => {
        const res=await PostcreateRoom();
        if(res.status===200){
            alert("새로운 채팅방의 룸ID: "+res.data);
            setRoomId(res.data);
            setRoomname("")
        }
        else{
            alert('error')
            setRoomname("")
        }
    }
    //
    
    //EnterChatroom
    useEffect(()=>{
        connectStomp();
        console.log(typeof stompClient.send)
        
        return()=>disconnectStomp()
    },[])

    /*const userenter=()=>{
        const currentTime=dayjs();
        if(stompClient.current){
            const messageObj={    
                type: "ENTER",
                roomId: roomId,
                sender: uid,
                message: '입장',
                time : currentTime,
            };
        stompClient.send("/pub/enterUser",{},JSON.stringify(messageObj))
        }
    }*/

    const userenter=()=>{
        const currentTime=dayjs();
        wait(3000)
        stompClient.current.publish({
            destination: "/pub/enterUser",
            body: JSON.stringify({
                type: "ENTER",
                roomId: roomId,
                sender: uid,
                message: '입장',
                time : currentTime
            }),
        });
    }
    

    const handlejoinRoom =() => {
        userenter();
        {enter()}
        handleclickclosebtn();
    }
    //

    //웹소켓 연결
    const connectStomp=()=>{
        try{
          const socket=new WebSocket("ws://localhost:8080/ws");
          stompClient.current=Stomp.over(socket);
          stompClient.current.connect({},()=>{
            stompClient.current.subscribe("/sub/chatroom/"+roomId,(message)=>
            {
              if(message.body){
                let m=JSON.parse(message.body);
                console.log(m)
                /*
                if((msg.sender !== m.sender) && (msg.message!==m.message)){
                  setMsg(m)
                }*/
              }    
            });
          console.log(roomId);
          stompClient.current.activate();
          });
        }
        catch(error){
            console.log(error);
        }
      }

      
    //웹소켓 연결 해제
    const disconnectStomp=()=>{
        if(stompClient.current.connected){
        stompClient.current.deactivate();;
        }
    }


    return(
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div>{header}</div>
                        <button className="close" onClick={handleclickclosebtn}>
                            &times;
                        </button>
                    </header>
                    <main className='grid'>
                        <form onSubmit={handlecreateRoom}>
                            <input type='text' placeholder='채팅방 이름' value={roomname} required onChange={event => setRoomname(event.currentTarget.value)}></input>
                            <input type='submit' value='채팅방 만들기'></input>
                        </form>
                        <div></div>
                        <form onSubmit={handlejoinRoom}>
                            <input type='text' value={roomId} placeholder='룸 ID 입력' required onChange={event => setRoomId(event.currentTarget.value)} onSubmit={event => setRoomId(event.currentTarget.value)}></input>
                            <input type='submit' value='채팅방 참여하기'></input>
                        </form>
                        </main>
                    <footer>
                        <button className="close" onClick={handleclickclosebtn}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null }
        </div>
    );
}

export default Modal;