import { useEffect, useState, useRef } from 'react';
import './Modal.css'
import axios from 'axios';

function Modal(props){
    const {open, close, header }=props
    const [roomname, setRoomname]=useState("")
    const [roomId, setRoomId]=useState(null)
    
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
                        <form onSubmit>
                            <input type='text' value={roomId} placeholder='룸 ID 입력' required onChange={event => setRoomId(event.currentTarget.value)}></input>
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