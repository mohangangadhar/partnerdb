import React, { useEffect, useState } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import Picker from "../components/Picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
function OrderList(props) {
    let { id } = useParams();
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const handlePageClick = (event, value) => {
        value = value - 1 < 0 ? 0 : value - 1
        setOffSet(value);
        receivedData();
    };
    const receivedData = () => {
        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === "order"
                ? "order/"
                : "vendor/" + props.match.params.vendorId + "/order/"
        } console.log(urlString);
        const apiUrl = `https://www.alfanzo.com:443/`
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

        fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);
            });
        console.log(rows, totalPages);
    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(async () => {
        if (!user) {
            console.log(user);
            history.replace("/");
        }
        receivedData()
    }, []);


    const handleButtonClick = () => {
        receivedData()
    }

    const downloadCsvFile = () => {

        let urlString;
        if (this.props.match.params.hasOwnProperty("vendorId")) {
            urlString = id === "order"
                ? "export/"
                : "export/" + id + "/order/"
        }

        const apiUrl = `https://www.alfanzo.com:443/`
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
            <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                Orders
            </Typography>
            <Grid container justifyContent="flex-end" component={Paper}>
                <Picker dateChange={(e) => setStartDate(e.target.value)} label={"Start Date"} />
                <Picker dateChange={(e) => setEndDate(e.target.value)} label={"End Date"} />
                <Button variant={"contained"} color={"primary"} size={"small"} style={{ marginRight: "5px" }}
                    onClick={() => handleButtonClick()}>Show</Button>
                <ArrowDownwardOutlinedIcon fontSize={"large"} style={{ marginRight: "5px" }}
                    onClick={() => downloadCsvFile()} />
            </Grid>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                            <TableCell style={{ color: 'wheat' }}>Order No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>User Id</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                {/*<TableCell align="left">{index + 1}</TableCell>*/}
                                <TableCell>
                                    <Link to={{
                                        pathname: '/app/' + props.match.params.vendorId + '/order/' + row.id,
                                        id: row.id
                                    }}>{row.id}</Link>
                                </TableCell>
                                <TableCell >{row.userId}</TableCell>
                                <TableCell align="center">{row.createdAt}</TableCell>
                                <TableCell align="center">{row.total}</TableCell>
                                <TableCell align="center">{row.deliveryStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={() => handlePageClick()} />
            </Grid>
            <Box m={2} />
        </div>
    )
}

export default OrderList
