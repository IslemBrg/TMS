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
import { useRouter } from 'next/router';


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

const isLoggedIn = async (event) => {
  const router = useRouter()
  
  const res = await fetch(`http://localhost:3000/api/authentication/authed`)
  const user = await res.json()
  if ((user == 403) || (user == 401)) {}
  else {router.push('/app/home')}
}

const theme = createTheme();

export default function Signup() {
  const router = useRouter()
  isLoggedIn()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Mat: data.get('matricul'),
      pass: data.get('pass'),
    });
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
            S'inscrire
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
              label="Saisir un Mot de passe"
              type="password"
              id="pass"
              autoComplete="Mot de passe"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass2"
              label="Saisir à nouveau le Mot de passe"
              type="password"
              id="pass2"
              autoComplete="Mot de passe"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container>
              <Grid item xs>
                <div></div>
              </Grid>
              <Grid item>
                <Link href="/Sign/Login" variant="body2">
                  {"vous avez deja un compte? Login."}
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