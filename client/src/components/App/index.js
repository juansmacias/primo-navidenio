import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
// import '@nosferatu500/react-sortable-tree/style.css'

// --------- Components ----------
import OnlyInAuth from 'components/App/OnlyInAuth'
import RequireAuth from 'components/App/RequireAuth'

// --------- Pages ----------
import Home from 'pages/Home'
import Login from 'pages/Login'
import Layout from 'pages/Layout'
import NotFound from 'pages/NotFound'
import Authenticate from 'pages/Authenticate'
// ------ Reducers -------

// ------ Utils ------

import { goToLogin } from 'api/auth'


function login(data){
  return goToLogin(data)
}

const App = () =>  {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route element={<OnlyInAuth/>}>
            <Route path='login' element={<Login externalEndpoint={login}/>} />
            <Route path='authenticate/:email' element={ <Authenticate /> } />
          </Route>
          <Route element={<RequireAuth/>}>
            <Route path='profile' element={<p>hola</p>} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
