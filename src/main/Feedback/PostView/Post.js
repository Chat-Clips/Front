import { Link, useNavigate } from "react-router-dom";
import "../PostView/Post.css";

const Post = ({ id, title, createdAt}) => {
    const navigate=useNavigate();
    const onClick = () => {
      //navigate(`/App/feedback/post/${id}`)
      //incrementViews(id); // 어떤 post의 views를 증가시킬지 식별하기 위해 id값을 전달
    };
  
    return (
      <div className="post">
        <span>{id}</span>
        <div onClick={onClick}>
          {title}
        </div>
        <span>{createdAt}</span>
      </div>
    );
  };
  
  export default Post;