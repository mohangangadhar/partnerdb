import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from "react-router-dom";
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
import { v4 as uuidv4 } from "uuid";
import { NotificationManager } from "react-notifications";
import { auth } from "../firebase";

import { APIURL, getRandom, GetRequestOptions, poReportsTabData } from '../constants/Constants';
import ReadOnlyRow from './Components/ReadOnlyRow';
import EditableRow from './Components/EditableRow';
import SearchBySupplier from './Components/SearchBySupplier';
import AddPoData from './Components/AddPoData';
import GetDate from '../components/GetDate';
import TableTitles from '../components/TableTitles/TableTitles';
import Picker from '../components/Picker';
import { Item } from '../components/Item';

function PoReports(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);

    const [errFound, setErrFound] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [recentPoId, setRecentPoId] = useState({
        poId: "",
        createdAt: ""
    });
    const [editContactId, setEditContactId] = useState(null);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [addFormData, setAddFormData] = useState({
        receivedQty: 0.0,
        wastageQty: 0.0,
        qualityRating: 0,
        missedQty: 0.0,
        comments: "",
        totalPay: 0.0
    });
    const [poSummary, setPoSummary] = useState("");
    const { poNumber } = useParams();

    const getPoSummary = async (sum) => {

        await fetch(APIURL + "po-report-info/po-number/" + poNumber, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPoSummary(data);
                let reqBody = {
                    "active": 1,
                    "paymentStatus": "",
                    "actualTotal": sum,
                    "poType": "",
                    "poStatus": "",
                    "comments": "",
                    "poReceivedDate": ""
                }

                const requestOptionsForUpdate = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reqBody)
                };

                fetch(APIURL + 'po-report-info/' + data.id, requestOptionsForUpdate)
                    .then(response => {
                        setisApiLoading(false);
                    }
                    ).catch((err) => setisApiLoading(false));
                setisLoading(false);
            }).catch(err => setPoSummary({}));

    }

    const getActualPay = (list) => {
        let sum = 0;

        list.map((row) => {
            if (row.receivedQty > 0) {
                sum += (row.receivedQty - row.wastageQty) * row.totalPay;
            }
            else {
                sum += row.orderedQty * row.totalPay;
            }
        })
        getPoSummary(sum);
    }
    const getLatestReport = async () => {

        setisLoading(true);
        setRows([]);
        await fetch(APIURL + `suppy-planning-snapshot/po-number/${poNumber}`, GetRequestOptions)
            .then(response => response.json())
            .then(data => {

                setRows(data);
                getActualPay(data);

            }).catch(err => { console.log(err); setisLoading(false); })


    }
    useEffect(async () => {
        getLatestReport();
    }, []);
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };
    const handleEditClick = (event, row) => {
        event.preventDefault();
        console.log(row.status);
        setAddFormData({
            receivedQty: row.receivedQty,
            wastageQty: row.wastageQty,
            qualityRating: row.qualityRating,
            missedQty: row.missedQty,
            totalPay: row.totalPay,
            comments: row.comments
        });
        setEditContactId(row.id);
    }
    const uploadBackEnd = async (row, tempFormData) => {

        let urlString = `suppy-planning-snapshot/${row.id}`;
        let supportData = {
            receivedQty: tempFormData.receivedQty > 0 ? tempFormData.receivedQty : 0,
            wastageQty: tempFormData.wastageQty > 0 ? tempFormData.wastageQty : 0,
            qualityRating: tempFormData.qualityRating,
            updatedAt: GetDate(),
            missedQty: tempFormData.receivedQty - tempFormData.wastageQty,
            comments: tempFormData.comments == null ? "" : tempFormData.comments,
            totalPay: tempFormData.totalPay
        };

        setisApiLoading(true);


        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(supportData)
        };
        await fetch(APIURL + urlString, requestOptionsForUpdate)
            .then(response => response.json())
            .then(data => {
                setisApiLoading(false);
                console.log(data);
            }
            ).catch((err) => alert('something wrong' + err));
    }
    const handleFormSubmit = async (event, row, tempFormData) => {
        event.preventDefault();
        setAddFormData("");

        let ind;
        let xyz = row;
        xyz = { ...xyz };
        xyz.receivedQty = tempFormData.receivedQty;
        xyz.wastageQty = tempFormData.wastageQty;
        xyz.qualityRating = tempFormData.qualityRating;
        xyz.missedQty = tempFormData.receivedQty - tempFormData.wastageQty;
        xyz.totalPay = tempFormData.totalPay;
        xyz.comments = tempFormData.comments;
        for (let i = 0; i < rows.length; i++) {
            if (row.id == rows[i].id) {
                ind = i;
                break;
            }
        }
        rows[ind] = xyz;
        getActualPay(rows);
        setEditContactId(null);
        uploadBackEnd(row, tempFormData);
    }
    const getTotalCost = (list) => {
        let sum = 0;

        list.map((row) => {
            if (row.receivedQty > 0) {
                sum += (row.receivedQty - row.wastageQty) * row.totalPay;
            }
            else {
                sum += row.orderedQty * row.totalPay;
            }
        })

        return sum;
    };


    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                    <Grid>
                        <Item />
                    </Grid> PO Reports {poSummary.id && <b>Primary Supplier : {poSummary.primarySupplier} | Payment Status : {poSummary.paymentStatus}</b>}
                </Typography>
            </div>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles data={poReportsTabData} />

                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row) => (
                                <Fragment>
                                    {editContactId === row.id ?


                                        <EditableRow row={row} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />

                                        :
                                        <ReadOnlyRow row={row} handleEditClick={handleEditClick} />}
                                </Fragment>

                            ))}
                            <TableRow>
                                <TableCell colSpan={10} style={{ fontSize: '20px', textAlign: 'center', width: '100%', fontWeight: 'bolder' }}>Total: Rs {getTotalCost(rows)}/-</TableCell>
                            </TableRow>
                        </TableBody>
                        :
                        <div>
                            <center>
                                {errFound ? <h1 style={{ color: 'black' }}>NO DATA</h1> : <CircularProgress />}
                            </center>
                        </div>

                    }
                </Table>
            </TableContainer>





        </div >
    )
}

export default PoReports
//payment status,active,po number display
