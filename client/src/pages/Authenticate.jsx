import React from 'react'
import { Grid } from '@mui/material'

import AuthenticateComponent from 'components/AuthenticateComponent'

export default function Authenticate (){
    return (
        <Grid container>
            <Grid item xs={12}>
                <AuthenticateComponent />
            </Grid>
        </Grid>
    )
} 

