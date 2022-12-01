import React from 'react'
import { Grid,Typography } from '@mui/material'

import HeroInfoList from 'components/HerosInfoList'

export default function Heros () {
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