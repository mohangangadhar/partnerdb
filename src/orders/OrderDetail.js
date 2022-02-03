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
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Divider, FormLabel, Button } from "@material-ui/core";
import { Item } from "../components/Item";
import Invoice from '../components/Invoice';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
function OrderDetail(props) {
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState("");
    const [orderProductList, setOrderProductList] = useState([]);
    const [userData, setUserData] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const [editContactId, setEditContactId] = useState(null);
    const [addFormData, setAddFormData] = useState({
        quantity: 0,
    });
    const [user] = useAuthState(auth);
    const history = useHistory();

    let userId = auth.currentUser.uid;

    useEffect(() => {
        if (auth.user) {
            userId = auth.currentUser.uid;
        }
        let apiUrl;
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`;
        console.log(props.location.id);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl + 'order/' + props.location.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrder(data.order);
                setOrderProductList(data.orderProductList);
                setUserData(data.user);
            }
            );
    }, [isLoading]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(status);
        let orderdata = {
            "id": order.id,
            "status": status.toString()
        };
        let apiUrl;
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/status`;
        console.log(props.match.params.productId);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderdata)
        };
        await fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                // setisLoading(false);
            }
            ).then(
                history.goBack
            );
    }
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };
    const handleEditClick = (event, row, index) => {
        event.preventDefault();
        setEditContactId(index);
    }

    const handleFormSubmit = async (event, row) => {
        event.preventDefault();
        setEditContactId(null);
    }
    let total = 0;

    if (orderProductList.length > 0) {
        orderProductList.forEach(row => total = row.total + total)
    }
    return (
        <div>
            {Object.keys(order).length > 2 && !(isLoading) ?
                <Container maxWidth="md" fixed={false}>
                    <Table className="table" aria-label="spanning table">
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    <Item />
                                </TableCell>
                                <TableCell>
                                    <FormLabel style={{ color: 'wheat' }}> Order No : {props.location.id} </FormLabel>
                                </TableCell>
                                <TableCell>
                                    <FormLabel style={{ color: 'wheat' }}>Date: {order.createdAt} </FormLabel>
                                </TableCell>
                                <TableCell>
                                    <FormLabel style={{ color: 'wheat' }}>Current Status: {order.deliveryStatus} </FormLabel>
                                </TableCell>
                                <TableCell>
                                    {userId == "GHS5sVHoRShSE2KmLtvVCGue8X82" ?
                                        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Enter Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-disabled"
                                                value={status}
                                                onChange={(event) => setStatus(event.target.value)}
                                                label="Enter Status"
                                            >
                                                <MenuItem value="accepted">
                                                    Accepted
                                                </MenuItem>
                                                <MenuItem value="prepared">
                                                    Out For Delivery
                                                </MenuItem>
                                                <MenuItem value="cancelled">Cancelled</MenuItem>
                                                <MenuItem value="failed">Failed</MenuItem>
                                                <MenuItem value="pending">Pending</MenuItem>
                                            </Select>
                                        </FormControl> :
                                        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Enter Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-disabled"
                                                value={status}
                                                onChange={(event) => setStatus(event.target.value)}
                                                label="Enter Status"
                                            >
                                                <MenuItem value="prepared">
                                                    Out For Delivery
                                                </MenuItem>
                                                <MenuItem value="Order Received">Order Received</MenuItem>
                                                <MenuItem value="cancelled">Cancelled</MenuItem>
                                            </Select>
                                        </FormControl>
                                    }
                                </TableCell>
                            </TableRow>
                            {userId == "GHS5sVHoRShSE2KmLtvVCGue8X82" &&
                                <TableRow style={{}}>
                                    <TableCell>
                                        <FormLabel style={{ color: 'wheat' }}> Name : {userData.name} </FormLabel>
                                    </TableCell>
                                    <TableCell>
                                        <FormLabel style={{ color: 'wheat' }}> Mobile : {userData.mobileNumber} </FormLabel>
                                    </TableCell>
                                    <TableCell>
                                        <FormLabel style={{ color: 'wheat' }}> Email : {userData.email} </FormLabel>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableHead>
                    </Table>
                </Container>
                :
                <center>
                    <CircularProgress />
                </center>
            }
            <Divider />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Sl.No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Desc</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Qty</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Unit Cost</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Delivered Quantity</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderProductList.length > 0 ? orderProductList.map((row, index) => (
                            <Fragment>
                                {editContactId === index ? (
                                    <EditableRow row={row} index={index} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />) :
                                    <ReadOnlyRow row={row} index={index} addFormData={addFormData} handleEditClick={handleEditClick} />}
                            </Fragment>
                        )) : <TableRow> <TableCell align="center" colSpan={4}>No Data Found</TableCell> </TableRow>}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Container style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                <Button variant='contained' color="success" onClick={(ev) => {
                    setisLoading(true);
                    handleSubmit(ev);
                }}
                >Submit</Button>
            </Container>
            {Object.keys(order).length > 2 && !(isLoading) ?
                <div>
                    <PDFDownloadLink document={<Invoice order={order} orderProductList={orderProductList}
                        userData={userData} userId={userId} />} fileName={order.id}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading...' : <Button variant='contained' color="success">Generate Invoice</Button>)}
                    </PDFDownloadLink>
                </div> : <b>""</b>
            }
        </div >
    )
}

export default OrderDetail
