import React, { useState, useEffect } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import Picker from "../components/Picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
function UserList(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const receivedData = (val) => {
        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageNumber": offSet,
                "pageSize": perPage,
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": startDate,
                "endDate": endDate
            })
        };

        fetch(apiUrl + 'user/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);
                setisLoading(false);
            });

        console.log(rows, totalPages);
    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(async () => {
        setisLoading(true);
        receivedData(offSet);
    }, [offSet]);


    const handleButtonClick = () => {
        receivedData()
    }

    return (
        <div>
            <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                Users
            </Typography>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                            <TableCell style={{ color: 'wheat' }}>User Id</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Name</TableCell>
                            <TableCell align="left" style={{ color: 'wheat' }}>Email</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Mobile</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Verified</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Created</TableCell>

                        </TableRow>
                    </TableHead>
                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {/*<Link to={{*/}
                                        {/*    pathname: '/app/'+this.props.match.params.vendorId+'/order/'+row.id,*/}
                                        {/*    id: row.id*/}
                                        {/*}}>*/}
                                        {row.id}
                                        {/*</Link>*/}
                                    </TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="center">{row.mobileNumber}</TableCell>
                                    <TableCell align="center">{row.mobileVerified === 1 ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">{row.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> :
                        <div>
                            <center>
                                <CircularProgress />
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

export default UserList
