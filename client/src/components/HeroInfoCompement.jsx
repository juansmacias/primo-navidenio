import React from 'react'
import {useCurrentUserProp } from 'hooks/useCurrentUserProp'

import { Grid,Typography } from '@mui/material'

const HeroInfoCompement = () =>{
    const hero = useCurrentUserProp('hero')

    return (<Grid item xs={12}>
        <Typography variant='h3' align='center'>
            Tu Heroe: {hero?.name}
        </Typography>
    </Grid>)
}

export default HeroInfoCompement