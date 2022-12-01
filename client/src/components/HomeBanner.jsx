import * as React from 'react';
import {Button,Typography} from '@mui/material'
import HomeBannerLayout from '../layouts/HomeBannerLayout'

import { useIsAuth } from 'hooks/useAuth'

const backgroundImage =
  'https://storage.googleapis.com/primos-navi-fotos/primos2021.jpg'

export default function HomeBanner() {
  const isAuth = useIsAuth()
  return (
    <HomeBannerLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="primos 2021"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Bienvenidos Primos!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        A nuestro evento de primos secretos 2022
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href={isAuth?"/perfil":"/login"}
        sx={{ minWidth: 200 }}
      >
        {isAuth?"Perfil":"Iniciar Sesión"} 
      </Button>
    </HomeBannerLayout>
  );
}
