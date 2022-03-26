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
import { Box, Grid } from "@material-ui/core";
import Picker from "../components/Picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { useSelector, useDispatch } from 'react-redux'
import setstatus from '../Actions';
import SearchOrders from './SearchOrders';
import { APIURL, GetRequestOptions } from '../constants/Constants';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchOrdersByUserName from './SearchOrdersByUserName';
const OrderList = (props) => {
    let { id } = useParams();
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchquery, setSearchQuery] = useState(0);
    const [queryLoad, setQueryLoad] = useState(false);
    const [isDownloading, setisDownloading] = useState(false);
    const [searchOrder, setSearchOrder] = useState({});
    const [userQueryLoad, setUserQueryLoad] = useState(false);
    const [userSearchData, setUserSearchData] = useState([]);
    const [userName, setUserName] = useState("");
    let order = useSelector(state => state.orderstatusreducer);
    const dispatch = useDispatch();
    useEffect(async () => {
        setisLoading(true);
        if (user && order.status == "") {
            dispatch(setstatus.setstatusvalue(auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? "all" : "accepted"));
            setisLoading(false);
        }
    }, [])
    const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
    const receivedData = async (pageval) => {
        setSearchNotFound(false);
        setQueryLoad(false);
        setUserQueryLoad(false);
        setRows("");
        setUserSearchData([]);
        setSearchOrder({});
        setisLoading(true);
        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === "order"
                ? "order/status/"
                : "vendor/" + props.match.params.vendorId + "/order/"
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageNumber": pageval,
                "pageSize": 30,
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": startDate,
                "endDate": endDate
            })
        };
        await fetch(APIURL + urlString + order.status, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);
                setisLoading(false);
                if (data.content && data.content.length == 0) { setSearchNotFound(true) }
            });

    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {

        if (order.status != "") {
            receivedData(order.page);
        }

    }, [order.status]);

    const handlePageChange = (event, value) => {
        event.preventDefault();
        dispatch(setstatus.setpagevalue(value));
        receivedData(value)
    }
    const downloadCsvFile = async (statusType) => {
        setisDownloading(true);
        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === "order"
                ? `export/status/${statusType}`
                : `export/" + props.match.params.vendorId + "/status/${statusType}`
        }


        fetch(APIURL + urlString, GetRequestOptions)
            .then(response => {
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url
                    a.download = filename;
                    a.click();
                    setisDownloading(false);
                }).catch(err => setisDownloading(false));
            });
    }
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    const handleSearch = async (event, query) => {
        event.preventDefault();
        setUserQueryLoad(false);
        setUserName("");
        setSearchOrder({});
        setRows([]);
        setUserSearchData([]);
        if (query == "" || query == 0) {
            setQueryLoad(false);
            receivedData(order.page);
            return;
        } else if (query.length >= 1) {
            setQueryLoad(true);
            setisLoading(true);
            setSearchNotFound(false);
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            await fetch(apiUrl + 'order/' + query, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setSearchOrder(data);
                    if (data.order == null) { setSearchNotFound(true); setisLoading(false); }
                    setisLoading(false);
                });
        }

    }
    const handleSearchByUserName = async (event) => {
        event.preventDefault();
        setQueryLoad(false);


        if (userName == "" || userName.length == 0) {
            setUserQueryLoad(false);
            receivedData(order.page);
            return;
        } else if (userName.length >= 1) {
            setUserQueryLoad(true);
            setisLoading(true);
            setSearchOrder({});
            setUserSearchData([]);
            setSearchQuery("");
            setRows([]);
            setSearchNotFound(false);
            await fetch(APIURL + 'order/user-name/' + userName, GetRequestOptions)
                .then(response => response.json())
                .then(data => {
                    setUserSearchData(data);

                    if (data.length == 0) { setSearchNotFound(true); setisLoading(false); }
                    setisLoading(false);
                });
        }
    }
    return (
        <div>
            {isDownloading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Downloading Orders</b>}
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>Regular Orders</h2></center>
            <div>
                {queryLoad || userQueryLoad ?
                    <h4 style={{ color: 'white' }}>Clear the Search & Press Search Icon to see Options...</h4>
                    :

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "all" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "all") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("all"));
                            }

                        }}
                        >ALL</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "new" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "new") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("new"));
                            }
                        }}
                        >New</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "accepted" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "accepted") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("accepted"));
                            }

                        }}
                        >Processing</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "prepared" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "prepared") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("prepared"));
                            }

                        }}
                        >Out for Delivery</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "pending" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "pending") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("pending"));
                            }

                        }}
                        >Delivered</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "complete" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "completed") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("complete"));
                            }

                        }}
                        >Completed</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "cancelled" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "cancelled") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("cancelled"));
                            }

                        }}
                        >Cancelled</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={order.status == "failed" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (order.status == "failed") { return; }
                            else {
                                setisLoading(true);
                                dispatch(setstatus.setstatusvalue("failed"));
                            }
                        }}
                        >Failed</Button>
                    </div>
                }
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <SearchOrders setSearchQuery={setSearchQuery} searchquery={searchquery}
                        handleSearch={handleSearch} label="Search By Order ID" />
                    <SearchOrdersByUserName setSearchQuery={setUserName} searchquery={userName} handleSearch={handleSearchByUserName}
                        label="Search By User Name" />
                </div>
            </div>

            <Grid container justifyContent="space-between" component={Paper}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    page={order.page + 1}
                    onChange={(event, value) => handlePageChange(event, value - 1)} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Picker dateChange={(e) => setStartDate(e.target.value)} label={"Start Date"} />
                    <Picker dateChange={(e) => setEndDate(e.target.value)} label={"End Date"} />
                    <FormControl sx={{ m: 1, minWidth: 120 }} >
                        <Select
                            style={{ height: 20, backgroundColor: "blue", color: 'white' }}
                            renderValue={() => {
                                return <em>Download</em>;
                            }}
                            value='Download'
                            onChange={(event) => {
                                downloadCsvFile(event.target.value)
                            }}
                        >
                            <MenuItem value="accepted">
                                Processing
                            </MenuItem>
                            <MenuItem value="complete">Completed</MenuItem>

                            <MenuItem value="pending">Pending</MenuItem>
                        </Select>
                    </FormControl>

                </div>
            </Grid>
            <Box m={1} />

            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Order No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>{auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? "User Name" : "User Id"}</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Order Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Delivery Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Pincode</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total Value</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Coupon Code</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    {queryLoad ?
                        <>
                            {searchOrder.order != null && Object.keys(searchOrder.order).length > 2 && !(isLoading) ?
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Link to={{
                                                pathname: '/app/' + props.match.params.vendorId + '/order/' + searchOrder.order.id,
                                                id: searchOrder.order.id
                                            }}> {searchOrder.order.id}</Link></TableCell>
                                        <TableCell align="center" >{auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? <p>{searchOrder.order.user.id} : {searchOrder.order.user.name} </p> : <p>{searchOrder.order.user.id}</p>}</TableCell>
                                        <TableCell align="center" > {new Date(Date.parse(searchOrder.order.createdAt + " UTC")).toLocaleString()}</TableCell>
                                        <TableCell align="center" >---</TableCell>
                                        <TableCell align="center" >{searchOrder.user.pincode}</TableCell>
                                        <TableCell align="center" >{searchOrder.order.total}</TableCell>
                                        <TableCell align="center" >{detail(searchOrder.order.vendor.name)}</TableCell>
                                        <TableCell align="center" >{searchOrder.order.couponCode}</TableCell>
                                        <TableCell align="center" >{searchOrder.order.deliveryStatus}</TableCell>
                                    </TableRow>
                                </TableBody>
                                :
                                <center>
                                    {searchNotFound ? <h1 style={{ color: 'black' }}>Not Found</h1> : <CircularProgress />}
                                </center>
                            }
                        </>

                        :
                        <>
                            {userQueryLoad ?
                                <TableBody>
                                    {userSearchData.length > 0 && userSearchData.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <Link to={{
                                                    pathname: '/app/' + props.match.params.vendorId + '/order/' + row.id,
                                                    id: row.id
                                                }}>{row.id}</Link>
                                            </TableCell>
                                            <TableCell >{auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? <p>{row.user.id} : {row.user.name} </p> : <p>{row.user.id}</p>}</TableCell>
                                            <TableCell align="center">
                                                {new Date(Date.parse(row.createdAt + " UTC")).toLocaleString()}
                                            </TableCell>
                                            <TableCell align="center" >{row.deliveryDate}</TableCell>
                                            <TableCell align="center" >{row.user.pincode}</TableCell>
                                            <TableCell align="center">{row.total}</TableCell>
                                            <TableCell >{detail(row.vendor.name)}</TableCell>
                                            <TableCell align="center">{row.order.couponCode}</TableCell>
                                            <TableCell align="center">{row.deliveryStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                                :
                                <>
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
                                                    <TableCell >{auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? <p>{row.user.id} : {row.user.name} </p> : <p>{row.user.id}</p>}</TableCell>
                                                    <TableCell align="center">
                                                        {new Date(Date.parse(row.createdAt + " UTC")).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell align="center" >{row.deliveryDate}</TableCell>
                                                    <TableCell align="center" >{row.user.pincode}</TableCell>
                                                    <TableCell align="center">{row.total}</TableCell>
                                                    <TableCell >{detail(row.vendor.name)}</TableCell>
                                                    <TableCell align="center">{row.couponCode}</TableCell>
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
                                </>
                            }
                        </>
                    }
                </Table>

            </TableContainer>
            <Box m={2} />
            {!queryLoad && !userQueryLoad &&
                <Grid container justifyContent={"center"}>
                    <Pagination variant={"text"} color={"primary"}
                        count={totalPages}
                        page={order.page + 1}
                        onChange={(event, value) => handlePageChange(event, value - 1)} />
                </Grid>
            }
            <Box m={2} />
        </div>
    )
}

export default OrderList;
