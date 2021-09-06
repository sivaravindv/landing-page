import React from 'react';
import Box from '@material-ui/core/Box';
//import Container from '@material-ui/core/Container';
//import { Typography } from '@material-ui/core';
//import Grid from '@material-ui/core/Grid';
//import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Image from '../assets/background.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${Image})`,
    minHeight: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '4rem',
  },
}));
export default function Hero() {
  const classes = useStyles();

  return (
    <Box className={classes.hero}>
      <CssBaseline />
    </Box>
  );
}
