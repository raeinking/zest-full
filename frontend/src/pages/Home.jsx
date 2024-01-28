  import React, {useState, useEffect} from 'react';
  import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
  import CssBaseline from '@mui/material/CssBaseline';
  import MuiDrawer from '@mui/material/Drawer';
  import Box from '@mui/material/Box';
  import MuiAppBar from '@mui/material/AppBar';
  import Toolbar from '@mui/material/Toolbar';
  import List from '@mui/material/List';
  import Typography from '@mui/material/Typography';
  import Divider from '@mui/material/Divider';
  import IconButton from '@mui/material/IconButton';
  import Badge from '@mui/material/Badge';
  import Container from '@mui/material/Container';
  import Grid from '@mui/material/Grid';
  import Paper from '@mui/material/Paper';
  import MenuIcon from '@mui/icons-material/Menu';
  import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
  import NotificationsIcon from '@mui/icons-material/Notifications';
  import { mainListItems, secondaryListItems } from '../components/listitems';
  import Chart from '../components/chart.js';
  import Deposits from '../components/deposits';
  import Orders from '../components/orders';
  import Cookies from 'js-cookie';
  import { CircularProgress } from '@mui/material';

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



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})
(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



function Home() {
  const [token , setToken] = useState(Cookies.get('token') || null);
  const [loading, setloading] = useState(true)
  const [apartmetns, setApartmetns] = useState([])

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const tokenverify = async () => {
      setloading(true);
    
      try {
        const response = await fetch('http://192.168.68.119:8000/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token
          }),
        });
      
        if (response.status === 404) {
          console.log('not working');
          window.location.href = 'http://192.168.68.119:3000/login';
        } else {
          const responseData = await response.json(); // Parse JSON response
          if (responseData.message === 'agent') {
            window.location.href = 'http://192.168.68.119:3000/property';
          } else {
            setloading(false);
            console.log(responseData);
          }
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
        setloading(false);
        window.location.href = 'http://192.168.68.119:3000/login';
      }
    }      

    useEffect(() => {
      tokenverify();
    }, []);
    

  
    return (
      <>
          {loading ? 
          <Box sx={{ display: 'flex', position: 'absolute', minHeight: '100vh', width: '100%' , backgroundColor: 'rgba(0,0,0,1)', zIndex: 2000, alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
          :
          null
          }
      <ThemeProvider theme={defaultTheme}>

          <Box sx={{ display: 'flex' , }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                {/* <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                  </Paper>
                </Grid> */}
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
            </>
    );
  }
export default Home