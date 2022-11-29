import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'

// ------Components -----
import ProfileInfoComponent from 'src/components/ProfileInfoComponent'

// ------ selector ---------
import { selectCurrentAuthUserId } from 'reducers/auth'

// ------ Reducer -----
import { fetchUserById } from 'reducers/user'
import { getTips } from 'reducers/tips'


export default function Profile ({externalEndpoints}){
    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentAuthUserId)

    useEffect(()=>{
        dispatch(fetchUserById(userId))
        dispatch(getTips())
    })

    return (
        <React.Fragment>
            <ProfileInfoComponent />
        </React.Fragment> 
    )
} 