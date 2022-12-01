import { useSelector } from "react-redux"

import { selectCurrentHeros } from 'reducers/heros'

export const useCurrentHeros = () =>{
    return useSelector(selectCurrentHeros)   
}

export const useHerosById = (heroId) =>{
    const heroIdInt = parseInt(heroId)
    const heros = useSelector(selectCurrentHeros) 
    const hero = heros.find(h=>h.id===heroIdInt)
    return  hero
}