import { Answer, TokenType } from '@prisma/client'

export interface IHero {
    id?:number,
    name:string,
    photoURL:string,
    description?:string
    pareja?:string
}

export interface ITip {
    id?:number,
    question:string
    answers?:Answer[]
}

export interface IAnswer {
    id?:number,
    value:string

    tipId?:number 
    userId?:number
}
