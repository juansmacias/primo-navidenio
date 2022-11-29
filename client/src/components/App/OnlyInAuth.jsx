import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useIsAuth } from 'hooks/useAuth'

const OnlyInAuth = () => {
  const isAuth = useIsAuth()
  
  return !isAuth ? 
  ( <Outlet /> ) :
  ( <Navigate to='/' /> )
}

export default OnlyInAuth
