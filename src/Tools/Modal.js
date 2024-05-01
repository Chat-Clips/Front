import { useState } from 'react';
import './Modal.css'

function Modal(props){
    const {open, close, header }=props
    const [roomId, setRoomId]=useState("")
    return(
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div>{header}</div>
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <form>
                        <main className='grid'>
                            <input type='text' placeholder='채팅 이름 설정' value={roomId} required onChange={event => setRoomId(event.currentTarget.value)}></input>
                            <div></div>
                            <input type='text' placeholder='친구 초대 검색칸'></input>
                            <div></div>
                        </main>
                        <footer>
                            <button type='submit' className='generate'> 생성 </button>
                            <button className="close" onClick={close}>
                                close
                            </button>
                        </footer>
                    </form>
                </section>
            ) : null }
        </div>
    );
}

export default Modal;