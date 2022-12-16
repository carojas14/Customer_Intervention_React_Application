/* useeffect reference : https://www.freecodecamp.org/news/react-useeffect-absolute-beginners/ */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Button, Select, FormHelperText } from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import NavBar from "./NavBar";
import swal from 'sweetalert';


/* styles */

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        display: "flex"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textArea: {
        marginTop: theme.spacing(2),
        width: '100%',
        maxWidth: 540,
        minWidth: 540,
        background: 'none',
        padding: theme.spacing(1),
    },
}));


const headerRequest = {
    headers: {
        Authorization:  `Bearer ${localStorage.getItem("accessToken")}`,
    },
};

const currentCustomer = async (setCustomer) => {
    try {
        const response = await axios.get("https://java-api.codeboxxtest.xyz/customers/current", headerRequest);
        /* console.log(response.data) */
        setCustomer(response.data);
    } catch (error) {
        console.warn("[currentCustomer] Error: ", error);
    }
};

const getBuildings = async (setBuildings) => {
    try {
        const response = await axios.get("https://java-api.codeboxxtest.xyz/buildings", headerRequest);

        setBuildings(response.data);
    } catch (error) {
        console.warn("[getBuildings] Error: ", error);
    }
};

const getBatteries = async (buildingId, setBatteries) => {
    try {
        const response = await axios.get(`https://java-api.codeboxxtest.xyz/buildings/${buildingId}/batteries`, headerRequest);

        setBatteries(response.data);
    } catch (error) {
        console.warn("[getBatteries] Error: ", error);
    }
};

const getColumns = async (batteryId, setColumns) => {
    try {
        const response = await axios.get(`https://java-api.codeboxxtest.xyz/batteries/${batteryId}/columns`, headerRequest);

        setColumns(response.data);
    } catch (error) {
        console.warn("[getColumns] Error: ", error);
    }
};

const getElevators = async (columnId, setElevators) => {
    try {
        const response = await axios.get(`https://java-api.codeboxxtest.xyz/columns/${columnId}/elevators`, headerRequest);

        setElevators(response.data);
    } catch (error) {
        console.warn("[getElevators] Error: ", error);
    }
};



export default function RequestForm() {

    const classes = useStyles();
    const [customer, setCustomer] = useState([]);

    const [buildings, setBuildings] = useState([]);
    const [buildingId, setBuildingId] = useState();

    const [batteries, setBatteries] = useState([]);
    const [batteryId, setBatteryId] = useState();

    const [columns, setColumns] = useState([]);
    const [columnId, setColumnId] = useState();

    const [elevators, setElevators] = useState([]);
    const [elevatorId, setElevatorId] = useState();

    const [report, setReport] = useState([]);


    useEffect(() => {
        currentCustomer(setCustomer);
    }, []);

    useEffect(() => {
        getBuildings(setBuildings);
    }, []);

    useEffect(() => {
        if (buildingId !== 0) {
            getBatteries(buildingId, setBatteries);
        }
    }, [buildingId]);

    useEffect(() => {
        if (batteryId !== 0) {
            getColumns(batteryId, setColumns);
        }
    }, [batteryId]);

    useEffect(() => {
        if (columnId !== 0) {
            getElevators(columnId, setElevators);
        }
    }, [columnId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://java-api.codeboxxtest.xyz/interventions/new",
                {
                    customerID: customer.id,
                    buildingID: buildingId,
                    batteryID: batteryId,
                    columnID: columnId,
                    elevatorID: elevatorId,
                    report: report
                },
                headerRequest
            );
            console.log(response.data)
            if (response.status === 200) {
                swal({
                    title: "Success!",
                    text: "The request was sent successfully.!",
                    icon: "success",
                    buttons: false,
                    timer: 2000,
                })
                .then((value) => {
                    window.location.href = "/Home";
                });

            }
        } catch (error) {
            console.warn("[handleSubmit] Error: ", error);
            swal("Failed", error.message, "error");
        }
    }


    return (

        <div className={classes.root}>
            <NavBar />

            <div style={{ display: "flex", justifyContent: "center", margin: 20, padding: 50}} >

                <Container maxWidth="sm" component={Paper} style={{ backgroundColor: '#EBECEC', display: "flex", flexDirection: "column", margin: 20, padding: 20 }}>
                    <Typography vcomponent="h1" variant="h4" align="center">New Intervention</Typography>

                    <form className={classes.form} onSubmit={handleSubmit}>

                        {/* Customer ID */}

                        <FormControl variant="outlined" className={classes.formControl} disabled>
                            <InputLabel id="customer">{customer.company_name}</InputLabel>
                            <Select
                                labelId="customer"
                                id="customer"
                                value={customer.id}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                            </Select>
                            <FormHelperText>Disabled</FormHelperText>
                        </FormControl>

                        {/* Select building */}

                        <FormControl required variant="outlined" className={classes.formControl}>
                        <InputLabel id="building">Building</InputLabel>
                        <Select
                            labelId="building"
                            id="building"
                            value={buildingId}
                            onChange={e => setBuildingId(e.target.value)}
                            label="building"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {buildings.length !== 0 && buildings.map((building) => (
                                <MenuItem key={building.id} value={building.id}>{building.id}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                        </FormControl>

                        {/* Select Battery */}

                        <FormControl required variant="outlined" className={classes.formControl}>
                        <InputLabel id="">Battery</InputLabel>
                        <Select
                            labelId="battery"
                            id="battery"
                            value={batteryId}
                            onChange={e => setBatteryId(e.target.value)}
                            label="battery"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {batteries.length !== 0 && batteries.map((battery) => (
                                <MenuItem key={battery.id} value={battery.id}>{battery.id}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                        </FormControl>

                        {/* Select Column */}

                        <FormControl required variant="outlined" className={classes.formControl}>
                        <InputLabel id="">Column</InputLabel>
                        <Select
                            labelId="column"
                            id="column"
                            value={columnId}
                            onChange={e => setColumnId(e.target.value)}
                            label="column"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {columns.length !== 0 && columns.map((column) => (
                                <MenuItem key={column.id} value={column.id}>{column.id}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                        </FormControl>

                        {/* Select Elevator */}

                        <FormControl required variant="outlined" className={classes.formControl}>
                        <InputLabel id="elevator">Elevator</InputLabel>
                        <Select
                            labelId="elevator"
                            id="elevator"
                            value={elevatorId}
                            onChange={e => setElevatorId(e.target.value)}
                            label="elevator"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {elevators.length !== 0 && elevators.map((elevator) => (
                                <MenuItem key={elevator.id} value={elevator.id}>{elevator.id}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                        </FormControl>

                        <TextareaAutosize
                            component={Paper}
                            required
                            aria-label="minimum height"
                            minRows={4}
                            placeholder="Report"
                            className={classes.textArea}
                            onChange={e => setReport(e.target.value)}
                        />

                        <Button type="submit" variant="contained" color="primary" size="medium" endIcon={<SendIcon/>} fullWidth className={classes.submit} >
                            Submit
                        </Button>
                    </form>
                </Container>
            </div>
        </div>
    );
}