import {IHero, ITip } from '../models/IModels'

export const seedHeros:IHero[] = [
    {
        name:"Wanda",
        description:"Wanda Maximoff es una superheroína ficticia que aparece en los cómics publicados por Marvel Comics.",
        pareja:"Vision",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/vision.png"
    },{
        name:"Vision",
        description:"Visión, o la Visión, es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics.",
        pareja:"Wanda",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/vision.png"
    },{
        name:"Batman",
        description:"Batman es un personaje de cómic creado por los estadounidenses Bob Kane y Bill Finger, ​ y propiedad de DC Comics",
        pareja:"Robin",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/batman.jpeg"
    },{
        name:"Robin",
        description:"Robin es el alias de varios superhéroes ficticios que aparecen en los cómics estadounidenses publicados por DC Comics.",
        pareja:"Batman",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/robin.jpeg"
    },{
        name:"Iron Man",
        description:"Iron Man es un superhéroe que aparece en los cómics estadounidenses publicados por Marvel Comics.",
        pareja:"Pepper Pots",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/iron-man.jpg"
    },{
        name:"Pepper Pots",
        description:"Virginia \"Pepper\" Potts es un personaje ficticio que aparece en las historietas publicadas por Marvel Comics, particularmente ella representa el amor de Tony Stark",
        pareja:"Iron Man",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/Pepper%20Pots.jpg"
    },{
        name:"Hombre Araña",
        description:"Spider-Man, traducido en ocasiones como El Hombre Araña, ​​ es un personaje creado por los estadounidenses Stan Lee y Steve Ditko.",
        pareja:"Mary Jane",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Mary Jane",
        description:"Mary Jane Watson o Mary Jane Watson-Parker, es un personaje ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics y creado por Stan Lee y John Romita.",
        pareja:"Hombre Araña",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Thor",
        description:"La tetralogía de Thor, basada en el personaje ficticio Thor de Marvel Comics, comprende cuatro películas de fantasía, superhéroes y ciencia ficción del Universo cinematográfico de Marvel",
        pareja:"Loki",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Loki",
        description:"Loki, el Dios de las Mentiras, se aleja de la sombra de su hermano para embarcarse en una aventura que se desarrolla tras los acontecimientos de \"Vengadores: Endgame\".",
        pareja:"Thor",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Hombre Hormiga",
        description:"Un ladrón con la habilidad de encogerse de tamaño pero crecer en fuerza debe sacar su héroe interior y ayudar a su mentor a llevar a cabo un plan para salvar al mundo.",
        pareja:"Avispa",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Avispa",
        description:"La Avispa es una superheroína ficticia que aparece en cómics estadounidenses publicados por Marvel Comics.",
        pareja:"Hombre Hormiga",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Groot",
        description:"Groot es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics. Creado por Stan Lee, Larry Lieber y Jack Kirby.",
        pareja:"Rocket",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Rocket",
        description:"Rocket Raccoon, ​ es un Mapache que habla y hasta usa sus armas, un superhéroe de Marvel Comics. Apareció por primera vez en Marvel Preview #7.",
        pareja:"Groot",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Viuda Negra",
        description:"Una peligrosa conspiración, relacionada con su pasado, persigue a Natasha Romanoff, también conocida como Viuda Negra. ",
        pareja:"Ojo Halcon",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Ojo Halcon",
        description:"Hawkeye (Clinton Francis «Clint» Barton), es un superhéroe de ficción que aparece en los cómics estadounidenses publicados por Marvel Comics.",
        pareja:"Viuda Negra",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Deadpool",
        description:"Un exmercenario quien, tras haber sido sometido a un cruel experimento, adquiere el superpoder de sanar rápidamente y pretende vengarse del hombre que destrozó su vida.",
        pareja:"Daredevil",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Daredevil",
        description:"Ciego desde que era joven, Matt Murdock lucha contra la injusticia de día como abogado y por la noche como Daredevil en Nueva York.",
        pareja:"Deadpool",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"Hulk",
        description:"Hulk es un personaje ficticio, un superhéroe que aparece en los cómics estadounidenses publicados por la editorial Marvel Comics, es considerado el personaje más fuerte de Marvel Comics.",
        pareja:"Hulk",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },{
        name:"She-Hulk",
        description:"She-Hulk es una superheroína ficticia que aparece en los cómics estadounidenses publicados por Marvel Comics. Fue creada por Stan Lee y John Buscema y apareció por primera vez en la historieta Savage She Hulk #1",
        pareja:"She-Hulk",
        photoURL:"https://storage.googleapis.com/primos-navi-fotos/superhero-silluet.png"
    },
]

export const seedTips:ITip[] = [
    {
        question:"Cuentame una historia de tu infancia a tu amigo secreto"
    },{
        question:"¿Que color te gusta?"
    },{
        question:"¿Su comida favorita?"
    },{
        question:"¿Cuál es su sueño + grande?"
    },{
        question:"Cuál es su super poder?"
    },{
        question:"¿Qué le da miedo?"
    },{
        question:"¿Dónde ira de vacaciones?"
    },{
        question:"¿Qué super poder tendrias si pudieras elegir?"
    },{
        question:"¿Mar o Montaña? ¿Por qué?"
    },
]