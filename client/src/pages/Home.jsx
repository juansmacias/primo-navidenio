import React, { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'

export default function Home (){
    
    return (
        <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12} textAlign='center' sx={{mt:3}}>
                <Typography variant='h2'>
                    Hola Primos estamos en Construcción
                </Typography>
            </Grid>
        </Grid>
    )
} 