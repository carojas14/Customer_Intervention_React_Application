import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavBar from "./NavBar";
import Interventions from "./Interventions";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar/>
            <div style={{ marginTop: 20, padding: 50 }}>
                <Card>
                    <CardContent>
                        <Interventions />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}