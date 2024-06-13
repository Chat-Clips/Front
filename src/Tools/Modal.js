import { useEffect, useState, useRef } from 'react';
import './Modal.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { Uid } from './atoms';
import { wait } from '@testing-library/user-event/dist/utils';
import { Stomp } from '@stomp/stompjs';
import api from '../apis/api';

function Modal(props){
    const stompClient=useRef(null);
    const uid=useRecoilValue(Uid)
    const {open, close, enter, header }=props
    const [roomname, setRoomname]=useState("")
    const [roomId, setRoomId]=useState('')
    
    const handleclickclosebtn=()=>{
        close()
        setRoomId("")
        setRoomname("")
    }
    
    //createChatroom
    const PostcreateRoom = async()=>{
        try{
            const res= await api.post(process.env.REACT_APP_API_BASE_URL+'/chatroom/createRoom?roomName='+roomname);
            //console.log(res);
            return res;
        }
        catch(error){console.log(error)}        
    }

    const handlecreateRoom = async(event) => {
        event.preventDefault();
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
        if(roomId){
            connectStomp();
            //return()=>disconnectStomp()
        }

    },[roomId]);

    const userenter=()=>{
        stompClient.current.publish({
            destination: "/pub/enterUser",
            body: JSON.stringify({
                type: "ENTER",
                roomId: roomId,
                sender: uid,
                message: '입장'
            }),
        });
    }
    
    const handlejoinRoom =(event) => {
        event.preventDefault();
        userenter();
        enter()
        handleclickclosebtn();
    }
    //

    //웹소켓 연결
    const connectStomp=()=>{
        try{
          const socket=new WebSocket("ws://52.79.42.86:8080/ws");
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