import React, { useEffect, useRef } from 'react';
import { useState, useLocation} from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import axios from 'axios';
import { Uid } from './atoms';
import { useRecoilValue } from 'recoil';
import { wait } from '@testing-library/user-event/dist/utils';

function Header(props){
  const navigate=useNavigate();
  const uid=useRecoilValue(Uid)
  const [modalOpen, setModalOpen]=useState(false)
  const [init,setInit]=useState(false)
  const [menuOpen, setMenuOpen]=useState(true)
  const [chatroomlist, setChatroomlist]=useState([]);
  const [roomIdlist, setRoomIdlist]=useState([])
  console.log(uid)

  const openModal=()=>{
    setModalOpen(true)
  }
  const closeModal=()=>{
    setModalOpen(false)
  }

  const clickMenu=()=>{
    setMenuOpen(!menuOpen)
    props.sidebarAction();
  }

  const Postlogout=async()=>{
    try{
      const res = await axios.post('api/user/logout');
      return res;
    }
    catch(error){
      console.log(error)
    }  
  }

  const handlelogout=async()=>{
    const res= await Postlogout();
    if(res.data === '로그아웃'){
      alert('로그아웃')
      navigate('/Login');
    }
    else{
      alert('error');
    }
  }

  //참여하고 있는 채팅방 표시
  const Getlist=async()=>{
    try{
      console.log(uid)
      const res= await axios.get('api/chatroom?userId='+uid);
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
  },[init]);

  const initChatholder=()=>{
    wait(3000)
    Getlist();
    setInit(!init)
  }
  //

  return(
    <div>
      <div className='Header'>
        <button className='menu_btn' onClick={clickMenu}>☰</button>
        <div>Chatclips</div>
        <div></div>
        <button className='logout' onClick={handlelogout}>Logout</button>
      </div>
      <div className={menuOpen ? 'menu_unfold' : 'menu_fold'}>
        <React.Fragment>
          <button className='btn' onClick={openModal}>{menuOpen ? '✉ new chat' : '✉'}</button>
          <Modal uid={uid} open={modalOpen} close={closeModal} enter={initChatholder} header="new chat">
          </Modal>
        </React.Fragment>
        <button className='btn'>{menuOpen ? '✔ feedback' : '✔'}</button>
        <div className='chatholder'>
          <Chatroomlist open={modalOpen} list={chatroomlist} clickevent={props.getinfo} idlist={roomIdlist}/>
        </div>
      </div>
    </div>
  );

}

function Chatroomlist(props){
  const [title, setTitle]=useState(null)
  const [key, setKey]=useState(null)
  
  useEffect(()=>{
    if(title!==null && props.idlist!==null){
      props.clickevent(title, props.idlist[key])
    }
    //console.log(title,props.idlist[key])
    },[title,key])

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