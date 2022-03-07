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

import { Box, Grid } from "@material-ui/core";

import { APIURL, GetRequestOptions } from '../constants/Constants';

import TableTitles from './Components/TableTitles';
const PaymentReports = () => {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const receivedData = async (pageval) => {
        setSearchNotFound(false);
        setRows("");
        setisLoading(true);
        let urlString = `ecommerce-vendor/paymentreports-page?size=50&page=${pageval}`;
        await fetch(APIURL + urlString, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);
                setisLoading(false);
            }).catch(err => setisLoading(false));
    }

    useEffect(() => {
        receivedData(0);
    }, []);
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <div>
            <center><h2 style={{ marginTop: -9, marginBottom: 0, fontStyle: 'italic', color: 'white' }}>Payment Reports</h2></center>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles />
                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {row.orderType == 0 ? "Regular" : "Express"}</TableCell>
                                    <TableCell align="center">
                                        {detail(row.vendorName)}</TableCell>
                                    <TableCell align="center">
                                        {row.orderDateTime}</TableCell>
                                    <TableCell align="center">
                                        {row.orderId}</TableCell>
                                    <TableCell align="center">
                                        {row.customerId}</TableCell>
                                    <TableCell align="center">
                                        {row.customerName}</TableCell>
                                    <TableCell align="center">
                                        {row.orderStatus}</TableCell>
                                    <TableCell align="center">
                                        {row.productId}</TableCell>
                                    <TableCell align="center">
                                        {detail(row.productName)}</TableCell>
                                    <TableCell align="center">
                                        {row.orderedQuantity}</TableCell>
                                    <TableCell align="center">
                                        {row.unitPrice}</TableCell>
                                    <TableCell align="center">
                                        {row.orderedValue}</TableCell>
                                    <TableCell align="center">
                                        {row.shippingCost}</TableCell>
                                    <TableCell align="center">
                                        {row.deliveredQuantity}</TableCell>
                                    <TableCell align="center">
                                        {row.productQuality}</TableCell>
                                    <TableCell align="center">
                                        {row.refundValue}</TableCell>
                                    <TableCell align="center">
                                        {row.finalOrderValue}</TableCell>
                                    <TableCell align="center">
                                        {row.gstRate}</TableCell>
                                    <TableCell align="center">
                                        {row.finalTaxableValue}</TableCell>
                                    <TableCell align="center">
                                        {row.sellerInvoiceValue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> :
                        <div>
                            <center>
                                <CircularProgress />
                            </center>
                        </div>}
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={(event, value) => receivedData(value - 1)} />
            </Grid>

            <Box m={2} />
        </div>
    )
}
export default PaymentReports;