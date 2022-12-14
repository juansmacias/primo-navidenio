import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
// import '@nosferatu500/react-sortable-tree/style.css'

// --------- Components ----------
import OnlyInAuth from 'components/App/OnlyInAuth'
import RequireAuth from 'components/App/RequireAuth'
import SignOut from 'components/SignOut'

// --------- Pages ----------
import Home from 'pages/Home'
import Login from 'pages/Login'
import Heros from 'pages/Heros'
import Layout from 'pages/Layout'
import Profile from 'pages/Profile'
import NotFound from 'pages/NotFound'
import Authenticate from 'pages/Authenticate'
// ------ Reducers -------

// ------ Utils ------

import { goToLogin } from 'api/auth'
import { postAnswersAPI,putAnswersAPI } from 'api/answers'
import { getAvailableHeros } from 'api/heros'
import { assignHeroToUser, getUser } from 'api/users'


function login(data){
  return goToLogin(data)
}

function postAnswers(data){
  return postAnswersAPI(data)
}

function putAnswers(data){
  return putAnswersAPI(data)
}


const App = () =>  {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path='heros' element={<Heros />} />
          <Route element={<OnlyInAuth/>}>
            <Route path='login' element={<Login externalEndpoint={login}/>} />
            <Route path='authenticate/:email' element={ <Authenticate /> } />
          </Route>
          <Route element={<RequireAuth/>}>
            <Route path='signout' element={<SignOut />} />
            <Route path='profile' element={<Profile externalEndpoints={ {postAnswers,putAnswers} }/>} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
