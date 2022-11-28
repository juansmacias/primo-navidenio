import React from 'react'
import HomeBanner from 'src/components/HomeBanner'
import GameInstructions from 'src/components/GameInstructions'
import HerosList from 'src/components/HerosList'
export default function Home (){
    return (
        <React.Fragment>
            <HomeBanner/>
            <GameInstructions/>
            <HerosList/>
        </React.Fragment>
        
    )
} 