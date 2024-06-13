import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Write.module.css"
import { Uid } from "../../../Tools/atoms";
import { useRecoilValue } from "recoil";
import { addPost } from "../../../apis/feedback";
import { getByname } from "../../../apis/user";

const Write = () => {
    const navigate = useNavigate();
    const uid=window.sessionStorage.getItem('user')
    const [title, setTitle] = useState(""); // 제목을 위한 상태
    const [content, setContent] = useState(""); // 내용을 위한 상태
    const params=useParams();

    const postData=async()=>{
      const id=getByname(uid)
      id.then(promiseresult => {
        const id = promiseresult.data.result.user;
        console.log(id.id);

        
      let data={
        title : title,
        text : content,
        id : id.id
      }
      try{
        const res=addPost(data);
        
        res.then(promiseresult => {
            const data = promiseresult;
            console.log(data);
            if(data.status===200){
              alert("포스팅 되었습니다.")
              navigate(`/App/feedback`);
            }
            else{
              alert(data.data.message)
            }
        });
      }
      catch(err){
        console.log(err)
      }
    })

    }
  
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
  
      postData();
    };
  
    const onChangeTitle = (event) => {
      setTitle(event.target.value); // 제목 입력 시 상태 업데이트
    };
  
    const onChangeContent = (event) => {
      setContent(event.target.value); // 내용 입력 시 상태 업데이트
    };
  
    const onClick = () => {
      navigate(`/App/feedback`);
    };
  
    return (
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
      );
  };
  
  export default Write;