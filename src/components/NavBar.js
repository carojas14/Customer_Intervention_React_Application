import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from "@material-ui/core";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home } from '@material-ui/icons';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../img/R2.png'


const useStyles = makeStyles((theme) => ({
    root: {
        width: 700,
    },
    icon: {
        color: "#2B2B2B"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

function NavBar() {
    const classes = useStyles();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const newIntervention = () => {
        window.location.href = "/NewIntervention";
    };

    const home = () => {
        window.location.href = "/Home";
    };

    return (
        <AppBar position="static" style={{ backgroundColor: 'white'}}>
            <Toolbar>
                <img src={logo} alt='Rocket Elevators Logo' style={{ width:200, padding: 20 }}/>
                <Typography variant="h4" className={classes.title} color="primary">
                </Typography>
                <div>
                    <BottomNavigation
                        showLabels
                        className={classes.root}
                    >
                        <BottomNavigationAction label="Home" className={classes.icon} icon={<Home />} onClick={home}/>
                        <BottomNavigationAction label="New Intervention" className={classes.icon} icon={<CreateNewFolderIcon />} onClick={newIntervention} />
                        <BottomNavigationAction label="Logout" className={classes.icon} icon={<ExitToAppIcon />} onClick={handleLogout} />
                    </BottomNavigation>
                </div>
            </Toolbar>
        </AppBar>

    );
}


export default NavBar;