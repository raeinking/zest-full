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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../components/listitems';
import Chart from '../components/chart';
import Deposits from '../components/deposits';
import Orders from '../components/orders';
import Checkbox from '@mui/joy/Checkbox';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import Cookies from 'js-cookie';
import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Names',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Projects',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Meter',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Type',
    },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Owner',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <thead>
        <tr>
          <th>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              slotProps={{
                input: {
                  'aria-label': 'select all desserts',
                },
              }}
              sx={{ verticalAlign: 'sub' }}
            />
          </th>
          {headCells.map((headCell) => {
            const active = orderBy === headCell.id;
            return (
              <th
                key={headCell.id}
                aria-sort={
                  active ? { asc: 'ascending', desc: 'descending' }[order] : undefined
                }
              >
                <Link
                  underline="none"
                  color="neutral"
                  textColor={active ? 'primary.plainColor' : undefined}
                  component="button"
                  onClick={createSortHandler(headCell.id)}
                  fontWeight="lg"
                  startDecorator={
                    headCell.numeric ? (
                      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  endDecorator={
                    !headCell.numeric ? (
                      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                    '&:hover': { '& svg': { opacity: 1 } },
                  }}
                >
                  {headCell.label}
                  {active ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </Link>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
  
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 1,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: 'background.level1',
          }),
          borderTopLeftRadius: 'var(--unstable_actionRadius)',
          borderTopRightRadius: 'var(--unstable_actionRadius)',
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            level="body-lg"
            sx={{ flex: '1 1 100%' }}
            id="tableTitle"
            component="div"
          >
            Zest Property Erbil Apartments
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton size="sm" color="danger" variant="solid">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton size="sm" variant="outlined" color="neutral">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

export default function Apartments() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [apartmetns, setApartmetns] = useState([])
    const [token , setToken] = useState(Cookies.get('token') || null);
    const [loading, setloading] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [rows, setrows] = useState([])
      const rowsWithIds = rows.map(row => ({
        ...row,
        id: row._id // Generate a unique identifier for each row
    }));
    

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

  
  
      const getapartments = async () => {        
        try {
          const response = await fetch('http://192.168.68.119:8000/api/all_apartment', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.status == 404 ) {
            console.log('not working');
            window.location.href = 'http://192.168.68.119:3000/login'
          } else{
            const responseData = await response.json(); 
            setApartmetns(responseData)
            setrows(responseData)
          }
        } catch (error) {
          console.error('Error during registration:', error.message);
          setloading(false)
          window.location.href = 'http://192.168.68.119:3000/login'
        }
      };
      useEffect(() => {
        getapartments();
        tokenverify()
      }, []);
  
  















  const toggleDrawer = () => {
    setOpen(!open);
  };

  const columns = [
    { field: 'build', headerName: 'Build', width: 130, align: 'left' },
    { field: 'project', headerName: 'Project', width: 130, align: 'left' },
    { field: 'type', headerName: 'Type', width: 80, align: 'left' },
    {
      field: 'meter',
      headerName: 'Meter',
      //   type: 'number',
      width: 130,
      align: 'left'
    },
    {
      field: 'Owner',
      headerName: 'Owner',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
      `${params.row.Owner || ''}`,
    },
    {
      field: 'price',
      headerName: 'Price by $',
      width: 130,
      align: 'left',
      valueGetter: (params) => {
        const price = params.value;
        if (price) {
          return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        }
        return '';
      },
    },
    {
      field: 'phone',
      headerName: 'Phone number',
      width: 130,
      align: 'left',
      renderCell: (params) => (
        <a href={`https://wa.me/${params.value}?text=${params.row.project} ${params.row.build} want this`}  target="_blank" style={{color: 'black', textDecoration: 'none'}} rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },  ];
    
    
    

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
      <Box sx={{ display: 'flex' }}>
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <DataGrid
                    rows={rowsWithIds}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
}