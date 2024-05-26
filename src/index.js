import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter, Route, Router, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Login/Signup';
import { RecoilRoot } from 'recoil';
/*
const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
    <RecoilRoot>  
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/App' element={<App />} />
          <Route path='/Signup' element={<Signup/>}/>
        </Routes>
      </HashRouter>
    </RecoilRoot> 
);*/

const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <RecoilRoot>  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/App/*' element={<App/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  </RecoilRoot> 
);
/*
ReactDOM.render(
  <Router>
    <switch>
      <Route path='/' Component={Login}/>
      <Route path='/App' Component={App}/>
      <Route path='/Signup' Component={Signup}/>
    </switch>
  </Router>,
  document.getElementById('root')
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
