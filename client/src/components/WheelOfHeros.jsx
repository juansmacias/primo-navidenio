import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Grid,Typography,Button } from '@mui/material'
import WheelComponent from "react-wheel-of-prizes"

//------- API --------
import * as herosAPI from 'api/heros'
import * as userAPI from 'api/users'
// -------- Actions -----------
import { assignUserHero } from 'reducers/auth'

// -------- Hooks -----------
import { useCurrentUserProp } from 'hooks/useCurrentUserProp'

const WheelOfHeros = () =>{
    const dispatch = useDispatch()
    const [herosNames,setHerosNames] = useState([])

    const hero = useCurrentUserProp('hero')
    const userId = useCurrentUserProp('id')
    const segColors = Array.from({length: herosNames.length}, (_, i) => '#'+Math.floor(Math.random()*16777215).toString(16))

    function assignarHero(){
        dispatch(assignUserHero(userId))
    }

    useEffect(()=>{
        herosAPI.getAvailableHeros().then((response)=>{
            setHerosNames(response.data?.map(h=>h.name))
        })   
    },[])

    useEffect(()=>{

    },[hero])

    return (
        <React.Fragment>
            {herosNames.length>0&&hero?<WheelComponent
            segments={herosNames}
            segColors={segColors}
            winningSegment={hero?.name}
            onFinished={(winner) => console.log('')}
            primaryColor="black"
            contrastColor="white"
            buttonText="Girar"
            isOnlyOnce={true}
          />:
            <Grid container spacing={2} direction='column' align={"center"}>
                <Grid item xs={12}>
                    <Typography variant='h5'>Asignar Heroe</Typography>
                    <br/>
                    <Button color='primary' size='large' variant='contained' onClick={assignarHero}>Preparar Sorteo</Button>
                </Grid>
            </Grid>}
        </React.Fragment>
      );
}

export default WheelOfHeros