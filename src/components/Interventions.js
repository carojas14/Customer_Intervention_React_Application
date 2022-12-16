import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const URL = "https://java-api.codeboxxtest.xyz/customers/current";
const token =localStorage.getItem("accessToken");


const headerRequest = {
    headers: {
        Authorization:  `Bearer ${token}`,
    },
};

const currentCustomer = async (setCustomer) => {
    try {
        const response = await axios.get(URL, headerRequest);
        /* console.log(response.data) */
        setCustomer(response.data);
    } catch (error) {
        console.warn("[currentCustomer] Error: ", error);
    }
};

/* reference : https://dzone.com/articles/add-material-ui-table-in-reactjs-application */

const Interventions = () => {
    const [customer, setCustomer] = useState([]);
    const name = customer.company_name;
    useEffect(() => {
        currentCustomer(setCustomer);
    }, []);

    const render = () => {
        return customer.interventions.map((intervention, index) => {
            let {
                id,
                building,
                battery,
                column,
                elevator,
                status,
                result,
                report
            } = intervention;
            /* console.log(intervention) */
            return (
                <TableRow key={index}>
                    <TableCell align="center">{id}</TableCell>
                    <TableCell align="center">{ building.id ? building.id : building }</TableCell>
                    <TableCell align="center">{ battery != null && battery.id ? battery.id : battery }</TableCell>
                    <TableCell align="center">{ column != null && column.id ? column.id : column }</TableCell>
                    <TableCell align="center">{ elevator != null && elevator.id ? elevator.id : elevator }</TableCell>
                    <TableCell align="center">{ report }</TableCell>
                    <TableCell align="center">{ result }</TableCell>
                    <TableCell align="center">{ status }</TableCell>
                </TableRow>
            );
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: 20, paddingLeft: 200, paddingRight: 200 }}>
            <Typography variant="h3" style={{ paddingBottom: 25 }}>
                Interventions of {name} company
            </Typography>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: '#459DDC'}}>
                        <TableRow >
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Building</TableCell>
                            <TableCell align="center">Battery</TableCell>
                            <TableCell align="center">Column</TableCell>
                            <TableCell align="center">Elevator</TableCell>
                            <TableCell align="center">Report</TableCell>
                            <TableCell align="center">Result</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {customer.length !== 0 && customer.interventions.length !== 0 && render()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Interventions;