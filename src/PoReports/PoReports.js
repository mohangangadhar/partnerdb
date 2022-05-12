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
import { Grid, Typography, Button } from "@material-ui/core";
import { APIURL, GetRequestOptions, poReportsTabData } from '../constants/Constants';
import ReadOnlyRow from './Components/ReadOnlyRow';
import EditableRow from './Components/EditableRow';
import { NotificationManager } from "react-notifications";
import GetDate from '../components/GetDate';
import TableTitles from '../components/TableTitles/TableTitles';

import { Item } from '../components/Item';
import AddPoData from './Components/AddPoData';

function PoReports(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [toggle, setToggle] = useState(true);
    const [podata, setPoData] = useState({});
    const [totalPoData, setTotalPoData] = useState([]);
    const [inputPrimarySupplier, setInputPrimarySupplier] = useState([]);
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
        totalPay: 0.0,
        productName: "",
        orderedQty: 0
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
                    "actualTotal": Math.round(sum * 100) / 100,
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
            comments: row.comments,
            productName: row.productName,
            orderedQty: row.orderedQty
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
            totalPay: tempFormData.totalPay,
            orderedQty: tempFormData.orderedQty,
            productName: tempFormData.productName
        };

        setisApiLoading(true);


        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(supportData)
        };
        await fetch("http://127.0.0.1:8080/" + urlString, requestOptionsForUpdate)
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
        xyz.productName = tempFormData.productName;
        xyz.orderedQty = tempFormData.orderedQty;
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

        return Math.round(sum * 100) / 100;
    };

    const sendTotalPoData = async (checkList) => {
        console.log(totalPoData);
        let finalList = [];
        setisApiLoading(true);

        checkList.map((row) =>
            finalList.push({
                "skuUom": null,
                "staginArea": "nm",
                "skuCount": 0,
                "orderIdCount": 0,
                "totalQtyReq": "",
                "suggestedQty": 0,
                "primarySupplier": poSummary.primarySupplier,
                "orderedQty": row.orderedQty,
                "orderedUom": row.orderedUom,
                "productName": row.productName,
                "productId": 0,
                "vendorName": "",
                "comments": row.comments,
                "poId": "PO-M" + poNumber.substring(4),
                "poNumber": poNumber,
                "totalPay": row.totalPay,
                "createdAt": GetDate(),
            })
        );

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalList)
        };

        await fetch(APIURL + "suppy-planning-snapshot/saveall", requestOptions).
            then(response => response.json()).
            then(data => {
                NotificationManager.success('Saved Data', 'Success', 1000);

                setTotalPoData([]);
                setisApiLoading(false);
                getLatestReport();
            }).catch(err => alert("Could not update"));
    }
    const handleAddPoData = async (event, tempData) => {
        setTotalPoData(totalPoData => [...totalPoData, tempData]);

        setPoData([]);
        setToggle(true);


    }
    const handlePoDataChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...podata };
        newFormData[fieldName] = fieldValue;
        newFormData["createdAt"] = GetDate();
        newFormData["updatedAt"] = GetDate();
        setPoData(newFormData);
    }
    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                    <Grid>
                        <Item />
                    </Grid>  {poSummary.id && <b> {poNumber} PO Report | Primary Supplier : {poSummary.primarySupplier} | Payment Status : {poSummary.paymentStatus} |Created At: {poSummary.poCreatedDate}</b>}
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

            <>
                {totalPoData.length > 0 &&
                    <>
                        <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                            <TableRow>
                                <TableCell align="left" style={{ color: 'wheat' }}>Product Name</TableCell>
                                <TableCell align="left" style={{ color: 'wheat' }}>Ordered Qty</TableCell>
                                <TableCell align="center" style={{ color: 'wheat' }}>Ordered Uom</TableCell>
                                <TableCell align="left" style={{ color: 'wheat' }}>Price/Uom</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {totalPoData.map((data, index) => (
                                <TableRow>
                                    <TableCell style={{ color: 'wheat' }}>{data.productName}</TableCell>
                                    <TableCell style={{ color: 'wheat' }}>{data.orderedQty}</TableCell>

                                    <TableCell style={{ color: 'wheat' }}>{data.orderedUom}</TableCell>
                                    <TableCell style={{ color: 'wheat' }}>{data.totalPay}</TableCell>


                                </TableRow>

                            ))}
                        </TableBody>
                    </>

                }
                {toggle ?
                    <>
                        <Button variant="contained" color="primary" onClick={() => setToggle(false)}>Add Product</Button> &nbsp;
                        {totalPoData.length > 0 && <Button variant="contained" onClick={() => sendTotalPoData(totalPoData, "")}>Save All</Button>}
                    </>
                    :
                    <div>
                        <h3 style={{ color: 'white' }}>{poSummary.primarySupplier} | PO Created Date : {poSummary.poCreatedDate}</h3>
                        <AddPoData setInputPrimarySupplier={setInputPrimarySupplier} setToggle={setToggle} poData={podata} setPoData={setPoData} handleAddPoData={handleAddPoData} handlePoDataChange={handlePoDataChange} />
                    </div>
                }
            </>




        </div >
    )
}

export default PoReports
//payment status,active,po number display
