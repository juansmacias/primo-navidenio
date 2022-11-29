import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { FormProvider,useForm } from 'react-hook-form'
import { Grid, Button, Paper, Box, Typography } from '@mui/material'

// -----Components ------
import AnswerForm from 'components/Forms/AnswerForm'
// -----Hook--------
import { useCurrentUserProp } from 'hooks/useCurrentUserProp'

const ProfileInfoComponent = () => {
    
    return (
        <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12}>
                <Typography variant='h3' align='center' sx={{mt:2}}> Perfil </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1' align='center'>Completa tu perfil. Ingresa sus preguntas para darle pistas a tu amigo secreto!</Typography>
                <AnswerForm/>
            </Grid>
        </Grid>
    )
}

export default ProfileInfoComponent