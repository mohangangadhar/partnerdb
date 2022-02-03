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
const SellerDashBoard = ({ userId }) => {
    const [orderdata, setOrderData] = useState({});
    const [status, setStatus] = useState("accepted");
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [user] = useAuthState(auth);
    // const history = useHistory();

    let vendorName = Constants.NAMES.get(userId);
    console.log(vendorName);
    useEffect(() => {
        let apiUrl;
        setSearchNotFound(false);
        setisLoading(true);
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/${userId}/summary/${status}`;
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
            {/* <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 5 }}>
                <Button variant="contained" color="success" target="_blank" href="https://jeevamrut.in/seller-profile?vendor_id=9">Go To Store<StorefrontIcon /></Button>
            </div> */}
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>DashBoard</h2></center>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total Sales</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total Delivery</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>No Of Orders</TableCell>
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
                        {!(isLoading) ?
                            <TableRow>
                                <TableCell align="center">{orderdata.totalSales == null ? 0 : orderdata.totalSales}</TableCell>
                                <TableCell align="center">{orderdata.totalDelivery == null ? 0 : orderdata.totalDelivery}</TableCell>
                                <TableCell align="center">{orderdata.noOfOrders == null ? 0 : orderdata.noOfOrders}</TableCell>
                                <TableCell align="center">{orderdata.total == null ? 0 : orderdata.total}</TableCell>
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
