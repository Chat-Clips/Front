import React from 'react';
import { useState } from 'react';
import './Header.css'
import Modal from './Modal';
import { useNavigate } from 'react-router-dom/dist';
import axios from 'axios';

function Header({sidebarAction}){
  const navigate=useNavigate();
  const [modalOpen, setModalOpen]=useState(false)
  const [init,setInit]=useState(false)
  const [menuOpen, setMenuOpen]=useState(true)
  
  const openModal=()=>{
    setModalOpen(true)
  }
  const closeModal=()=>{
    setModalOpen(false)
  }

  const clickMenu=()=>{
    setMenuOpen(!menuOpen)
    sidebarAction();
  }

  const Postlogout=async()=>{
    try{
      const res = await axios.post('/user/logout');
      return res;
    }
    catch(error){
      console.log(error)
    }  
  }

  const handlelogout=async()=>{
    const res= await Postlogout();
    if(res.data === '로그아웃'){
      alert('로그아웃합니다.')
      navigate('/Login');
    }
    else{
      alert('error');
    }
  }

  const initChatholder=()=>{
    setInit(!init)
  }

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
          <Modal open={modalOpen} close={closeModal} enter={initChatholder} header="new chat">
          </Modal>
        </React.Fragment>
        <button className='btn'>{menuOpen ? '✔ feedback' : '✔'}</button>
        <div className='chatholder'></div>
      </div>
    </div>
  );

}

export default Header;