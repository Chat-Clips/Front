import { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { Uid } from '../Tools/atoms';

function Login(){
    const navigate=useNavigate();
    const [id, setId]=useState('')
    const [pwd, setPwd]=useState('')
    const [uid, setUid]=useRecoilState(Uid);

    console.log(uid)
    
    const PostLogin=async()=>{
      let data={
        userId: id,
        password: pwd
      };
      try{
        const res=await axios.post("http://13.125.121.147:8080/user/login",data);
        console.log(data,res);
        return res;
      }
      catch(error){
        console.error(error);
      }
    }

    const Getrecoil=()=>{
      setUid(id);
    }

    const handlelogin = async(event) =>{
      const res= await PostLogin();
      if(res.data === '로그인 성공'){
        alert('로그인 성공!')
        Getrecoil();
        navigate('/App');
      }else{
        alert('실패')
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