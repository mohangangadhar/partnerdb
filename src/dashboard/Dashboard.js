import React, { Fragment, useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
function DashBoard() {
    const [orderdata, setOrderData] = useState([]);
    const [status, setStatus] = useState("accepted");
    const [isLoading, setisLoading] = useState(false);
    // const [user] = useAuthState(auth);
    // const history = useHistory();
    // let userId = auth.currentUser.uid;
    useEffect(() => {
        let apiUrl;
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/summary/${status}`;
        console.log(apiUrl);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrderData(data);
                setisLoading(false);
            }
            );
    }, [status]);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Sl.No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Total Sales</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total Delivery</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Enter Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-disabled"
                                        value={status}
                                        onChange={(event) => {
                                            setisLoading(true);
                                            setStatus(event.target.value);
                                        }}
                                        label="Enter Status"
                                    >
                                        <MenuItem value="accepted">
                                            Accepted
                                        </MenuItem>
                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="failed">Failed</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderdata.length > 2 && !(isLoading) ? orderdata.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell>{row.vendorName}</TableCell>
                                <TableCell align="center">{row.totalSales}</TableCell>
                                <TableCell align="center">{row.totalDelivery}</TableCell>
                                <TableCell align="center">{row.total}</TableCell>
                            </TableRow>
                        )) : <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default DashBoard
