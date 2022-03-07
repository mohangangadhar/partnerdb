import React, { useEffect, useState } from 'react'

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useParams } from 'react-router-dom';
import { Box, Grid, Typography } from "@material-ui/core";

import { useSelector, useDispatch } from 'react-redux'

import { APIURL } from '../constants/Constants';

function SeasonalOrders(props) {
    let { id } = useParams();
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [status, setStatus] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchquery, setSearchQuery] = useState(0);
    const [queryLoad, setQueryLoad] = useState(false);
    const [searchOrder, setSearchOrder] = useState({});
    const [isDownloading, setisDownloading] = useState(false);
    const order = useSelector(state => state.expressstatusreducer);
    const dispatch = useDispatch();
    const receivedData = (val, status) => {
        setSearchNotFound(false);
        setRows("");
        setisLoading(true);
        let urlString = "order/seasonal/status/";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageNumber": val,
                "pageSize": 30,
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": startDate,
                "endDate": endDate
            })
        };
        fetch(APIURL + urlString + status, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);

                setisLoading(false);
                if (data.content.length == 0) { setSearchNotFound(true) }
            });

    }

    useEffect(async () => {

        receivedData(0, "all");

    }, []);




    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }


    return (
        <div>
            {isDownloading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Downloading Orders</b>}
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>Seasonal Orders</h2></center>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

                <div>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "all" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "all") { return; }
                        else {
                            setStatus("all");
                            receivedData(0, "all");
                        }

                    }}
                    >ALL</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={order.expressstatus == "new" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (order.expressstatus == "new") { return; }
                        else {
                            setStatus("new");
                            receivedData(0, "new");
                        }
                    }}
                    >New</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={order.expressstatus == "accepted" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (order.expressstatus == "accepted") { return; }
                        else {
                            setStatus("accepted");
                            receivedData(0, "accepted");
                        }

                    }}
                    >Processing</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={order.expressstatus == "prepared" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (order.expressstatus == "prepared") { return; }
                        else {
                            setStatus("prepared");
                            receivedData(0, "prepared");
                        }

                    }}
                    >Out for Delivery</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={order.expressstatus == "pending" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (order.expressstatus == "pending") { return; }
                        else {
                            setStatus("pending");
                            receivedData(0, "pending");
                        }

                    }}
                    >Delivered</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={order.expressstatus == "complete" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (order.expressstatus == "completed") { return; }
                        else {
                            setStatus("completed");
                            receivedData(0, "completed");
                        }

                    }}
                    >Completed</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={order.expressstatus == "cancelled" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (order.expressstatus == "cancelled") { return; }
                        else {
                            setStatus("cancelled");
                            receivedData(0, "cancelled");
                        }

                    }}
                    >Cancelled</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={order.expressstatus == "failed" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (order.expressstatus == "failed") { return; }
                        else {
                            setStatus("failed");
                            receivedData(0, "failed");
                        }
                    }}
                    >Failed</Button>

                </div>
            </div>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Order No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>User Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Order Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Delivery Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total Value</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Link to={{
                                            pathname: '/app/' + props.match.params.vendorId + '/order/' + row.id,
                                            id: row.id
                                        }}>{row.id}</Link>
                                    </TableCell>
                                    <TableCell >{row.user.name}</TableCell>
                                    <TableCell align="center">
                                        {new Date(Date.parse(row.createdAt + " UTC")).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center" >----</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell >{detail(row.vendor.name)}</TableCell>
                                    <TableCell align="center">{row.deliveryStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        :
                        <div>
                            <center>
                                {searchNotFound ? <h1 style={{ color: 'black' }}>No Data</h1> : <CircularProgress />}
                            </center>
                        </div>}
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={(event, value) => {
                        event.preventDefault();
                        receivedData(value - 1, status);
                    }} />
            </Grid>
            <Box m={2} />
        </div>
    )
}

export default SeasonalOrders