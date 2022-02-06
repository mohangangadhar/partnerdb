import React, { Fragment, useEffect, useState } from 'react'
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
import { VENDORNAMES } from "../constants/Constants";
import AdminData from './AdminData';
import RevenueData from './RevenueData';
function DashBoard() {
    const [bigData, setBigData] = useState([]);
    const [orderdata, setOrderData] = useState([]);
    const [status, setStatus] = useState("Prachin");
    const [orderStatus, setOrderStatus] = useState("new");
    const [statusOrders, setStatusOrders] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [newCount, setNewCount] = useState("");
    const [processingCount, setProcessingCount] = useState("");
    const [pendingCount, setPendingCount] = useState("");
    const [completeCount, setCompleteCount] = useState("");
    const [cancelCount, setCancelCount] = useState("");
    const [total, setTotal] = useState(0);
    const [revenueTotal, setRevenueTotal] = useState(0);
    const [newOrdersData, setNewOrdersData] = useState(0);
    const [newTotalData, setNewTotalData] = useState(0);
    const [processingOrdersData, setProcessingOrdersData] = useState(0);
    const [processingTotalData, setProcessingTotalData] = useState(0);
    const [pendingOrdersData, setPendingOrdersData] = useState(0);
    const [pendingTotalData, setPendingTotalData] = useState(0);
    const [completeOrdersData, setCompleteOrdersData] = useState(0);
    const [completeTotalData, setCompleteTotalData] = useState(0);
    const [cancelOrdersData, setCancelOrdersData] = useState(0);
    const [cancelTotalData, setCancelTotalData] = useState(0);

    const [totalOrdersData, setTotalOrdersData] = useState(0);
    const [totalRevenueData, setTotalRevenueData] = useState(0);
    const RequestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    const vendorOrderStyle = {
        color: 'white',
        marginBottom: -2,
        textAlign: 'left'
    }
    const vendorTitleStyle =
        { color: 'white', fontStyle: 'italic', textDecoration: 'underline' };
    const vendorRow = {
        borderColor: 'black',
        borderWidth: '20'
    };

    const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/vendor/report`;

    const getData = async (ordStatus) => {
        let tempNew = 0;
        await fetch(apiUrl, RequestOptions)
            .then(response => response.json())
            .then(data => {
                switch (ordStatus) {
                    case "new":
                        tempNew = data.filter(data => data.deliveryStatus == "new");
                        for (let i = 0; i < tempNew.length; i++) {
                            setNewOrdersData(prev => prev + tempNew[i].noOfOrders);
                            setNewTotalData(prev => prev + tempNew[i].total);
                        }
                        break;
                    case "processing":
                        tempNew = data.filter(data => data.deliveryStatus == "accepted");
                        for (let i = 0; i < tempNew.length; i++) {
                            setProcessingOrdersData(prev => prev + tempNew[i].noOfOrders);
                            setProcessingTotalData(prev => prev + tempNew[i].total);
                        }
                        break;
                    case "cancelled":
                        tempNew = data.filter(data => data.deliveryStatus == "cancelled");
                        for (let i = 0; i < tempNew.length; i++) {
                            setCancelOrdersData(prev => prev + tempNew[i].noOfOrders);
                            setCancelTotalData(prev => prev + tempNew[i].total);
                        }
                        break;
                    case "pending":
                        tempNew = data.filter(data => data.deliveryStatus == "pending");
                        for (let i = 0; i < tempNew.length; i++) {
                            setPendingOrdersData(prev => prev + tempNew[i].noOfOrders);
                            setPendingTotalData(prev => prev + tempNew[i].total);
                        }
                        break;
                    case "complete":
                        tempNew = data.filter(data => data.deliveryStatus == "complete");
                        for (let i = 0; i < tempNew.length; i++) {
                            setCompleteOrdersData(prev => prev + tempNew[i].noOfOrders);
                            setCompleteTotalData(prev => prev + tempNew[i].total);
                        }
                        break;
                }
            });
    }
    useEffect(async () => {
        const ordStatus = ["new", "processing", "pending", "cancelled", "complete"];
        setisLoading(true);
        for (let i = 0; i < ordStatus.length; i++) {
            getData(ordStatus[i]);
        }
    }, []);

    useEffect(async () => {
        console.log("st");
        await fetch(apiUrl, RequestOptions)
            .then(response => response.json())
            .then(data => {
                let statusChangeData = data.filter(data => data.vendorName == status);
                setBigData(data);
                console.log(data.filter(data => data.vendorName == status));
                setOrderData(data.filter(data => data.vendorName == status));
                setNewCount(statusChangeData.filter(data => data.deliveryStatus == "new"));
                setProcessingCount(statusChangeData.filter(data => data.deliveryStatus == "accepted"));
                setPendingCount(statusChangeData.filter(data => data.deliveryStatus == "pending"));
                setCompleteCount(statusChangeData.filter(data => data.deliveryStatus == "complete"));
                setCancelCount(statusChangeData.filter(data => data.deliveryStatus == "cancelled"));
                let finTotal = 0;
                let finrevenueTotal = 0;
                for (let i = 0; i < statusChangeData.length; i++) {
                    if (statusChangeData[i].deliveryStatus == "cancelled"
                        || statusChangeData[i].deliveryStatus == "failed") {
                        continue;
                    }
                    finTotal += statusChangeData[i].noOfOrders;
                    finrevenueTotal += statusChangeData[i].total;
                }
                setTotal(finTotal);
                setRevenueTotal(finrevenueTotal);
                setisLoading(false);
            }
            );
    }, [status]);

    return (
        <div>
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>DashBoard</h2></center>
            <h3 style={{ marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Orders Summary:</h3>
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
                        {orderdata.length > 1 && !(isLoading) ?
                            <TableRow >
                                <TableCell align="center">{newOrdersData != 0 ? newOrdersData : 0}</TableCell>
                                <TableCell align="center">{processingOrdersData != 0 ? processingOrdersData : 0}</TableCell>
                                <TableCell align="center">{completeOrdersData != 0 ? completeOrdersData : 0}</TableCell>
                                <TableCell align="center">{pendingOrdersData != 0 ? pendingOrdersData : 0}</TableCell>
                                <TableCell align="center">{cancelOrdersData != 0 ? cancelOrdersData : 0}</TableCell>
                                <TableCell align="center">{
                                    newOrdersData + processingOrdersData + completeOrdersData + pendingOrdersData
                                }</TableCell>
                            </TableRow>
                            : <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Revenue Summary:</h3>
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
                        {orderdata.length > 1 && !(isLoading) ?
                            <TableRow >
                                <TableCell align="center">{newTotalData != 0 ? newTotalData : 0}</TableCell>
                                <TableCell align="center">{processingTotalData != 0 ? processingTotalData : 0}</TableCell>
                                <TableCell align="center">{completeTotalData != 0 ? completeTotalData : 0}</TableCell>
                                <TableCell align="center">{pendingTotalData != 0 ? pendingTotalData : 0}</TableCell>
                                <TableCell align="center">{cancelTotalData != 0 ? cancelTotalData : 0}</TableCell>
                                <TableCell align="center">{
                                    newTotalData + processingTotalData + completeTotalData + pendingTotalData
                                }</TableCell>
                            </TableRow>
                            : <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Orders :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Vendor</InputLabel>
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
                                        <MenuItem value="Prachin">
                                            Prachin
                                        </MenuItem>
                                        <MenuItem value="Timios">Timios</MenuItem>
                                        <MenuItem value="Jeevamrut Foods">Jeevamrut Foods</MenuItem>
                                        <MenuItem value="Organic India">Organic India</MenuItem>
                                        <MenuItem value="Back To Roots">Back To Roots</MenuItem>
                                        <MenuItem value="Amruthaahaara">Amruthaahaara</MenuItem>
                                        <MenuItem value="Karshaka">Karshaka</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderdata.length > 1 && !(isLoading) ?
                            <TableRow >
                                <TableCell align="center">{status}</TableCell>
                                <TableCell align="center">{newCount.length >= 1 ? newCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{processingCount.length >= 1 ? processingCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{completeCount.length >= 1 ? completeCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{pendingCount.length >= 1 ? pendingCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{cancelCount.length >= 1 ? cancelCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{

                                    total
                                }</TableCell>
                            </TableRow>
                            : <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3 style={{ marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Revenue :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Vendor</InputLabel>
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
                                        <MenuItem value="Prachin">
                                            Prachin
                                        </MenuItem>
                                        <MenuItem value="Timios">Timios</MenuItem>
                                        <MenuItem value="Jeevamrut Foods">Jeevamrut Foods</MenuItem>
                                        <MenuItem value="Organic India">Organic India</MenuItem>
                                        <MenuItem value="Back To Roots">Back To Roots</MenuItem>
                                        <MenuItem value="Amruthaahaara">Amruthaahaara</MenuItem>
                                        <MenuItem value="Karshaka">Karshaka</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderdata.length > 1 && !(isLoading) ?
                            <TableRow >
                                <TableCell align="center">{status}</TableCell>
                                <TableCell align="center">{newCount.length >= 1 ? newCount[0].total : 0}</TableCell>
                                <TableCell align="center">{processingCount.length >= 1 ? processingCount[0].total : 0}</TableCell>
                                <TableCell align="center">{completeCount.length >= 1 ? completeCount[0].total : 0}</TableCell>
                                <TableCell align="center">{pendingCount.length >= 1 ? pendingCount[0].total : 0}</TableCell>
                                <TableCell align="center">{cancelCount.length >= 1 ? cancelCount[0].total : 0}</TableCell>
                                <TableCell align="center">{
                                    revenueTotal
                                }</TableCell>
                            </TableRow>
                            : <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* {orderdata.length > 2 && !(isLoading) ?
                <AdminData data={orderdata} /> : <b>...</b>} */}

        </div >
    )
}

export default DashBoard
