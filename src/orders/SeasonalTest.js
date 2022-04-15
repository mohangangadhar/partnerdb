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
import TableTitles from './TableTitles';
import TableTitlesSeasonal from './TableTitlesSeasonal';
import Dropdown from './Components/Dropdown';
const SeasonalTest = (props) => {
    let { id } = useParams();
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [status, setStatus] = useState("all");
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
    const [seasonalPincodes, setSeasonalPincodes] = useState([]);
    const [seasonalDispatch, setSeasonalDispatch] = useState([]);
    const [selectedPincode, setSelectedPincode] = useState("");
    const [userSearchData, setUserSearchData] = useState([]);
    const [userName, setUserName] = useState("");

    const receivedData = async (val, status) => {

        setSearchNotFound(false);
        setQueryLoad(false);
        setUserQueryLoad(false);
        setRows("");
        setUserSearchData([]);
        setSearchOrder({});
        setisLoading(true);
        let urlString = "order/seasonal-orders/status/";

        fetch(APIURL + urlString + status + `?size=20&page=${val} `, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);

                setTotalPages(data.totalPages);

                setisLoading(false);
                if (data.content.length == 0) { setSearchNotFound(true) }
            });

    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    const getPincodes = async () => {
        await fetch(APIURL + "order/seasonal-pincodes", GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setSeasonalPincodes(data);
            }).catch(err => setSeasonalPincodes([]));
    }
    const getDispatchWeek = async () => {
        await fetch(APIURL + "order/seasonal-dispatch-week", GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setSeasonalDispatch(data);
            }).catch(err => setSeasonalPincodes([]));
    }
    useEffect(async () => {

        receivedData(0, "all");
        getPincodes();
        getDispatchWeek();
    }, []);
    const handlePageChange = (event, value) => {
        event.preventDefault();

        receivedData(value, status)
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
            receivedData(0, "all");
            return;
        } else if (query.length >= 1) {
            setQueryLoad(true);
            setisLoading(true);
            setSearchNotFound(false);
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            await fetch(APIURL + 'order/seasonal-order/' + query, requestOptions)
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
        setSelectedPincode("");
        if (userName == "" || userName.length == 0) {
            setUserQueryLoad(false);
            receivedData(0, "all");
            return;
        } else if (userName.length >= 1) {
            setUserQueryLoad(true);
            setisLoading(true);
            setSearchOrder({});
            setUserSearchData([]);
            setSearchQuery("");
            setRows([]);
            setSearchNotFound(false);
            await fetch(APIURL + 'order/seasonal-order/user-name/' + userName, GetRequestOptions)
                .then(response => response.json())
                .then(data => {
                    setUserSearchData(data);

                    if (data.length == 0) { setSearchNotFound(true); setisLoading(false); }
                    setisLoading(false);
                });
        }
    }
    const handleSearchByProductName = async (event) => {
        event.preventDefault();
        setQueryLoad(false);
        setSelectedPincode("");
        if (userName == "" || userName.length == 0) {
            setUserQueryLoad(false);
            receivedData(0, "all");
            return;
        } else if (userName.length >= 1) {
            setUserQueryLoad(true);
            setisLoading(true);
            setSearchOrder({});
            setUserSearchData([]);
            setSearchQuery("");
            setRows([]);
            setSearchNotFound(false);
            await fetch(APIURL + 'order/seasonal-order/product-name/' + userName.toLowerCase(), GetRequestOptions)
                .then(response => response.json())
                .then(data => {
                    setUserSearchData(data);

                    if (data.length == 0) { setSearchNotFound(true); setisLoading(false); }
                    setisLoading(false);
                });
        }
    }
    const handleGetPincodeData = async (event) => {
        event.preventDefault();
        setQueryLoad(false);
        setUserName("");

        if (event.target.value == "all" || event.target.value.length == 0) {
            setUserQueryLoad(false);
            receivedData(0, "all");
            return;
        } else if (event.target.value.length >= 1) {
            setUserQueryLoad(true);
            setisLoading(true);
            setSearchOrder({});
            setUserSearchData([]);
            setSearchQuery("");
            setRows([]);
            setSearchNotFound(false);
            await fetch(APIURL + 'order/seasonal-order/pincode/' + event.target.value, GetRequestOptions)
                .then(response => response.json())
                .then(data => {
                    setUserSearchData(data);

                    if (data.length == 0) { setSearchNotFound(true); setisLoading(false); }
                    setisLoading(false);
                });
        }
    }
    const handleGetDispatchData = async (event) => {
        event.preventDefault();
        setQueryLoad(false);
        setUserName("");

        if (event.target.value == "all" || event.target.value.length == 0) {
            setUserQueryLoad(false);
            receivedData(0, "all");
            return;
        } else if (event.target.value.length >= 1) {
            setUserQueryLoad(true);
            setisLoading(true);
            setSearchOrder({});
            setUserSearchData([]);
            setSearchQuery("");
            setRows([]);
            setSearchNotFound(false);
            await fetch(APIURL + 'order/seasonal-order/dispatch-week/' + event.target.value, GetRequestOptions)
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
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>Seasonal Orders</h2></center>
            <div>
                {queryLoad || userQueryLoad ?
                    <h4 style={{ color: 'white' }}>Clear the Search & Press Search Icon to see Options...</h4>
                    :

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
                        <Button style={{ marginRight: 10, color: 'white' }} variant={status == "new" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (status == "new") { return; }
                            else {
                                setStatus("new");
                                receivedData(0, "new");
                            }
                        }}
                        >New</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={status == "accepted" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (status == "accepted") { return; }
                            else {
                                setStatus("accepted");
                                receivedData(0, "accepted");
                            }

                        }}
                        >Processing</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={status == "prepared" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (status == "prepared") { return; }
                            else {
                                setStatus("prepared");
                                receivedData(0, "prepared");
                            }

                        }}
                        >Out for Delivery</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={status == "pending" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (status == "pending") { return; }
                            else {
                                setStatus("pending");
                                receivedData(0, "pending");
                            }

                        }}
                        >Delivered</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={status == "complete" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (status == "complete") { return; }
                            else {
                                setStatus("complete");
                                receivedData(0, "complete");
                            }

                        }}
                        >Completed</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={status == "cancelled" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (status == "cancelled") { return; }
                            else {
                                setStatus("cancelled");
                                receivedData(0, "cancelled");
                            }

                        }}
                        >Cancelled</Button>
                        <Button style={{ marginRight: 10, color: 'white' }} variant={status == "failed" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                            ev.preventDefault();
                            if (status == "failed") { return; }
                            else {
                                setStatus("failed");
                                receivedData(0, "failed");
                            }
                        }}
                        >Failed</Button>

                    </div>
                }
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <SearchOrders setSearchQuery={setSearchQuery} searchquery={searchquery}
                        handleSearch={handleSearch} label="Search By Order ID" />
                    {seasonalPincodes.length > 0 && <Dropdown data={seasonalPincodes} type="pincode" label="Search Pincode" handleGetPincodeData={handleGetPincodeData} />}
                    {seasonalDispatch.length > 0 && <Dropdown data={seasonalDispatch} type="Dispatch Week" label="Search Dispatch Week" handleGetPincodeData={handleGetDispatchData} />}
                    <SearchOrdersByUserName setSearchQuery={setUserName} searchquery={userName}
                        handleSearch={handleSearchByProductName} label="Search By Product Name" />
                    <SearchOrdersByUserName setSearchQuery={setUserName} searchquery={userName} handleSearch={handleSearchByUserName}
                        label="Search By User Name" />
                </div>
            </div>

            <Grid container justifyContent="space-between" component={Paper}>
                {!queryLoad && !userQueryLoad && <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={(event, value) => handlePageChange(event, value - 1)} />}
            </Grid>
            <Box m={1} />

            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">

                    <TableTitlesSeasonal auth={auth} />

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
                                        <TableCell align="center" >{detail(searchOrder.productName)}</TableCell>
                                        <TableCell align="center" > {new Date(Date.parse(searchOrder.order.createdAt + " UTC")).toLocaleString()}</TableCell>
                                        <TableCell align="center" >{searchOrder.order.dispatchWeek}</TableCell>
                                        <TableCell align="center" >{searchOrder.order.user.pincode}</TableCell>
                                        <TableCell align="center" >{searchOrder.order.total}</TableCell>
                                        <TableCell align="center" >{detail(searchOrder.order.vendor.name)}</TableCell>
                                        <TableCell align="center" >{searchOrder.order.finalTotal == 0 ? searchOrder.order.total : searchOrder.order.finalTotal}</TableCell>
                                        <TableCell align="center" >{searchOrder.paymentMethod}</TableCell>
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
                                <>
                                    {isLoading ?

                                        <CircularProgress />
                                        :
                                        <TableBody>
                                            {userSearchData.length > 0 && userSearchData.map((row, index) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>
                                                        <Link to={{
                                                            pathname: '/app/' + props.match.params.vendorId + '/order/' + row.order.id,
                                                            id: row.order.id
                                                        }}>{row.order.id}</Link>
                                                    </TableCell>
                                                    <TableCell >{auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? <p>{row.order.user.id} : {row.order.user.name} </p> : <p>{row.order.user.id}</p>}</TableCell>
                                                    <TableCell align="center" >{detail(row.productName)}</TableCell>
                                                    <TableCell align="center">
                                                        {new Date(Date.parse(row.order.createdAt + " UTC")).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell align="center" >{row.order.dispatchWeek}</TableCell>
                                                    <TableCell align="center" >{row.order.user.pincode}</TableCell>
                                                    <TableCell align="center">{row.order.total}</TableCell>
                                                    <TableCell >{detail(row.order.vendor.name)}</TableCell>
                                                    <TableCell align="center">{row.order.finalTotal == 0 ? row.order.total : row.order.finalTotal}</TableCell>
                                                    <TableCell align="center">{row.paymentMethod}</TableCell>
                                                    <TableCell align="center">{row.order.couponCode}</TableCell>
                                                    <TableCell align="center">{row.order.deliveryStatus}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    }
                                </>

                                :
                                <>
                                    {rows.length > 0 && !(isLoading) ?
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={row.order.id}>
                                                    <TableCell>
                                                        <Link to={{
                                                            pathname: '/app/' + props.match.params.vendorId + '/order/' + row.order.id,
                                                            id: row.order.id
                                                        }}>{row.order.id}</Link>
                                                    </TableCell>
                                                    <TableCell >{auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? <p>{row.order.user.id} : {row.order.user.name} </p> : <p>{row.order.user.id}</p>}</TableCell>
                                                    <TableCell align="center" >{detail(row.productName)}</TableCell>
                                                    <TableCell align="center">
                                                        {new Date(Date.parse(row.order.createdAt + " UTC")).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell align="center" >{row.order.dispatchWeek}</TableCell>
                                                    <TableCell align="center" >{row.order.user.pincode}</TableCell>
                                                    <TableCell align="center">{row.order.total}</TableCell>
                                                    <TableCell >{detail(row.order.vendor.name)}</TableCell>
                                                    <TableCell align="center">{row.order.finalTotal == 0 ? row.order.total : row.order.finalTotal}</TableCell>
                                                    <TableCell align="center" >{row.paymentMethod}</TableCell>
                                                    <TableCell align="center">{row.order.couponCode}</TableCell>
                                                    <TableCell align="center">{row.order.deliveryStatus}</TableCell>
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

                        onChange={(event, value) => handlePageChange(event, value - 1)} />
                </Grid>
            }
            <Box m={2} />
        </div>
    )
}

export default SeasonalTest;
