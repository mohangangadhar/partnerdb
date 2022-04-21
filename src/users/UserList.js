import React, {useState, useEffect} from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import {Box, Button, Grid, Typography} from "@material-ui/core";
import Picker from "../components/Picker";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from 'react-router-dom';
import {auth} from "../firebase";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import SearchProducts from '../products/Components/SearchProducts';
import {APIURL, GetRequestOptions, usersTabData} from '../constants/Constants';
import SearchByUserName from './SearchByUserName';
import LoadUserNameData from './LoadUserNameData';
import LoadUserIdData from './LoadUserIdData';
import TableTitles from '../components/TableTitles/TableTitles';

function UserList(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errFound, setErrFound] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [searchquery, setSearchQuery] = useState("");
    const [queryLoad, setQueryLoad] = useState(false);
    const [userQueryLoad, setUserQueryLoad] = useState(false);
    const [userSearchData, setUserSearchData] = useState([]);
    const [searchOrder, setSearchOrder] = useState({});
    const [searchUserName, setSearchUserName] = useState("");
    const receivedData = async (val) => {
        setisLoading(true);
        setRows([]);
        setUserSearchData([]);
        setSearchOrder({});

        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/user-wallets/page-query?`
        const urlParams = `size=50&sort=id,desc,&page=` + offSet;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch(apiUrl + urlParams, requestOptions)
            .then(response => response.json())
            .then(data => {
                    setRows(data.content);
                    setTotalPages(data.totalPages);
                    setErrFound(false);
                    setisLoading(false);
                }
            ).catch(err => setErrFound(true));
    }

    const [user] = useAuthState(auth);
    const history = useHistory();

    useEffect(async () => {
        receivedData(offSet);
    }, [offSet]);


    const handleButtonClick = () => {
        receivedData()
    }
    const handleSearch = async (event, query) => {
        event.preventDefault();
        setUserQueryLoad(false);
        if (query == "" || query.length == 0) {
            setQueryLoad(false);
            receivedData(offSet);
            return;
        } else if (query.length > 0) {
            setErrFound(false);
            setQueryLoad(true);
            setisLoading(true);

            fetch(APIURL + "user/" + query, GetRequestOptions)
                .then(response => response.json())
                .then(data => {
                    setSearchOrder(data);
                    if (data.id == null) {
                        setErrFound(true);
                        setisLoading(false);
                    }
                    setisLoading(false);
                });
        }
    }
    const handleSearchByUserName = async (event, query) => {
        event.preventDefault();
        setQueryLoad(false);
        if (query == "" || query.length == 0) {
            setUserQueryLoad(false);

            receivedData(offSet);
            return;
        } else if (query.length > 0) {
            setErrFound(false);
            setUserQueryLoad(true);
            setisLoading(true);

            fetch(APIURL + "user/query/" + query, GetRequestOptions)
                .then(response => response.json())
                .then(data => {
                    setUserSearchData(data)
                    console.log(data);
                    if (data.length == 0) {
                        setErrFound(true);
                        setisLoading(false);
                    }
                    setisLoading(false);
                });
        }
    }
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography component="h2" variant="h6" style={{color: 'wheat',}} align={"left"} gutterBottom>
                    Users
                </Typography>
                <SearchByUserName setSearchUserName={setSearchUserName} searchUserName={searchUserName}
                                  handleSearchByUserName={handleSearchByUserName}/>
                <SearchProducts label="Search By Id" setSearchQuery={setSearchQuery} searchquery={searchquery}
                                handleSearch={handleSearch}/>
            </div>

            <Box m={1}/>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles data={usersTabData}/>
                    {userQueryLoad ?
                        <LoadUserNameData errFound={errFound} userSearchData={userSearchData} isLoading={isLoading}/>
                        :
                        <>
                            {queryLoad ?
                                <LoadUserIdData errFound={errFound} userSearchData={searchOrder} isLoading={isLoading}/>
                                :
                                <>
                                    {rows.length >= 0 && !(isLoading) ?
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={row.user.id}>
                                                    <TableCell> {row.user.id} </TableCell>
                                                    <TableCell>{row.user.name}</TableCell>
                                                    <TableCell align="left">{row.user.email}</TableCell>
                                                    <TableCell align="center">{row.user.mobileNumber}</TableCell>
                                                    <TableCell align="center">{row.user.mobileVerified === 1 ? "Yes" : "No"}</TableCell>
                                                    <TableCell align="center">{row.user.altMobileNumber}</TableCell>
                                                    <TableCell align="center">{row.balance}</TableCell>
                                                    <TableCell align="center">{row.user.pincode}</TableCell>
                                                    <TableCell
                                                        align="center">{new Date(Date.parse(row.createdAt + " UTC")).toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody> :
                                        <div>
                                            <center>
                                                {errFound ? <h1 style={{color: 'black'}}>User Not Found</h1> :
                                                    <CircularProgress/>}
                                            </center>
                                        </div>
                                    }
                                </>

                            }
                        </>}
                </Table>
            </TableContainer>
            <Box m={2}/>
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                            count={totalPages}
                            onChange={(event, value) => setOffSet(value - 1)}/>
            </Grid>
            <Box m={2}/>
        </div>
    )
}

export default UserList
