import React from 'react';
import { useState } from 'react';
import './Header.css'
import Modal from './Modal';

function Header({sidebarAction}){
  const [modalOpen, setModalOpen]=useState(false)
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

  return(
    <div>
      <div className='Header'>
        <button className='menu_btn' onClick={clickMenu}>☰</button>
        <div>Chatclips</div>
        <div></div>
      </div>
      <div className={menuOpen ? 'menu_unfold' : 'menu_fold'}>
        <React.Fragment>
          <button className='btn' onClick={openModal}>{menuOpen ? '✉ new chat' : '✉'}</button>
          <Modal open={modalOpen} close={closeModal} header="new chat">
          </Modal>
        </React.Fragment>
        <button className='btn'>{menuOpen ? '✔ feedback' : '✔'}</button>
        <div className='chatholder'></div>
      </div>
    </div>
  );

}

export default Header;