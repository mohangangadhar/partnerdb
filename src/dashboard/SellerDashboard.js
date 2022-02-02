import React, { Fragment, useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import InputLabel from '@mui/material/InputLabel';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import * as Constants from "../constants/Constants";
function SellerDashBoard() {
    const [orderdata, setOrderData] = useState({});
    const [status, setStatus] = useState("accepted");
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [user] = useAuthState(auth);
    // const history = useHistory();
    let userId;
    let vendorName;
    if (auth.user) {
        userId = auth.currentUser.uid;
        vendorName = Constants.NAMES.get(userId);
    }
    useEffect(() => {
        let apiUrl;
        let check = false;
        setSearchNotFound(false);
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/summary/${status}`;
        console.log(apiUrl);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                data.map(data => {
                    if (data.vendorName == vendorName) {
                        setOrderData(data);
                        check = true;
                    }
                });
                if (!check) { setSearchNotFound(true) }
                setisLoading(false);
            }
            ).catch(err => setSearchNotFound(true));
    }, [status]);
    return (
        <div>
            {/* <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 5 }}>
                <Button variant="contained" color="success" target="_blank" href="https://jeevamrut.in/seller-profile?vendor_id=9">Go To Store<StorefrontIcon /></Button>
            </div> */}
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>DashBoard</h2></center>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
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
                                        style={{ height: 50, color: 'white' }}
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
                        {orderdata.totalSales !== undefined && !(isLoading) ?
                            <TableRow>
                                <TableCell>{orderdata.vendorName}</TableCell>
                                <TableCell align="center">{orderdata.totalSales}</TableCell>
                                <TableCell align="center">{orderdata.totalDelivery}</TableCell>
                                <TableCell align="center">{orderdata.total}</TableCell>
                            </TableRow>
                            : <div>
                                <center>
                                    {searchNotFound ? <h1 style={{ color: 'black' }}>No Data</h1> : <CircularProgress />}
                                </center>
                            </div>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </div >
    )
}

export default SellerDashBoard
