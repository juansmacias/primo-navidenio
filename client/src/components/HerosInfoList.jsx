import React from 'react'
import {Grid} from '@mui/material'

import HeroInfoCard from 'components/HeroInfoCard'

// ----- Hooks --------
import { useCurrentHeros } from 'hooks/useCurrentHeros'

const HeroInfoList = () => {
    const heros = useCurrentHeros()

    return(
    <Grid container spacing={2} m={10}>
        {heros?.map((hero)=>(
            <Grid item xs={3}>
                <HeroInfoCard heroid={hero.id}/>
            </Grid>
        ))}
        <Grid item xs={2}/>
    </Grid>)
}

export default HeroInfoList