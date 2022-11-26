import React from 'react'
import { Outlet } from "react-router-dom"

import MainAppBar from 'components/MainAppBar'
import AppFooter from 'src/components/AppFooter'

const Layout = () => {
    return (
        <>
            <MainAppBar/>
            <Outlet />
            <AppFooter/>
        </>
    )
}

export default Layout