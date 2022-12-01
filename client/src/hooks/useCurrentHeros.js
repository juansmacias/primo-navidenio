import { useSelector } from "react-redux"

import { selectCurrentHeros } from 'reducers/heros'

export const useCurrentHeros = () =>{
    return useSelector(selectCurrentHeros)   
}

export const useHerosById = (heroId) =>{
    const heros = useSelector(selectCurrentHeros) 
    console.log("🚀 ~ file: useCurrentHeros.js:13 ~ useHerosById ~ heros", heros)
    const hero = heros.find(h=>h.id===heroId)
    return  hero
}