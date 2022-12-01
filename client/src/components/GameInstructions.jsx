import * as React from 'react'
import {Grid, Box, Container, SvgIcon, Typography} from '@mui/material'

import AttractionsIcon from '@mui/icons-material/Attractions';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'white',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function GameInstructions() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src=""
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" color="white" marked="center" component="h2" sx={{ mb: 14 }}>
          Instrucciones
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
            <Box
              component="img"
              sx={{
              height: 642,
              width: 642,
              maxHeight: { xs: 642 },
              maxWidth: { xs: 642 },
              }}
              alt="Instrucciones"
              src="https://storage.googleapis.com/primos-navi-fotos/instrucciones.jpeg"
              />
              <Box
              component="img"
              sx={{
              height: 858,
              width: 649,
              maxHeight: { xs: 858 },
              maxWidth: { xs: 649 },
              }}
              alt="Parejas"
              src="https://storage.googleapis.com/primos-navi-fotos/parejas.jpeg"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default GameInstructions
