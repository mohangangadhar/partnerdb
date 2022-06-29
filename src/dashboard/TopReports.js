import React, { Fragment, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableTitles from '../components/TableTitles/TableTitles';
import { APIURL, CircularProgressInTable, GetRequestOptions, poSummaryData } from '../constants/Constants';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress } from '@material-ui/core';
const TopReports = () => {
    const [topReports, setTopReports] = useState([]);
    const [status, setStatus] = useState('expenses');
    const changeStatus = async (status) => {
        setTopReports([]);
        let url = status == "expenses" ? "expenses/top-expense-summary" : "po-report-info/top-po-summary";
        await fetch(APIURL + url, GetRequestOptions).then(
            response => response.json()
        ).then(data => {
            console.log(data);
            setTopReports(data);
        }).catch(err => console.log(err));
    }
    useEffect(() => {
        changeStatus("expenses");
    }, []);

    return (
        <>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Top 10 Reports:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        {status == "expenses" ?
                            <>
                                <TableCell align="center" style={{ color: 'wheat' }}>Payment Status</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>reimbursmentStatus</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Amount</TableCell>

                                <TableCell align="center" style={{ color: 'wheat' }}>Raised By</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Category</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Expense Id</TableCell>
                            </> :
                            <>
                                <TableCell align="center" style={{ color: 'wheat' }}> Po Number</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Payment Status</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Po Total</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Actual Total</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Po Status</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Primary Supplier</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Po Received Date</TableCell>
                            </>
                        }

                        <TableCell>
                            <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Vendor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    style={{ height: 50, color: 'white' }}
                                    id="demo-simple-select-disabled"
                                    value={status}
                                    onChange={(event) => {
                                        setStatus(event.target.value);
                                        changeStatus(event.target.value);
                                    }}
                                    label="Report Type?"
                                >
                                    <MenuItem value="expenses">
                                        Expenses
                                    </MenuItem>
                                    <MenuItem value="po">Po</MenuItem>

                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableHead>
                    {topReports ?
                        <TableBody>
                            {status == "expenses" ? topReports.map((rows, index) => (
                                <TableRow >
                                    <TableCell align="center">{rows.paymentStatus}</TableCell>
                                    <TableCell align="center">{rows.reimbursmentStatus}</TableCell>
                                    <TableCell align="center">{rows.amount}</TableCell>
                                    <TableCell align="center">{rows.raisedBy}</TableCell>
                                    <TableCell align="center">{rows.category}</TableCell>
                                    <TableCell align="center">{rows.expenseId}</TableCell>
                                </TableRow>
                            ))
                                : topReports.map((rows, index) => (
                                    <TableRow >
                                        <TableCell align="center">{rows.poNumber}</TableCell>
                                        <TableCell align="center">{rows.paymentStatus}</TableCell>
                                        <TableCell align="center">{rows.poTotal}</TableCell>
                                        <TableCell align="center">{rows.actualTotal}</TableCell>
                                        <TableCell align="center">{rows.poStatus}</TableCell>
                                        <TableCell align="center">{rows.primarySupplier}</TableCell>
                                        <TableCell align="center">{rows.poReceivedDate}</TableCell>
                                    </TableRow>

                                ))}


                        </TableBody> : <CircularProgressInTable />}
                </Table>
            </TableContainer>
        </>
    )
}

export default TopReports