import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
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
import { mainListItems, secondaryListItems } from '../components/listitems';
import { AppBar, Badge, Divider, Drawer, List, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/chart.js';
import Deposits from '../components/deposits';
import Orders from '../components/orders';
import { CircularProgress } from '@mui/material';


function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }
  
  function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }
  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
  
  export default function Apartments() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [apartmetns, setApartmetns] = useState([])
    const [token , setToken] = useState(Cookies.get('token') || null);
    const [loading, setloading] = useState(true)
    const [open, setOpen] = useState(false);



    const renderRows = () => {
      return apartmetns.map((apartment) =>
        createData(
          apartment.build,
          apartment.project,
          apartment.meter,
          apartment.type,
          apartment.price
        )
      );
    };


    const tokenverify = async () => {
      setloading(true);
    
      try {
        const response = await fetch('http://localhost:8000/api/token', {
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
          window.location.href = 'http://localhost:3000/login'
        } else{
          setloading(false)
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
        setloading(false)
        window.location.href = 'http://localhost:3000/login'
      }
    };

    const toggleDrawer = () => {
      setOpen(!open);
    };



    const getapartments = async () => {
      setloading(true);
      
      try {
        const response = await fetch('http://localhost:8000/api/all_apartment', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status == 404 ) {
          console.log('not working');
          window.location.href = 'http://localhost:3000/login'
        } else{
          const responseData = await response.json(); 
          setApartmetns(responseData)
          setloading(false)
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
        setloading(false)
        window.location.href = 'http://localhost:3000/login'
      }
    };
    useEffect(() => {
      getapartments();
      tokenverify()
    }, []);

  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = apartmetns.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };

    const drawerWidth = 192;

    const defaultTheme = createTheme();

    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'close',
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
    
  
    const handleChangePage = (newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event, newValue) => {
      setRowsPerPage(parseInt(newValue.toString(), 10));
      setPage(0);
    };
  
    const getLabelDisplayedRowsTo = () => {
      if (apartmetns.length === -1) {
        return (page + 1) * rowsPerPage;
      }
      return rowsPerPage === -1
        ? apartmetns.length
        : Math.min(apartmetns.length, (page + 1) * rowsPerPage);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - apartmetns.length) : 0;
  
    return (
      <>
      <ThemeProvider theme={defaultTheme}>

    {/* <AppBar position="absolute" open={open}>
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
      </AppBar> */}
      {/* <Drawer variant="permanent" open={open}>
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
        <Divider style={{ display: 'none'}} />
        <List component="nav">  
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {/* {secondaryListItems} */}
        {/* </List>  */}
      {/* </Drawer> */}
      {/* <Sheet
        variant="outlined"
        sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', paddingLeft: 20 }}
      > */}
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <Table
          // aria-labelledby="tableTitle"
          // hoverRow
          // sx={{
          //   // '--TableCell-headBackground': 'transparent',
          //   // '--TableCell-selectedBackground': (theme) =>
          //     // theme.vars.palette.success.softBg,
          //   // '& thead th:nth-child(1)': {
          //     // width: '40px',
          //   // },
          //   // '& thead th:nth-child(2)': {
          //     // width: '30%',
          //   // },
          //   // '& tr > *:nth-child(n+3)': { textAlign: 'right' },
          // }}
          
        >
          {/* <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={apartmetns.length}
          /> */}
          {/* <tbody>
            {stableSort(renderRows(), getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
  
                return (
                  <tr
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    // selected={isItemSelected}
                    style={
                      isItemSelected
                        ? {
                            '--TableCell-dataBackground':
                              'var(--TableCell-selectedBackground)',
                            '--TableCell-headBackground':
                              'var(--TableCell-selectedBackground)',
                          }
                        : {}
                    }
                  >
                    <th scope="row">
                      <Checkbox
                        checked={isItemSelected}
                        slotProps={{
                          input: {
                            'aria-labelledby': labelId,
                          },
                        }}
                        sx={{ verticalAlign: 'top' }}
                      />
                    </th>
                    <th id={labelId} scope="row">
                      {row.name}
                    </th>
                    <td>{row.calories}</td>
                    <td>{row.fat}</td>
                    <td>{row.carbs}</td>
                    <td>{row.protein}</td>
                  </tr>
                );
              })}
            {emptyRows > 0 && (
              <tr
                style={{
                  height: `calc(${emptyRows} * 40px)`,
                  '--TableRow-hoverBackground': 'transparent',
                }}
              >
                <td colSpan={6} aria-hidden />
              </tr>
            )}
          </tbody> */}
          {/* <tfoot>
            <tr>
              <td colSpan={6}>
                {/* <Box
                  // sx={{
                  //   display: 'flex',
                  //   alignItems: 'center',
                  //   gap: 2,
                  //   justifyContent: 'flex-end',
                  // }}
                >
                  <FormControl 
                  // orientation="horizontal" size="sm"
                  >
                    <FormLabel>Rows per page:</FormLabel>
                    <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                    </Select>
                  </FormControl>
                  <Typography textAlign="center" sx={{ minWidth: 80 }}>
                    {labelDisplayedRows({
                      from: apartmetns.length === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: apartmetns.length === -1 ? -1 : apartmetns.length,
                    })}
                  </Typography>
                  <Box 
                  // sx={{ display: 'flex', gap: 1 }}
                  >
                    <IconButton
                      // size="sm"
                      // color="neutral"
                      // variant="outlined"
                      // disabled={page === 0}
                      // onClick={() => handleChangePage(page - 1)}
                      // sx={{ bgcolor: 'background.surface' }}
                    >
                      <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={
                        apartmetns.length !== -1
                          ? page >= Math.ceil(apartmetns.length / rowsPerPage) - 1
                          : false
                      }
                      onClick={() => handleChangePage(page + 1)}
                      sx={{ bgcolor: 'background.surface' }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Box>
                </Box> */}
              {/* </td>
            </tr> */}
          {/* </tfoot> */} 
        </Table>
      {/* </Sheet> */}
      </ThemeProvider>
      </>
    );
  }