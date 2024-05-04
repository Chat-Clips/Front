import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Tools/Header";
import Topbar from "../Tools/Top-bar";

import styles from "../Write/Write.module.css";

// post 작성페이지
const Write = ({ addPost }) => {
  /* 효인님 거 복붙 시작 */
  const [foldsidebar, setFoldsidebar] = useState(false);

  const handlesidebar = () => {
    setFoldsidebar(!foldsidebar);
  };
  /* 효인님 거 복붙 끝 */

  const [title, setTitle] = useState(""); // 제목을 위한 상태
  const [content, setContent] = useState(""); // 내용을 위한 상태

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
    if (title === "") {
      alert("제목을 입력하세요.");
      return;
    }

    if (content === "") {
      alert("내용을 입력하세요.");
      return;
    }

    addPost(title, content); // 콜백함수 호출
    navigate("/Feedback"); // Feedback으로 이동
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value); // 제목 입력 시 상태 업데이트
  };

  const onChangeContent = (event) => {
    setContent(event.target.value); // 내용 입력 시 상태 업데이트
  };

  const onClick = () => {
    navigate("/Feedback");
  };

  return (
    <div>
      {/* 효인님 거 복붙 시작 */}
      <Topbar title="# 글쓰기" sidebar={foldsidebar}></Topbar>
      {/* 효인님 거 복붙 끝 */}

      <div className="Feedback-wrapper_unfold">
        <form className="Feedback-chat_unfold" onSubmit={onSubmit}>
          <div className={styles.title_container}>
            <span>제목</span>
            <div>
              <input className={styles.write_btn} type="submit" value="게시" />
              <button className={styles.write_btn} onClick={onClick}>
                취소
              </button>
            </div>
          </div>

          <section>
            <textarea
              onChange={onChangeTitle}
              value={title}
              className={styles.title}
            ></textarea>
          </section>

          <section>
            <textarea
              // className={styles.no_resize}
              onChange={onChangeContent}
              value={content}
              className={styles.content}
            ></textarea>
          </section>
        </form>
      </div>

      {/* 효인님 거 복붙 시작 */}
      <Header sidebarAction={handlesidebar}></Header>
      {/* 효인님 거 복붙 끝 */}
    </div>
  );
};

export default Write;
