import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./PostView/Post";
import "../Feedback/Feedback.css";

// 게시판 홈페이지
const Feedback = ({ posts, incrementViews }) => {
  const navigate = useNavigate();
  const params=useParams();

  const onClick = () => {
    navigate(`/App/feedback/write`);
  };

  return (
    <div>
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
    </div>
  );
};

export default Feedback;