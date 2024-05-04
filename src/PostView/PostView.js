import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Tools/Header";
import Topbar from "../Tools/Top-bar";

import styles from "../Write/Write.module.css";

// post 뷰페이지
const PostView = ({ posts }) => {
  /* 효인님 거 복붙 시작 */
  const [foldsidebar, setFoldsidebar] = useState(false);

  const handlesidebar = () => {
    setFoldsidebar(!foldsidebar);
  };
  /* 효인님 거 복붙 끝 */

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/Feedback");
  };

  const { postId } = useParams();

  // post id와 PostView 주소의 마지막 숫자를 매핑하여, 해당 post를 PostView 컴포넌트로 전달
  const post = posts.find((p) => p.id === parseInt(postId, 10));

  // post가 없는 경우
  if (!post) {
    return <div>저장된 게시물이 없습니다!</div>;
  }

  return (
    <div>
      {/* 효인님 거 복붙 시작 */}
      <Topbar title="# Post Detail" sidebar={foldsidebar}></Topbar>
      {/* 효인님 거 복붙 끝 */}

      <div className="Feedback-wrapper_unfold">
        <div className="Feedback-chat_unfold">
          <div className={styles.title_container}>
            <span>제목</span>
            <button className={styles.write_btn} onClick={onClick}>
              뒤로가기
            </button>
          </div>

          <textarea
            className={styles.title}
            value={post.title}
            readOnly
          ></textarea>

          <textarea
            className={styles.content}
            value={post.content}
            readOnly
          ></textarea>
        </div>
      </div>

      {/* 효인님 거 복붙 시작 */}
      <Header sidebarAction={handlesidebar}></Header>
      {/* 효인님 거 복붙 끝 */}
    </div>
  );
};

export default PostView;
