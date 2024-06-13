import { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import api from '../apis/api';

function Login(){
    const navigate=useNavigate();
    const [id, setId]=useState('')
    const [pwd, setPwd]=useState('')

    //console.log(uid)
    
    const PostLogin=async()=>{
      let data={
        userId: id,
        password: pwd
      };
      try{
        const res=await api.post(process.env.REACT_APP_API_BASE_URL+"/user/login",data);// 수정
        console.log(data,res);
        return res;
      }
      catch(error){
        console.error(error);
      }
    }

    const handlelogin = async(event) =>{
      event.preventDefault()
      const res= await PostLogin();
      if(res.data === '로그인 성공'){
        alert('로그인 성공!')
        window.sessionStorage.setItem('user', id)
        navigate(`/App/`);
      }else{
        alert(res.data)
        setId('');
        setPwd('');
      }
    }

    const handlesignin = () =>{
        navigate('/Signup');
    }

    return(
      <div className='login'>
        <form className='grid' onSubmit={handlelogin}>
          <div className='login_header'>Chat-Clips</div>
          <div><input type='text' className='login_content' value={id} placeholder='아이디' required onChange={event => setId(event.currentTarget.value)}></input></div>
          <div><input type='password' className='login_content' value={pwd} placeholder='비밀번호' required onChange={event => setPwd(event.currentTarget.value)}></input></div>
          <div><input value='로그인' type='submit' className='login_btn'></input></div>
        </form>
          <div><button className='signin_btn' onClick={handlesignin}>회원가입</button></div>
        </div>
    );
}

export default Login;