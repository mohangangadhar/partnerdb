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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useParams } from 'react-router-dom';
import { Box, Grid, Typography } from "@material-ui/core";
import Picker from "../components/Picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
function ExpressOrderList(props) {
    let { id } = useParams();
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [status, setStatus] = useState("accepted");
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    let userId;
    useEffect(() => {
        setStatus(props.match.params.vendorId === "order" ? "all" : status);
    }, []);
    const receivedData = (val, perPageVal, statusVal) => {
        setSearchNotFound(false);
        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === "order"
                ? "order/express/status/"
                : "vendor/" + props.match.params.vendorId + "/order/express/"
        } console.log(urlString);
        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
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
        fetch(apiUrl + urlString + statusVal, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);
                console.log(rows, totalPages);
                setisLoading(false);
                if (data.content.length == 0) { setSearchNotFound(true) }
            });

    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(async () => {
        setSearchNotFound(false);
        setRows("");
        // if (status == "all" || status == "") { setPerPage(perPage == 50 ? 10 : 10); console.log("all" + perPage) }
        // else { setPerPage(50); }
        setisLoading(true);
        receivedData(offSet, perPage, status);
    }, [offSet, status, perPage]);



    const downloadCsvFile = () => {

        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = id === "order"
                ? "export/"
                : "export/" + id + "/order/"
        }

        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
        // const apiUrl = `https://localhost:443/`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageNumber": 0, // Offset is default to 0
                "pageSize": 150, // Currently number of records set to 150
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": startDate,
                "endDate": endDate
            })
        };

        fetch(apiUrl + urlString, requestOptions)
            .then(response => {
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
            });
    }
    return (
        <div>
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>Express Orders</h2></center>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <div>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "all" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "all") { return; }
                        else {
                            setisLoading(true);
                            setStatus("all");
                        }

                    }}
                    >ALL</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "new" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "new") { return; }
                        else {
                            setisLoading(true);
                            setStatus("new");
                        }
                    }}
                    >New</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "accepted" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "accepted") { return; }
                        else {
                            setisLoading(true);
                            setStatus("accepted");
                        }

                    }}
                    >Processing</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "prepared" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "prepared") { return; }
                        else {
                            setisLoading(true);
                            setStatus("prepared");
                        }

                    }}
                    >Out for Delivery</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "pending" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "pending") { return; }
                        else {
                            setisLoading(true);
                            setStatus("pending");
                        }

                    }}
                    >Delivered</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "complete" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "completed") { return; }
                        else {
                            setisLoading(true);
                            setStatus("complete");
                        }

                    }}
                    >Completed</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "cancelled" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "cancelled") { return; }
                        else {
                            setisLoading(true);
                            setStatus("cancelled");
                        }

                    }}
                    >Cancelled</Button>
                    <Button style={{ marginRight: 10, color: 'white' }} variant={status == "failed" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (status == "failed") { return; }
                        else {
                            setisLoading(true);
                            setStatus("failed");
                        }
                    }}
                    >Failed</Button>

                </div>
            </div>
            <Grid container justifyContent="flex-end" component={Paper}>
                <Picker dateChange={(e) => setStartDate(e.target.value)} label={"Start Date"} />
                <Picker dateChange={(e) => setEndDate(e.target.value)} label={"End Date"} />
                <Button variant={"contained"} color={"primary"} size={"small"} style={{ marginRight: "5px" }}
                    onClick={() => downloadCsvFile()}>Download</Button>
            </Grid>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                            <TableCell style={{ color: 'wheat' }}>Order No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>User Id</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Order Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Delivery Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total Value</TableCell>
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
                                    <TableCell >{row.userId}</TableCell>
                                    <TableCell align="center">{row.createdAt}</TableCell>
                                    <TableCell align="center" >{row.deliveryDate}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell align="center">{row.deliveryStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        :
                        <div>
                            <center>
                                {searchNotFound ? <h1 style={{ color: 'black' }}>No Data</h1> : <CircularProgress />}
                            </center>
                        </div>
                    }
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={(event, value) => setOffSet(value - 1)} />
            </Grid>
            <Box m={2} />
        </div>
    )
}

export default ExpressOrderList
