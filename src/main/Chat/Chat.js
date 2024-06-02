import './Chat.css'
import { useState ,useRef, useEffect } from 'react';
import '../../App.css';
import * as dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { Uid } from '../../Tools/atoms';
import { Stomp } from '@stomp/stompjs';
import api from '../../apis/api';
import { useNavigate, useParams } from 'react-router-dom';

function Chatroom(props){
  //const {roomId}=useParams();
  const stompClient=useRef(null);
  const messageEndRef = useRef();
  const uid=useRecoilValue(Uid);
  const params=useParams();
  const [roomId, setRoomId]=useState(props.roomId)
  const lock=props.lock
  const navigate=useNavigate();

    const [text, setText]=useState('');
    const [jp, setJp]=useState([]);
    //const [note, setNote]=useState(null);
    const [msg, setMsg]=useState('')
    
    //웹소켓 연결
    const connectStomp=()=>{
      try{
        //const socket=new WebSocket("ws://13.125.121.147:8080/ws");
        const socket=new WebSocket("ws://localhost:8080/ws");
        stompClient.current=Stomp.over(socket);
        stompClient.current.connect({},()=>{
          stompClient.current.subscribe("/sub/chatroom/"+props.roomId,(message)=>
          {
            if(message.body){
              let m=JSON.parse(message.body);
              
              setMsg(m)
            }    
          });
        stompClient.current.activate();
        });
      }
      catch(error){
          console.log(error);
      }
    }

    
  //메세지 보내기
  const SendMessage=() =>{
    const currentTime=dayjs();
    if(stompClient.current && text){
      stompClient.current.publish({
        destination: "/pub/sendMessage",
        body: JSON.stringify({
            type: "TALK",
            roomId: roomId,
            sender: uid,
            message: text,
            time : currentTime
        }),
      });
    }
  };

  //
  useEffect(()=>{
    const fetch = async () => {
      setRoomId(props.roomId)
      await connectStomp();
      await getChatting(props.roomId);
      console.log("방바뀜");
    };
    fetch();
    // return () => {
    //   disconnectStomp();
    // }
    //return() => disconnectStomp();
  },[props.roomId]) //roomId가 바뀐 경우

  //채팅 내용 복구
  const getChatting=async(rid)=>{
    try{
      console.log(rid);
      const res=await api.get('http://localhost:8080/chatroom/loadChatting?roomId='+rid)
      console.log("123");
      var json=JSON.stringify(res.data.result.loadChats);
      console.log(res.data.result.loadChats);
      var jp=JSON.parse(json);
      
      setJp(jp);
    }
    catch(err){
      console.log(err)
    }
  }
  //

  //자동 스크롤
  useEffect(()=>{
    messageEndRef.current.scrollIntoView({behavior: 'smooth'});
    console.log(jp)
  }, [jp]);
    
  //회의 끝내기
    const finBtn=async()=>{
      await getgptsummarize();
      lock(roomId)
      navigate(`/App/${uid}/summary/${params.rid}`)
    }

    //채팅 내용 crawling
    const exitChatting=async()=>{
      try{
        const res= await api.get('/chatroom/exitChatting?roomId='+roomId);
            //console.log(res);
            return res;
      }
      catch(err){
        console.log(err)
      }
    }

    //gpt에 채팅 내용 전달 및 요약 받기
    const getgptsummarize=async()=>{
      const fetchData = async () => {
        try{
          const response=await exitChatting();
          const msg=await response.data
          console.log(msg)
          let data={
            message : msg
          };
          const res=await api.post('/api/chat',data);
          console.log(res.data.result.message)
          await props.note(res.data.result.message)
        }
        catch(err){
          console.log(err)
        }
      }
      fetchData()
    }
  

  //웹소켓 연결 해제
  const disconnectStomp=()=>{
    if(stompClient.current){
      stompClient.current.deactivate();;
    }
  }

  const onChange=(e)=>{
    const inputText=e.target.value;
    setText(inputText);
  }
  
  const activeEnter = (e) => {
    if(e.key === "Enter" && (e.target.value!=='')){
      SendMessage();
      setText('')
    }
  }
  
  //기존 코드 + 새로운 메시지 출력
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res=await api.get('/user/id/'+msg.sender);
        const dt=await res.data;
        
        let newjp=[...jp]
        let data={
          userName: dt,
          chat : msg.message
        }
        newjp.push(data)
    
        setJp(newjp)
      }
      catch(err){
        console.log(err)
      }
    }

    if(msg===null){
      return;
    }
    fetchData()
  },[msg])

  return (
      <div>
          <div>
            <button className='finbtn' onClick={finBtn}>회의 끝내기</button>
            <div className={false ? 'wrapper_fold' :'wrapper_unfold'}>
              <div className={false ? 'chat_fold' : 'chat_unfold'}>
                <div>
                  <ChatList list={jp}/>
                </div>
                <div ref={messageEndRef}></div>
              </div>
            </div>
            <input required onChange={onChange} onKeyDown={(e)=>activeEnter(e)} className={false ? 'chat_bar_fold' :'chat_bar_unfold'} type='text' name='text' placeholder='   메세지 보내기' value={text}></input>      
          </div>
      </div>
    );
  }
  
  function ChatList(props){
    return(
      props.list.map((res, i)=>{
        return(
          <ul className='chatobj'>
            <li key={i}>
              <span className='chatHeader'>
                <div className='chatUser'>{res.userName}</div>
                <div>&nbsp;&nbsp;</div>
              </span>
              <p className='chatBox'>
                {res.chat}
              </p>
            </li> 
          </ul>
        )
      })
    );
  }
  
  export default Chatroom;