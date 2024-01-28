import React , {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/* {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}
const defaultTheme = createTheme();

















function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [right, setright] = useState(false)
  const [wrong, setwrong] = useState(false)
  const [loading, setloading] = useState(false)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
  
    try {
      const response = await fetch('http://192.168.68.119:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });
  
      if (!response.ok) {
        // Handle error responses from the server
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
        setwrong(true)
        setright(false)
        setloading(false)
      }
      
      const responseData = await response.json();
      Cookies.set('token', responseData.token) 
      
      setright(true)
      setwrong(false)
      setloading(false)
      window.location.href = 'http://192.168.68.119:3000/'
    } catch (error) {
      console.error('Error during registration:', error.message);
      setwrong(true)
      setright(false)
      setloading(false)
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
            {loading ? 
          <Box sx={{ display: 'flex', position: 'absolute', minHeight: '100vh', width: '100%' , backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 98, alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
          :
          null
          }

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?dubai)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={(e) => setemail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              {right ? 
            <Alert severity="success">Log In Successfully.</Alert>
            :
            null}
            {wrong ? 
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              error: maybe this email or password is wrong.
            </Alert>
            :
            null
          }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login