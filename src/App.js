import { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Chatroom from './main/Chat/Chat'
import Summary from './main/Summary';
import Layout from './components/Layout';
import Readme from './main/Readme';
import FeedbackRouter from './main/Feedback/FeedbackRouter';

function App() {
  const [foldsidebar, setFoldsidebar]=useState(false)
  const [chat, setChat]=useState({title: null,roomId: null})
  const [lock, setLock]=useState([])
  const [note, setNote]=useState('');

  const getGptsum=(e)=>{
      setNote(e)
  }

  const handlechild=(name,id)=>{
    let list={
    title : name,
    roomId : id,
    }
    if(name!==null){setChat(list)}
  }

  const handleLock=(id)=>{
    let newlock=[...lock];
    newlock.push(id)
    setLock(newlock)
  }

  const handlesidebar = () =>{
    setFoldsidebar(!foldsidebar)
  }
 
  return(
    <Layout handlechild={handlechild} handlesidebar={handlesidebar} foldsidebar={foldsidebar} chat={chat}>
      <Routes>
        <Route exact path='/' element={<Readme sidebar={foldsidebar} />}/>
        <Route path='/chat/:rid' element={<Chatroom title={chat.title} roomId={chat.roomId} lock={handleLock} note={getGptsum} />}/>
        <Route path='/summary/:rid' element={<Summary note={note} sidebar={foldsidebar} />}/>
        <Route path='/feedback/*' element={<FeedbackRouter title={handlechild}/>}/>
      </Routes>
    </Layout>
  );
}

export default App;