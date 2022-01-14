import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import Picker from "../components/Picker";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

function DetailOrderList() {

    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [pagination, setPagination] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const handlePageClick = (event, value) => {
        setPage(value);
        receivedData();
    };
    const receivedData = () => {
        let urlString = `?page=` + page + `&perPage=` + perPage;

        // if (this.props.match.params.hasOwnProperty("vendorId")) {
        //     urlString = this.props.match.params.vendorId === "order"
        //         ? "order/"
        //         : "vendor/" + this.props.match.params.vendorId + "/order/"
        // }

        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/fb`
        //        const apiUrl = `https://localhost:443/order/fb`
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(resp => {
                setRows(resp.data);
                setPagination(resp.meta);
                console.log(rows);
            });
    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(async () => {
        if (!user) {
            history.replace("/");
        }
        receivedData()
    }, []);
    // setStartDate(e) {
    //     this.setState({startDate: e.target.value})
    // }

    // setEndDate(e) {
    //     this.setState({endDate: e.target.value})
    // }

    const handleButtonClick = () => {
        receivedData()
    }
    return (
        <div>
            <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                Detail Orders
            </Typography>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Order No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Delivery</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Payment GW </TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Payment Status </TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Order Status </TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Vendor </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.user.name}</TableCell>
                                <TableCell align="center">{row.created_at.substring(0, 10)}</TableCell>
                                <TableCell align="center">{row.total}</TableCell>
                                <TableCell align="center">{row.delivery_fee}</TableCell>
                                <TableCell align="center">{row.payment.payment_method.title}</TableCell>
                                <TableCell align="center">{row.payment.status}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">{row.vendor.name.substring(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={pagination.last_page}
                    onChange={handlePageClick} />
            </Grid>
            <Box m={2} />
        </div>
    )
}

export default DetailOrderList;
