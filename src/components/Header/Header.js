import React, { useEffect, useRef } from 'react';
import { useState, useLocation} from 'react';
import './Header.css'
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../Tools/Modal';
import api from '../../apis/api';
import FModal from '../../Tools/FeedbackModal';

function Header(props){
  const navigate=useNavigate();
  const uid=window.sessionStorage.getItem('user')
  const [modalOpen, setModalOpen]=useState(false)
  const [init,setInit]=useState(false)
  const [menuOpen, setMenuOpen]=useState(true)
  const [chatroomlist, setChatroomlist]=useState([]);
  const [roomIdlist, setRoomIdlist]=useState([])
  const [feedbackOpen, setFeedbackOpen]=useState(false)
  const [main, setGotomain]=useState(false)
  //console.log(uid)

  const openModal=()=>{
    setModalOpen(true)
  }
  const closeModal=()=>{
    setModalOpen(false)
  }
  const openFeedback=()=>{
    setFeedbackOpen(true)
  }
  const closeFeedback=()=>{
    setFeedbackOpen(false)
  }

  const clickMenu=()=>{
    setMenuOpen(!menuOpen)
    props.sidebarAction();
  }

  const Postlogout=async()=>{
    try{
      const res = await api.post('/user/logout');
      return res;
    }
    catch(error){
      console.log(error)
    }  
  }

  const handlelogout=async()=>{
    const res= await Postlogout();
    console.log(res)
    if(res.data === "로그아웃" || res.data===""){
      alert("로그아웃")
      navigate('/');
    }
    else{
      alert(res.data);
    }
  }

  //참여하고 있는 채팅방 표시
  const Getlist=async()=>{
    try{
      //console.log(uid);
      const res= await api.get('/chatroom?userId='+uid);
      let namelist=[]
      let idlist=[]
      for(var i=0; i< res.data.length;++i){
        namelist.push(res.data[i].roomName);
        idlist.push(res.data[i].roomId);
      }
      setChatroomlist(namelist);
      setRoomIdlist(idlist);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    Getlist();
  },[(modalOpen), uid]);

  const initChatholder=()=>{
    Getlist();
    setInit(!init)
  }
  //

  const gotofeedback=()=>{
    navigate(`/App/feedback`);
  }

  const gotomain=()=>{
    setGotomain(true)
    props.getinfo("#main", null)
    navigate(`/App/`)
  }

  const setGotomainFalse=()=>{
    setGotomain(false)
  }

  return(
    <div>
      <div className='Header'>
        <button className='menu_btn'>☰</button>
        <button className='header_btn' onClick={gotomain}>Chatclips</button>
        <div></div>
        <button className='header_btn' onClick={handlelogout}>Logout</button>
      </div>
      <div className={menuOpen ? 'menu_unfold' : 'menu_fold'}>
        <React.Fragment>
          <button className='btn' onClick={openModal}>{menuOpen ? '✉ new chat' : '✉'}</button>
          <Modal open={modalOpen} close={closeModal} enter={initChatholder} header="new chat">
          </Modal>
        </React.Fragment>
        <button className='btn' onClick={openFeedback}>{menuOpen ? '✔ feedback' : '✔'}</button>
        <FModal open={feedbackOpen} close={closeFeedback}></FModal>
        <div className='chatholder'>
          <Chatroomlist gotomain={main} setting={setGotomainFalse} list={chatroomlist} clickevent={props.getinfo} idlist={roomIdlist}/>
        </div>
      </div>
    </div>
  );

}

function Chatroomlist(props){
  const navigate=useNavigate();
  const [title, setTitle]=useState(null)
  const [key, setKey]=useState(null)
  
  useEffect(()=>{
    if(title!==null && props.idlist!==null){
      props.clickevent(title, props.idlist[key])
      navigate(`/App/chat/${props.idlist[key]}`)
    }
    //console.log(title,props.idlist[key])
  },[title,key])

  useEffect(()=>{
    setTitle(null)
    props.setting();
  },[props.gotomain])

  return(
    props.list.map((name,i)=>{
      return(
        <div className='gotochatroom' style={{listStyleType:'none'}} onClick={()=>{setTitle(name);setKey(i)}} key={i}>
          {name}
        </div>
      );
    })
  );
}

export default Header;