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

// ----- Hook -----

import {useHerosById} from 'hooks/useCurrentHeros'

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
  console.log("🚀 ~ file: HeroInfoCard.jsx:31 ~ HeroInfoCard ~ heroid", heroid)
  console.log("🚀 ~ file: HeroInfoCard.jsx:31 ~ HeroInfoCard ~ hero", hero)

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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