import React, {useState} from 'react';
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
import { Alert, AlertTitle, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();




function Signup() {
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setemail] = useState('')
  const [roll, setroll] = useState('')
  const [password, setpassword] = useState('')
  const [right, setright] = useState(false)
  const [wrong, setwrong] = useState(false)
  const [loading, setloading] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
  
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${firstname} ${lastname}`,
          email: email,
          password: password,
          roll: roll,
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
      
      // Handle successful response (if needed)
      const responseData = await response.json();
      console.log('Successfully registered:', responseData);
      setright(true)
      setwrong(false)
      setloading(false)
      // You might want to redirect the user or perform other actions here
    } catch (error) {
      console.error('Error during registration:', error.message);
      setwrong(true)
      setright(false)
      setloading(false)
      // Handle error, show a message to the user, etc.
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{               my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  onChange={(e) => setfirstname(e.target.value)}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={(e) => setlastname(e.target.value)}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
      <FormControl fullWidth required>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          onChange={(e) => setroll(e.target.value)}
          autoComplete="role"
        >
          <MenuItem value="owner">Owner</MenuItem>
          <MenuItem value="agent">Agent</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
          <MenuItem value="accountant">Accountant</MenuItem>
        </Select>
      </FormControl>
    </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {right ? 
            <Alert severity="success">Sign Up Successfully.</Alert>
            :
            null}
            {wrong ? 
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              error: maybe this email exists or you don't provide everything.
            </Alert>
            :
            null
          }
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Signup