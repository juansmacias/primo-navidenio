import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'

const OnlyInAuth = () => {
  const auth = useAuth()
  
  return auth.user==null ? 
  ( <Outlet /> ) :
  ( <Navigate to='/' /> )
}

export default OnlyInAuth
