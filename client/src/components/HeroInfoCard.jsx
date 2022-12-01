import React,{useState,useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ----- Hook -----
import {useHerosById} from 'hooks/useCurrentHeros'

// ----- API ------
 import * as HerosAPI from 'api/heros'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))


const HeroInfoCard = ({heroid}) => {
  const hero = useHerosById(heroid)
  const [answers,setAnswers] = useState([])

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  useEffect(()=>{

    HerosAPI.getAnswersByHeroId(heroid).then((response)=>{
      if(response.status===200)
        setAnswers(response.data)
    })
  },[])
  console.log("🚀 ~ file: HeroInfoCard.jsx:39 ~ HeroInfoCard ~ answers", answers)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={hero?.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={hero?.photoURL}
        alt={hero?.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {hero?.description}       
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tu pareja es: {hero?.pareja}       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Grid container spacing={2}> 
          <Grid item xs={12} >
            <Typography variant='h4'>Tips:</Typography>
          </Grid>
        {answers?.map((a) =>(
          <Grid item xs={12} key={a.id}>
            <Typography paragraph>{a.value}</Typography>
          </Grid>
        ))}
        {answers?.length===0?
        <Grid item xs={12} >
          <Typography paragraph>Sin Tips</Typography>
        </Grid>:''
        }   
        </ Grid>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default HeroInfoCard