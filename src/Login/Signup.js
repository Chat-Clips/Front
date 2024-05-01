import { useState } from 'react';
import './Signup.css'
import { useNavigate } from 'react-router-dom';

function Signup(){
    const navigate=useNavigate();
    const [id, setId]=useState('')
    const [pwd, setPwd]=useState('')
    const [compwd, setCompwd]=useState('')
    const [nickname, setNickname]=useState('')

    const handlesignup = event =>{
        navigate('/Login');
    }
//닉네임 아이디 비밀번호 비밀번호 확인
    return(
      <div className='signup'>
        <button className='back_btn' onClick={handlesignup}>✘</button>
        <div>Chat-Clips</div>
        <form>
          <div><input type='text' className='login_content' value={nickname} placeholder='닉네임' required onChange={event => setNickname(event.currentTarget.value)}></input></div>
          <div><input type='text' className='login_content' value={id} placeholder='아이디' required onChange={event => setId(event.currentTarget.value)}></input></div>
          <div><input type='password' className='login_content' value={pwd} placeholder='비밀번호' onChange={event => setPwd(event.currentTarget.value)}></input></div>
          <div><input type='password' className='login_content' value={compwd} placeholder='비밀번호 확인' onChange={event => setCompwd(event.currentTarget.value)}></input></div>
          <div><button type='submit' className='login_btn' onClick={handlesignup}>회원가입</button></div>
        </form>
      </div>
    );
}

export default Signup;