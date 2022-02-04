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
    const [newCount, setNewCount] = useState("");
    const [processingCount, setProcessingCount] = useState("");
    const [pendingCount, setPendingCount] = useState("");
    const [completeCount, setCompleteCount] = useState("");
    const [cancelCount, setCancelCount] = useState("");
    const [total, setTotal] = useState(0);
    const [revenueTotal, setRevenueTotal] = useState(0);
    let vendorName = Constants.NAMES.get(userId);
    console.log(vendorName);
    useEffect(() => {
        let apiUrl;
        setSearchNotFound(false);
        setisLoading(true);
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/vendor/${userId}/report`;
        console.log(apiUrl);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {

                setOrderData(data);
                setNewCount(data.filter(data => data.deliveryStatus == "new"));
                setProcessingCount(data.filter(data => data.deliveryStatus == "accepted"));
                setPendingCount(data.filter(data => data.deliveryStatus == "pending"));
                setCompleteCount(data.filter(data => data.deliveryStatus == "complete"));
                setCancelCount(data.filter(data => data.deliveryStatus == "cancelled"));
                let finTotal = 0;
                let finrevenueTotal = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].deliveryStatus == "cancelled"
                        || data[i].deliveryStatus == "failed") {
                        continue;
                    }
                    finTotal += data[i].noOfOrders;
                    finrevenueTotal += data[i].total;
                }
                setTotal(finTotal);
                setRevenueTotal(finrevenueTotal);
                setisLoading(false);
            }
            );
    }, []);
    return (
        <div>
            {/* <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 5 }}>
                <Button variant="contained" color="success" target="_blank" href="https://jeevamrut.in/seller-profile?vendor_id=9">Go To Store<StorefrontIcon /></Button>
            </div> */}
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>DashBoard</h2></center>
            <h3 style={{ marginTop: -9, marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Orders :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!(isLoading) ?
                            <TableRow>
                                <TableCell align="center">{newCount.length >= 1 ? newCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{processingCount.length >= 1 ? processingCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{completeCount.length >= 1 ? completeCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{pendingCount.length >= 1 ? pendingCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{cancelCount.length >= 1 ? cancelCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{

                                    total
                                }</TableCell>
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
            <h3 style={{ marginTop: 5, marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Revenue :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!(isLoading) ?
                            <TableRow>
                                <TableCell align="center">{newCount.length >= 1 ? newCount[0].total : 0}</TableCell>
                                <TableCell align="center">{processingCount.length >= 1 ? processingCount[0].total : 0}</TableCell>
                                <TableCell align="center">{completeCount.length >= 1 ? completeCount[0].total : 0}</TableCell>
                                <TableCell align="center">{pendingCount.length >= 1 ? pendingCount[0].total : 0}</TableCell>
                                <TableCell align="center">{cancelCount.length >= 1 ? cancelCount[0].total : 0}</TableCell>
                                <TableCell align="center">{
                                    revenueTotal
                                }</TableCell>
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
