import React, { useEffect, useState } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';

import CircularProgress from '@mui/material/CircularProgress';

import { Box, Grid } from "@material-ui/core";

import { APIURL, GetRequestOptions, paymentReportsTabData } from '../constants/Constants';

import ReadOnlyRow from './Components/ReadOnlyRow';
import EditableRow from './Components/EditableRow';
import TableTitles from '../components/TableTitles/TableTitles';
const PaymentReports = () => {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [editContactId, setEditContactId] = useState(-1);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [addFormData, setAddFormData] = useState({
        orderId: 0,
        sellerInvoice: "",
        paymentDate: "2021-10-09 09:31:22",
        paymentRefNumber: "",
        poNumber: 0,
        invoiceNumber: 0,
        productId: 0
    })
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

        setAddFormData({
            orderId: row.orderId,
            sellerInvoice: row.sellerInvoice,
            paymentDate: row.paymentDate,
            paymentRefNumber: row.paymentRefNumber,
            poNumber: row.poNumber,
            invoiceNumber: row.invoiceNumber,
            productId: row.productId
        });
        setEditContactId(index);
    }
    const uploadBackEnd = async (xyz, formData) => {
        setisApiLoading(true);
        let urlString = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/payment-reports-status/${xyz.orderId}`;
        let updateBody = {
            "orderId": xyz.orderId,
            "sellerInvoice": xyz.sellerInvoice,
            "paymentDate": xyz.paymentDate,
            "paymentRefNumber": xyz.paymentRefNumber,
            "poNumber": xyz.poNumber,
            "invoiceNumber": xyz.invoiceNumber,
            "productId": xyz.productId
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateBody)
        };
        await fetch(urlString, requestOptions).then(response => response.json()).then(data => {
            setisApiLoading(false);
        }).catch(err => setisApiLoading(false));
    }
    const handleFormSubmit = (event, data, tempFormData, index) => {
        event.preventDefault();
        console.log(tempFormData);
        setAddFormData("");
        var currentdate = new Date();
        var datetime =
            currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
            + " " + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        let xyz = { ...data };
        console.log(datetime);
        xyz.sellerInvoice = tempFormData.sellerInvoice == null ? "" : tempFormData.sellerInvoice;
        xyz.paymentDate = tempFormData.paymentDate == null ? datetime : tempFormData.paymentDate;
        xyz.paymentRefNumber = tempFormData.paymentRefNumber == null ? "" : tempFormData.paymentRefNumber;
        xyz.poNumber = tempFormData.poNumber == null ? "" : tempFormData.poNumber;
        xyz.invoiceNumber = tempFormData.invoiceNumber == null ? "" : tempFormData.invoiceNumber;
        rows[index] = xyz;
        setEditContactId(null);
        uploadBackEnd(xyz, tempFormData);
    }
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <center><h2 style={{ marginTop: -9, marginBottom: 0, fontStyle: 'italic', color: 'white' }}>Payment Reports</h2></center>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles data={paymentReportsTabData} />
                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <>
                                    {editContactId === index ? (
                                        <EditableRow row={row} index={index} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />) :
                                        <ReadOnlyRow row={row} index={index} addFormData={addFormData} handleEditClick={handleEditClick} />}
                                </>
                            ))} :
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