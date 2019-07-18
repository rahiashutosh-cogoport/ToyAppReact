import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Rates from './Rates';
import './Rates.css';


const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  listItemText:{
    marginLeft: '5px',
    marginTop: '5px',
    fontSize:'1.8em'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSec: {
    backgroundColor: 'white',
    color: 'grey',
    zIndex: '5',
    fontSize: '12px',
    fontWeight: 'normal',
    top: 'auto',
    bottom: 0,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function icon(name) {
    if(name === 'Contact us') {
        return <i style={{color: 'grey'}} className="fas fa-phone-alt fa-2x"></i>
    }
    else if(name === 'Profile') {
        return <i style={{color: 'grey'}} className="fas fa-user fa-2x"></i>
    }
    else if(name === 'About us') {
        return <i style={{color: 'green'}} className="fas fa-info-circle fa-2x"></i>
    }
    else {
        return <i style={{color: 'red'}} className="fas fa-power-off fa-2x"></i>
    }
}

export default function RatesDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [userLoggedIn, setUserLoggedIn] = React.useState([]);

    React.useEffect(() => {
      fetch('http://localhost:3000/current_user', {
        method: 'GET',
        credentials: 'include'        
      }).then(results => results.json())
        .then(data => {
          var arr = [];
          if(data.user) {
            arr[0] = data.user['name'];
            arr[1] = data.user['aadhar_num'];
            arr[2] = data.user['contact_num'];
            arr[3] = data.user['email_id'];
            arr[4] = data.user['city'];
            arr[5] = data.user['country'];
            setUserLoggedIn(arr);
          }                    
        });
    }, []);

    function handleDrawerOpen() {
        setOpen(true);
    }
    
    function handleDrawerClose() {
        setOpen(false);
    }

    function renderClickAction(event) {
      event.preventDefault();
      console.log(event);
      window.location.replace("http://localhost:3001/logout");  
    }

    return (
        <div className={classes.root}>
              <div>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            {userLoggedIn != '' ? <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton> : <div></div>}
            <Typography style={{fontFamily: 'Poppins', fontSize: '18px', fontWeight: 'bold'}} variant="h6" noWrap>
                Rates Search Dashboard
            </Typography>

            <Typography style={{marginLeft: '900px', fontFamily: 'Poppins', fontSize: '15px'}} variant="h6" noWrap>
                {userLoggedIn != '' ? 'Welcome': ''}, {userLoggedIn[0]}
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
              <img src="data:image/png;base64,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" style={{width: '135px', height: '75px'}} />
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List style={{fontSize: '10px'}}>
            {['Profile', 'About us', 'Contact us', 'Logout'].map((text, index) => (
                <ListItem button onClick={ text === 'Logout' ? renderClickAction : null } key={text}>
                {icon(text)}
                <ListItemText classes={{primary: classes.listItemText}} primary={text} />
                </ListItem>
            ))}
                    </List>
                <Divider />
            </Drawer>
        </div>
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                <div style={{position: 'fixed'}} className={classes.drawerHeader} />
                { userLoggedIn != '' ?<Rates></Rates> : <center><div style={{color: 'grey', fontFamily: 'Poppins', fontSize: '15px', marginTop: '200px', color: 'black'}}>You are not authorized to view this page. Please <a href="http://localhost:3001/login">login</a> to continue.</div></center>}
                

                <AppBar
                    position="fixed"                    
                    className={clsx(classes.appBarSec, {
                      [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                      <Typography style={{fontFamily: 'Poppins'}} variant="h6" noWrap>
                          Cogo Freight Pvt. Ltd., India
                      </Typography>
                    </Toolbar>
                </AppBar>

                </main>
            </div>
        
    )
}