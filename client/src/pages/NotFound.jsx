import React from 'react'
import { Grid,Typography } from '@mui/material'

import MainAppBar from 'components/MainAppBar'


const NotFound = () => (
  <>
    <MainAppBar/>
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h2' align='center'> No se encontro la pagina</Typography>
      </Grid>
    </Grid>
  </>
)

export default NotFound;
