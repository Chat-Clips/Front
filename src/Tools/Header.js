import React from "react";
import { useState } from "react";
import "./Header.css";
import Modal from "./Modal";

/* 김영웅 코드 시작 */
import { useNavigate } from "react-router-dom";
/* 김영웅 코드 끝 */

function Header({ sidebarAction }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const clickMenu = () => {
    setMenuOpen(!menuOpen);
    sidebarAction();
  };

  /* 김영웅 코드 시작 */
  const navigate = useNavigate();

  const moveFeedback = () => {
    navigate("/feedback");
  };
  /* 김영웅 코드 끝 */

  return (
    <div>
      <div className="Header">
        <button className="menu_btn" onClick={clickMenu}>
          ☰
        </button>
        <div>Chatclips</div>
        <div></div>
      </div>
      <div className={menuOpen ? "menu_unfold" : "menu_fold"}>
        <React.Fragment>
          <button className="btn" onClick={openModal}>
            {menuOpen ? "✉ new chat" : "✉"}
          </button>
          <Modal open={modalOpen} close={closeModal} header="new chat"></Modal>
        </React.Fragment>
        {/* 김영웅: 아래 버튼에 Feedback으로 이동하는 onClick 추가 */}
        <button className="btn" onClick={moveFeedback}>
          {menuOpen ? "✔ feedback" : "✔"}
        </button>
        <div className="chatholder"></div>
      </div>
    </div>
  );
}

export default Header;
