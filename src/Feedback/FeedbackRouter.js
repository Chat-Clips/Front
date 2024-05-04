import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Feedback from "../Feedback/Feedback";
import Write from "../Write/Write";
import PostView from "../PostView/PostView";

function FeedbackRouter() {
  const [posts, setPosts] = useState([]);

  // 콜백함수 1: FeedbackRouter -> Write 순으로 전달
  const addPost = (title, content) => {
    const current = new Date();

    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");

    const hour = String(current.getHours()).padStart(2, "0");
    const minute = String(current.getMinutes()).padStart(2, "0");
    const second = String(current.getSeconds()).padStart(2, "0");

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      date: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      views: 0,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]); // 새로운 post 배열
  };

  // 콜백함수 2: FeedbackRouter -> Feedback -> Post 순으로 전달
  const incrementViews = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, views: post.views + 1 } : post
      )
    );
  };

  return (
    <Routes>
      <Route
        path="/feedback"
        element={<Feedback posts={posts} incrementViews={incrementViews} />}
      />
      <Route path="/write" element={<Write addPost={addPost} />} />
      <Route path="/post/:postId" element={<PostView posts={posts} />} />
    </Routes>
  );
}

export default FeedbackRouter;
