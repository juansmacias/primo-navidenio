import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { FormProvider,useForm } from 'react-hook-form'
import { Grid, Button, Paper, Box, Typography } from '@mui/material'

// -----Components ------
import AnswerForm from 'components/Forms/AnswerForm'
import AssignHeroComponent from 'components/AssignHeroComponent'
import HeroInfoCompement from 'components/HeroInfoCompement'

// -----Hook--------
import { useCurrentUserHasAnswers,useCurrentUserHasAssignedHero } from 'hooks/useCurrentUserProp'

const ProfileInfoComponent = ({externalEndpoints}) => {
    const hasAnswers = useCurrentUserHasAnswers()
    const hasAssignedHero = useCurrentUserHasAssignedHero()
    console.log("🚀 ~ file: ProfileInfoComponent.jsx ~ line 18 ~ ProfileInfoComponent ~ hasAssignedHero", hasAssignedHero)
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h3' align='center' sx={{mt:2}}> Perfil </Typography>
            </Grid>
            {hasAnswers&&!hasAssignedHero?
            <Grid item container direction="column" align={"center"} spacing={1} xs={6}>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <AssignHeroComponent/>
                </Grid>
            </Grid>:''
            }
            {hasAssignedHero?
                <Grid item xs={12}>
                    <HeroInfoCompement />
                </Grid>:''
            }
            <Grid item xs={12}>
                <Typography variant='subtitle1' align='center'>Completa tu perfil. Ingresa sus preguntas para darle pistas a tu amigo secreto!</Typography>
                <AnswerForm externalEndpoints={externalEndpoints}/>
            </Grid>
        </Grid>
    )
}

export default ProfileInfoComponent