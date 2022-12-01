import React from 'react'
import {Grid} from '@mui/material'

import HeroInfoCard from 'components/HeroInfoCard'

// ----- Hooks --------
import { useCurrentHeros } from 'hooks/useCurrentHeros'

const HeroInfoList = () => {
    return(
    <Grid container spacing={2}>
        <Grid item xs={2}/>
        <Grid item xs={3}>
            <HeroInfoCard heroid='1'/>
        </Grid>
        <Grid item xs={3}>
            <HeroInfoCard heroid='2'/>
        </Grid>
        <Grid item xs={3}>
            <HeroInfoCard heroid='3'/>
        </Grid>
        <Grid item xs={2}/>
    </Grid>)
}

export default HeroInfoList