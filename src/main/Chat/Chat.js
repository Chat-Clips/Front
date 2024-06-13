import './Chat.css'
import { useState ,useRef, useEffect } from 'react';
import '../../App.css';
import * as dayjs from 'dayjs';
import { Stomp } from '@stomp/stompjs';
import api from '../../apis/api';
import { useNavigate, useParams } from 'react-router-dom';

function Chatroom(props){
  //const {roomId}=useParams();
  const stompClient=useRef(null);
  const messageEndRef = useRef();
  const uid=window.sessionStorage.getItem('user')
  const params=useParams();
  const [roomId, setRoomId]=useState(props.roomId)
  const lock=props.lock;
  const navigate=useNavigate();

    const [text, setText]=useState('');
    const [jp, setJp]=useState([]);
    //const [note, setNote]=useState(null);
    const [msg, setMsg]=useState('')
    
    //웹소켓 연결
    const connectStomp=()=>{
      try{
        const socket=new WebSocket("ws://52.79.42.86:8080/ws");
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
    if(stompClient.current && text){
      stompClient.current.publish({
        destination: "/pub/sendMessage",
        body: JSON.stringify({
            type: "TALK",
            roomId: roomId,
            sender: uid,
            message: text
        }),
      });
    }
  };

  const isTerminate=async(rid)=>{
    try{
      const res=await api.get(process.env.REACT_APP_API_BASE_URL+'/chatroom/is_terminate?roomId='+rid)
      return res.data;
    }
    catch(err){
      console.log(err)
    }
  }

  //
  useEffect(()=>{
    const fetch = async () => {
      setRoomId(props.roomId)
      const res = await isTerminate(props.roomId);
      if(res){
        navigate(`/App/summary/${params.rid}`);
      }
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

      const res=await api.get(process.env.REACT_APP_API_BASE_URL+'/chatroom/loadChatting?roomId='+rid)
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
    }

    //채팅 내용 crawling
    const exitChatting=async()=>{
      try{
        const res= await api.get(process.env.REACT_APP_API_BASE_URL+'/chatroom/exitChatting?roomId='+roomId);
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
          const res=await api.post(process.env.REACT_APP_API_BASE_URL+'/api/chat',data);
          console.log(res.data.result.message)
          let summaryData={
            roomId: roomId,
            summary: res.data.result.message
          };
    
          await api.post(process.env.REACT_APP_API_BASE_URL+'/summarize/save', summaryData)
          .then(navigate(`/App/summary/${params.rid}`));
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
        const res=await api.get(process.env.REACT_APP_API_BASE_URL+'/user/'+msg.sender);
        const dt=await res.data;
        
        let newjp=[...jp]
        
        let data={
          userName: dt.result.username,
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