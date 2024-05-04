import { Link } from "react-router-dom";
import "../PostView/Post.css";

// post 파트
const Post = ({ id, title, date, views, incrementViews }) => {
  const onClick = () => {
    incrementViews(id); // 어떤 post의 views를 증가시킬지 식벼랗기 위해 id값을 전달
  };

  return (
    <div className="post">
      <span>{id}</span>
      <Link onClick={onClick} to={`/post/${id}`}>
        {title}
      </Link>
      <span>{date}</span>
      <span>{views}</span>
    </div>
  );
};

export default Post;
