import React from 'react'
import { Grid } from '@mui/material'

import LoginComponent from 'components/LoginComponent'

export default function Login ({externalEndpoint}){
    return (
        <Grid container>
            <Grid item xs={12}>
                <LoginComponent externalEndpoint={externalEndpoint}/>
            </Grid>
        </Grid>
    )
} 