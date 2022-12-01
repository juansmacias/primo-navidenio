import React,{useEffect} from 'react'
import { Grid,Typography } from '@mui/material'

import { useDispatch } from 'react-redux'

import HeroInfoList from 'components/HerosInfoList'

// ----- Actions --------
import { getHeros } from 'reducers/heros'

export default function Heros () {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getHeros())
    },[])
return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant='h3' align='center' p={2}>
                Heroes
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <HeroInfoList />
        </Grid>
    </Grid>
)
} 