import React from 'react'
import { Navigate, useLocation,Outlet } from 'react-router-dom'

import { useIsAuth } from 'hooks/useAuth'


const RequireAuth = () => {
  const isAuth = useIsAuth()
  const { pathname } = useLocation()

  return isAuth ? 
    (<Outlet/>):
    (<Navigate to="/login" state={{ from: pathname }} replace/>)

}

export default RequireAuth
