import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { signOut } from 'reducers/auth'

const SignOut = () => {
    const dispatch = useDispatch()
    dispatch(signOut())
    return (<Navigate to='/' />)
}

export default SignOut
