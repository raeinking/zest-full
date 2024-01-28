import React , {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertTitle, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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

















function Add_Apartments() {
  const [token , setToken] = useState(Cookies.get('token') || null);

  const [name, setname] = useState('')
  const [project, setproject] = useState('')
  const [type, settype] = useState('')
  const [meter, setmeter] = useState('')
  const [owner, setowner] = useState('')
  const [phone, setphone] = useState('')
  const [price, setprice] = useState('')

  const [right, setright] = useState(false)
  const [wrong, setwrong] = useState(false)
  const [loading, setloading] = useState(false)
  
  const tokenverify = async () => {
    setloading(true);
  
    try {
      const response = await fetch('http://192.168.68.119:8000/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token : token
        }),
      });
  
      if (response.status == 404 ) {
        console.log('not working');
        window.location.href = 'http://192.168.68.119:3000/login'
      } else{
        setloading(false)
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      setloading(false)
      window.location.href = 'http://192.168.68.119:3000/login'
    }
  };

  useEffect(() => {
    tokenverify();
  }, []);








  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
  
    try {
      const response = await fetch('http://192.168.68.119:8000/api/add_apartment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          build: name,
          meter: meter,
          price: price,
          Owner: owner,
          type: type,
          phone: phone,
          project: project,
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
      
      setright(true)
      setwrong(false)
      setloading(false)
      window.location.href = 'http://192.168.68.119:3000/property'
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

            <Typography component="h1" variant="h5">
              Add Apartment
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name..."
                onChange={(e) => setname(e.target.value)}
                name="name"
                autoComplete="name"
                autoFocus
              />
              <Grid item xs={12} marginTop={2}>
                <FormControl fullWidth required>
                    <InputLabel id="role-label">Project</InputLabel>
                    <Select
                    labelId="role-label"
                    id="Project"
                    name="Project"
                    onChange={(e) => setproject(e.target.value)}
                    >
                    <MenuItem value="North Holland">North Holland</MenuItem>
                    <MenuItem value="Sky Land">Sky Land</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} marginTop={2.5}>
                <FormControl fullWidth required>
                    <InputLabel id="role-label">Type</InputLabel>
                    <Select
                    labelId="role-label"
                    id="Type"
                    name="Type"
                    onChange={(e) => settype(e.target.value)}
                    >
                    <MenuItem value="villa">Villa</MenuItem>
                    <MenuItem value="1 + 1">1 + 1</MenuItem>
                    <MenuItem value="2 + 1">1 + 2</MenuItem>
                    <MenuItem value="3 + 1">1 + 3</MenuItem>
                    <MenuItem value="4 + 1">1 + 4</MenuItem>
                    <MenuItem value="5 + 1">1 + 5</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
            <TextField
                margin="normal"
                required
                fullWidth
                name="meter"
                label="Meter..."
                onChange={(e) => setmeter(e.target.value)}
                type="text"
                id="meter"
            />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Owner"
                label="Owner..."
                onChange={(e) => setowner(e.target.value)}
                type="text"
                id="Owner"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone Number..."
                onChange={(e) => setphone(e.target.value)}
                type="text"
                id="phone"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price By $ ..."
                onChange={(e) => setprice(e.target.value)}
                type="text"
                id="price"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create This Apartment
              </Button>

              <Copyright sx={{ mt: 5 }} />
              {right ? 
            <Alert severity="success">Create it Successfully.</Alert>
            :
            null}
            {wrong ? 
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              error: put every details please.
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

export default Add_Apartments