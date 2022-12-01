import React from 'react'
import {Grid} from '@mui/material'

import HeroInfoCard from 'components/HeroInfoCard'

// ----- Hooks --------
import { useCurrentHeros } from 'hooks/useCurrentHeros'

const HeroInfoList = () => {
    const heros = useCurrentHeros()

    return(
    <Grid container spacing={2} p={1}>
        {heros?.map((hero)=>(
            <Grid item xs={6}  md={3}>
                <HeroInfoCard heroid={hero.id}/>
            </Grid>
        ))}
    </Grid>)
}

export default HeroInfoList