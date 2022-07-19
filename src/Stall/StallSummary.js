import React, { Fragment, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableTitles from '../components/TableTitles/TableTitles';
import { APIURL, CircularProgressInTable, GetRequestOptions, poSummaryData, detail } from '../constants/Constants';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, CircularProgress } from '@material-ui/core';
import Picker from '../components/Picker';
const StallSummary = () => {
    const [topReports, setTopReports] = useState([]);
    const [productReports, setProductReports] = useState([]);
    const [noData, setNoData] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearch = async () => {
        if (startDate.length == 0 || endDate.length == 0) {
            alert("Please select start and end date");
            return;
        }
        const date = new Date(endDate);
        date.setDate(date.getDate() + 1);
        var todayDate = date.toISOString().slice(0, 10);


        setTopReports([]);
        setProductReports([]);
        setNoData(false);
        await fetch(APIURL + `stall-order-products/report?startDate=${startDate}&endDate=${todayDate}`, GetRequestOptions).then(
            response => response.json()
        ).then(data => {

            setTopReports(data);
            if (data.length === 0) {
                setNoData(true);
            }
        }).catch(err => console.log(err));
        await fetch(APIURL + `stall-order-products/product-report?startDate=${startDate}&endDate=${todayDate}`, GetRequestOptions).then(
            response => response.json()
        ).then(data => {

            setProductReports(data);

        }).catch(err => console.log(err));
    }
    useEffect(() => {
        // changeStatus();
    }, []);

    return (
        <>


            <TableContainer component={Paper}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <h2>StallSummary:</h2>
                    <Picker color="white" dateChange={(e) => setStartDate(e.target.value)} date={startDate} label="Start Date" />
                    <Picker color="white" dateChange={(e) => setEndDate(e.target.value)} date={endDate} label="End Date" />
                    <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
                </div>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>


                        <TableCell align="center" style={{ color: 'wheat' }}>Type</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Sales</TableCell>
                        {/* <TableCell align="center" style={{ color: 'wheat' }}>Inbound</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Outbound</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Testing</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Wastage</TableCell> */}

                    </TableHead>
                    {topReports ?

                        < TableBody >
                            {noData && <h2>No Data</h2>}

                            <TableRow >
                                <TableCell align="center" >Count</TableCell>
                                {topReports.length > 0 && topReports.map((rows, index) => (
                                    <TableCell align="center">{rows.count}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow >
                                <TableCell align="center" >Amount</TableCell>
                                {topReports.length > 0 && topReports.map((rows, index) => (
                                    <TableCell align="center">{rows.sum}</TableCell>
                                ))}
                            </TableRow>
                        </TableBody> : <CircularProgressInTable />}
                </Table>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>



                        <TableCell align="center" style={{ color: 'wheat' }}>Product</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Sales QTY</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Amount</TableCell>

                    </TableHead>
                    {productReports ?

                        < TableBody >
                            {noData && <h2>No Data</h2>}


                            {productReports.length > 0 && productReports.map((rows, index) => (
                                <TableRow >

                                    <TableCell align="center">{rows.product}</TableCell>
                                    <TableCell align="center">{rows.quantity}</TableCell>
                                    <TableCell align="center">{rows.sum}</TableCell>
                                </TableRow>
                            ))}


                        </TableBody> : <CircularProgressInTable />}
                </Table>
            </TableContainer>
        </>
    )
}

export default StallSummary;