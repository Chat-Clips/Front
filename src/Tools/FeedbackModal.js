import { useState } from "react"
import './Modal.css'
import { addPost } from "../apis/feedback"
import { getByname } from "../apis/user"

function FModal(props){
    const uid=window.sessionStorage.getItem('user')
    const {open, close} = props
    const [content, SetContent]=useState("")
    let title="제목"

    const handleclickclosebtn=()=>{
        close()
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(content!==""){
            postData();          
        }
        else{
            alert("공백입니다.")
        }
        
    }

    const postData=async()=>{
        let data={
          title : title,
          text : content,
          userId : uid
        }
        try{
          const res=addPost(data);
          
          res.then(promiseresult => {
              const data = promiseresult;
              console.log(data);
              if(data.status===200){
                alert("소중한 피드백 감사합니다 :)")
                SetContent("")
              }
              else{
                alert(data.data.message)
              }
          });
        }
        catch(err){
          console.log(err)
        }
    }

    return(
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div>Feedback</div>
                        <button className="close" onClick={handleclickclosebtn}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <div>
                            <textarea placeholder='내용을 입력해주세요' value={content} onChange={event => SetContent(event.currentTarget.value)}></textarea>
                            <div></div>
                            <button onClick={handleSubmit}>Send Feedback</button>
                        </div>
                    </main>
                    <footer>
                        <button className="close" onClick={handleclickclosebtn}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null }
        </div>
    );
}

export default FModal