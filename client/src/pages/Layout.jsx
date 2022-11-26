import React from 'react'
import { Outlet } from "react-router-dom"

import MainAppBar from 'components/MainAppBar'

const Layout = () => {
    return (
        <>
            <MainAppBar/>
            <Outlet />
        </>
    )
}

export default Layout