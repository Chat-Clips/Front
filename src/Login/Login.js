import { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate=useNavigate();
    const [id, setId]=useState('')
    const [pwd, setPwd]=useState('')

    const handlelogin = event =>{
        navigate('/App');
    }

    const handlesignin = event =>{
        navigate('/Signup');
    }

    return(
      <div className='login'>
        <div className='login_header'>Chat-Clips</div>
        <div><input type='text' className='login_content' value={id} placeholder='아이디' required onChange={event => setId(event.currentTarget.value)}></input></div>
        <div><input type='password' className='login_content' value={pwd} placeholder='비밀번호' required onChange={event => setPwd(event.currentTarget.value)}></input></div>
        <div><button className='login_btn' onClick={handlelogin}>로그인</button></div>
        <div><button className='signin_btn' onClick={handlesignin}>회원가입</button></div>
      </div>
    );
}

export default Login;