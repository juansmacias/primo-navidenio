import React,{useEffect} from 'react'

import { useDispatch } from 'react-redux'

import HomeBanner from 'src/components/HomeBanner'
import HerosList from 'src/components/HerosList'
import GameInstructions from 'src/components/GameInstructions'

// ----- Actions --------
import { getHeros } from 'reducers/heros'

// ----- Hooks --------
import { useCurrentHeros } from 'hooks/useCurrentHeros'


export default function Home (){
    const dispatch = useDispatch()
    const heros = useCurrentHeros()
    useEffect(()=>{
        dispatch(getHeros())
    },[])


    return (
        <React.Fragment>
            <HomeBanner/>
            <GameInstructions/>
            <HerosList heros={heros} />
        </React.Fragment>
        
    )
} 