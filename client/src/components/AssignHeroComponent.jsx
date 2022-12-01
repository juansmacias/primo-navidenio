import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Grid,Typography,Button } from '@mui/material'
import WheelComponent from "react-wheel-of-prizes"

//------- API --------
import * as herosAPI from 'api/heros'
// -------- Actions -----------
import { assignUserHero } from 'reducers/auth'

// -------- Hooks -----------
import { useCurrentUserProp } from 'hooks/useCurrentUserProp'

const AssignHeroComponent = () =>{
    const dispatch = useDispatch()

    const userId = useCurrentUserProp('id')

    function assignarHero(){
        dispatch(assignUserHero(userId))
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} direction='column' align={"center"}>
                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>Asignar Heroe</Typography>
                    <br/>
                    <Button color='primary' size='large' variant='contained' onClick={assignarHero}>Preparar Sorteo</Button>
                </Grid>
            </Grid>
        </React.Fragment>
      );
}

export default AssignHeroComponent