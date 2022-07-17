import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';

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

const isLoggedIn = async () => {
  const router = useRouter()
  const res = await fetch(`http://localhost:3000/api/authentication/authed`)
    const user = await res.json()
    if ((user == 403) || (user == 401)) {}
    else{router.push('/app/home')}
}

export default function Login() {
  const router = useRouter()
  isLoggedIn()

  const [EmptyMatInput, setEmptyMatInput] = useState(false)
  const [EmptyPassInput, setEmptyPassInput] = useState(false)
  const [InvalidCredentials, setInvalidCredentials] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mat = data.get('matricul')
    const pass = data.get('pass')
    setEmptyMatInput(false)
    setEmptyPassInput(false)
    setInvalidCredentials(false)
    if(mat == ""){
      setEmptyMatInput(true)
      return;
    }
    if(pass == ""){
      setEmptyPassInput(true)
      return;
    }
    const config={
      method:"POST",
      body:JSON.stringify({
        mat:mat,
        pass:pass
      })
    }
    const res = await fetch(`http://localhost:3000/api/authentication/auth`,config)
    const login = await res.json()
    if (login==200){
      console.log('Valid credentials!')
      router.push('/app/home')
    }
    if (login==401){
      console.log(setInvalidCredentials(true))
    }
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
            {EmptyMatInput && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Veuillez saisir votre numéro d'immatriculation!</p>
              </div>
            }
            {EmptyPassInput && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Veuillez saisir votre mot de passe!</p>
              </div>
            }
            {InvalidCredentials && 
              <div className='errorMessage'>
                <p style={{padding:'1px',textAlign:'center'}}>Numéro d'immatriculation ou mot de passe n'est pas correct!</p>
              </div>
            }
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