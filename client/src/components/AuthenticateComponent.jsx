import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { FormProvider,useForm } from 'react-hook-form'
import { Grid, Button, Paper, Box, Typography } from '@mui/material'

// ----- Hooks ----

// ----- Redux Toolkit Mutation ----
import { useAuthenticateMutation } from 'api/auth'

// ----- Reducers ------
import { setCredentials } from 'reducers/auth'

// ----- Fields ----
import Token from 'components/Fields/Token'
import Email from 'components/Fields/Email'

const AuthenticateComponent = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email } = useParams()
    const [ authenticate, { isLoading }] = useAuthenticateMutation()

    const formMethods = useForm()
    const { handleSubmit } = formMethods

    async function handleAuthenticate(data){
        try {
            await authenticate(data).unwrap()
            navigate('/',{replace:true})
        } catch (e) {
            console.log("🚀 ~ file: AuthenticateComponent.jsx ~ line 42 ~ handleAuthenticate ~ e", e)
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} component={Paper} square sx={{m:5}}>
                <Box>
                    <Typography align='center' variant='h4' component='h1'>Buenos días!</Typography>
                    <FormProvider { ...formMethods }>
                        <form onSubmit={handleSubmit(handleAuthenticate)}>
                            <Email fullWidth margin='normal' value={email} disable='true' />
                            <Token autoFocus fullWidth margin='normal' />
                            <Button type='submit' fullWidth color='primary' variant='contained'>Continuar</Button>
                        </form>
                    </FormProvider>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AuthenticateComponent