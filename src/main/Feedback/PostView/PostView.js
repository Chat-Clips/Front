import { useNavigate, useParams } from "react-router-dom";
import styles from "../Write/Write.module.css";
import { getallPost } from "../../../apis/feedback";

// post 뷰페이지
const PostView = (props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/App/feedback");
  };

  const { postId } = useParams();

  return (
    <div>
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
            value={props.title}
            readOnly
          ></textarea>

          <textarea
            className={styles.content}
            value={props.content}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PostView;