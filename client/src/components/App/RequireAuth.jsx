import React from 'react'
import { Navigate, useLocation,Outlet } from 'react-router-dom'

import { useAuth } from 'hooks/useAuth'


const RequireAuth = () => {
  const auth = useAuth()
  const { pathname } = useLocation()

  return auth.user ? 
    (<Outlet/>):
    (<Navigate to="/login" state={{ from: pathname }} replace/>)

}

export default RequireAuth
