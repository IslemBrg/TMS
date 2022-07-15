import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState,useEffect} from 'react'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.transtu.tn/">
        TRANSTU
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <br/>
      {'Made with ♡ by Islem Bargaoui'}
    </Typography>
  );
}

const theme = createTheme();


export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mat = data.get('matricul')
    const pass = data.get('pass')
    const config={
      method:"POST",
      body:JSON.stringify({
        mat:mat,
        pass:pass
      })
    }
    const res = await fetch(`http://localhost:3000/api/authentication/auth`,config)
    const login = await res.json()
    if (login==200){console.log('ok')}
    if (login==401){console.log('not ok')}
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'green' }}>
            S
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="matricul"
              label="Numero d'immatriculation"
              name="matricul"
              autoComplete="matricul"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Mot de passe"
              type="password"
              id="pass"
              autoComplete="Mot de passe"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <div></div>
              </Grid>
              <Grid item>
                <Link href="/Sign/Signup" variant="body2">
                  {"vous n'avez pas de compte ? S'inscrire"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}