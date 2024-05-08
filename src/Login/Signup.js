import { useState } from 'react';
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup(){
    const navigate=useNavigate();
    const [id, setId]=useState('')
    const [pwd, setPwd]=useState('')
    const [nickname, setNickname]=useState('')

    const movetobef=()=>{
      navigate('/Login');
    }

    const PostSignup=async()=>{
      let data={
        userId: id,
        username: nickname,
        password: pwd
      };
      try{
        const res=await axios.post("https://2cb4-165-194-17-109.ngrok-free.app/user/signup", data);
        console.log(data,res);
        return res;
      }
      catch(error){
        console.error(error);
      }
    }
    const handlesignup = async(event) =>{
      event.preventDefault();
      const res= await PostSignup();
      if(res.data === "회원가입이 완료되었습니다."){
        alert('회원가입 완료');
        navigate('/Login');
      }else{
        alert(res.data);
        setId('');setNickname('');setPwd('');
      }
      
    }
    
    return(
      <div className='signup'>
        <button className='back_btn' onClick={movetobef}>✘</button>
        <div>Chat-Clips</div>
        <form onSubmit={handlesignup}>
          <div><input type='text' className='login_content' value={nickname} placeholder='닉네임' required onChange={event => setNickname(event.currentTarget.value)}></input></div>
          <div><input type='text' className='login_content' value={id} placeholder='아이디' required onChange={event => setId(event.currentTarget.value)}></input></div>
          <div><input type='password' className='login_content' value={pwd} placeholder='비밀번호' onChange={event => setPwd(event.currentTarget.value)}></input></div>
          <div><input type='submit' className='login_btn' value='회원가입'></input></div>
        </form>
      </div>
    );
}

export default Signup;