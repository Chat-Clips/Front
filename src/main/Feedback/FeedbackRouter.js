import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Feedback from "../Feedback/Feedback";
import Write from "./Write/Write";
import PostView from "./PostView/PostView";

function FeedbackRouter(props) {

  useEffect(()=>{
    props.title("#Feedback",null)
  },[])

  return (
    <Routes>
      <Route
        exact path="/"
        element={<Feedback />}
      />
      <Route path="/write" element={<Write/>} />
      <Route path="/post/:postId" element={<PostView/>} />
    </Routes>
  );
}

export default FeedbackRouter;