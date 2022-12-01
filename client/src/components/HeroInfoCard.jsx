import React,{useState} from 'react'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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

const HeroInfoCard = () => {

const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Vision"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://storage.googleapis.com/primos-navi-fotos/vision.png"
        alt="Vision"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Visión, o la Visión, es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics. 
        El personaje apareció por primera vez en Avengers Volumen 1 # 57, y se basa libremente en el personaje de Timely Comics 
        del mismo nombre que era un extraterrestre de otra dimensión
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
          <Typography variant='h4'>Tips:</Typography>

        </CardContent>
      </Collapse>
    </Card>
  )
}

export default HeroInfoCard