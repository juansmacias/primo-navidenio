import React from 'react'
import { useNavigate } from 'react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { Grid, Button, Paper, Box, Typography } from '@mui/material'

// ---- Components -----
import Email from 'components/Fields/Email'

const LoginComponent = ({externalEndpoint}) => {
  const navigte = useNavigate()

  const formMethods = useForm()
  const { handleSubmit } = formMethods

  const handleLogInSuccess = (email) => {
    navigte(`/authenticate/${email}`,{replace:true})
  }

  const onSubmit = async data => {
    try {
      await externalEndpoint(data).then((response)=>{
        handleLogInSuccess(data.email) 
      })
    } catch(e) {
      console.log("🚀 ~ file: LoginComponent.jsx ~ line 56 ~ Catch onSubmit ~ e", e)
    }
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} elevation={6} component={Paper} square>
        <Box>
          <Typography align='center' variant='h4' component='h1'>Inicia Sesión </Typography>
          <FormProvider { ...formMethods }>
            <form onSubmit={handleSubmit(onSubmit)} id='loginForm'>
              <Grid item xs={12} sx={{m:5}}>
                <Email fullWidth margin='normal'/>
                <Button type='submit' fullWidth color='primary' variant='contained'>Ingresar</Button>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginComponent
