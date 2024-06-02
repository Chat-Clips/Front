import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./PostView/Post";
import "../Feedback/Feedback.css";
import { getallPost } from "../../apis/feedback";

// 게시판 홈페이지
const Feedback = () => {
  const [list, setList]=useState([])
  const navigate = useNavigate();
  const params=useParams();
  const getData=async()=>{
    try{
      const res=getallPost();
      
      res.then(promiseresult => {
          const data = promiseresult;
          console.log(data);
          if(data.status===200){
            console.log(data.data.result.feedbackList)
            setList(data.data.result.feedbackList)
          }
          else{
            alert()
          }
          //SetData(data)
      });
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getData();
  },[])

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
            {list.map((post) => (
              <Post key={post.id} {...post} /> // Render a Post for each entry in the state array
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;