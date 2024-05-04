import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../PostView/Post";

import Header from "../Tools/Header";
import Topbar from "../Tools/Top-bar";

import "../Feedback/Feedback.css";

// 게시판 홈페이지
const Feedback = ({ posts, incrementViews }) => {
  /* 효인님 거 복붙 시작 */
  const [foldsidebar, setFoldsidebar] = useState(false);

  const handlesidebar = () => {
    setFoldsidebar(!foldsidebar);
  };
  /* 효인님 거 복붙 끝 */

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/write");
  };

  return (
    <div>
      {/* 효인님 거 복붙 시작 */}
      <Topbar title="# notice board" sidebar={foldsidebar}></Topbar>
      {/* 효인님 거 복붙 끝 */}

      <div>
        <button className="Feedback-finbtn" onClick={onClick}>
          글 쓰기
        </button>
        <div className="Feedback-wrapper_unfold">
          <div className="Feedback-chat_unfold">
            {posts.map((post) => (
              <Post key={post.id} {...post} incrementViews={incrementViews} /> // Render a Post for each entry in the state array
            ))}
          </div>
        </div>
      </div>

      {/* 효인님 거 복붙 시작 */}
      <Header sidebarAction={handlesidebar}></Header>
      {/* 효인님 거 복붙 끝 */}
    </div>
  );
};

export default Feedback;
