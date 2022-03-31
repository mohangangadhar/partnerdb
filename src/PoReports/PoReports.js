import React, { useState, useEffect, Fragment } from 'react'
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

function PoReports(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [suppliers, setSuppliers] = useState([]);
    const [checkData, setCheckData] = useState([]);
    const [errFound, setErrFound] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [recentPoId, setRecentPoId] = useState({
        poId: "",
        createdAt: ""
    });
    const [editContactId, setEditContactId] = useState(null);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [isRowLoading, setisRowLoading] = useState(false);
    const [addFormData, setAddFormData] = useState({
        receivedQty: 0.0,
        wastageQty: 0.0,
        qualityRating: 0,
        missedQty: 0.0,
        comments: "",
        totalPay: 0.0
    });
    const [toggle, setToggle] = useState(true);
    const [podata, setPoData] = useState({});
    const [totalPoData, setTotalPoData] = useState([]);
    const [editedRowData, setEditedRowData] = useState([]);
    const receivedData = async (val) => {
        setisLoading(true);
        setToggle(true);
        setRows([]);
        setErrFound(false);
        await fetch(APIURL + `suppy-planning-snapshot/page-query?page=${offSet}&size=30`, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);
                setisLoading(false);
            }
            ).catch(err => setErrFound(true));


    }
    const getPrimarySuppliers = async () => {
        await fetch(APIURL + "primary-supplier", GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setSuppliers(data);
            })

    }
    const arrangeData = async (data) => {
        const supplierData = new Set();
        data.map((rows, index) => (
            supplierData.add(rows.primarySupplier)
        ));
        let j = 0;
        for (var i of supplierData) {
            setCheckData(checkData => [...checkData, i]);
            console.log(checkData[j++]);
        }
        setisLoading(false);
    }
    const sendToDatabase = async (checkList) => {
        let finalList = [];
        // let poId = getRandom();
        console.log(checkList);
        checkList.map((row) =>

            finalList.push({
                "skuUom": row.skuUom,
                "staginArea": row.staginArea,
                "skuCount": row.skuCount,
                "orderIdCount": row.orderIdCount,
                "totalQtyReq": row.totalQtyReq,
                "suggestedQty": row.suggestedQty,
                "primarySupplier": row.primarySupplier,
                "orderedQty": row.orderedQty,
                "orderedUom": row.orderedUom,
                "productName": row.productName,
                "productId": row.productId,
                "vendorName": row.vendorName,
                "comments": "raw",
                "poId": "PO-V" + row.spId.substring(4),
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
                arrangeData(data);
                setRows(data);
                setRecentPoId({
                    poId: data[0].poId,
                    createdAt: data[0].createdAt
                });
            }).catch(err => console.log(err));
    }
    const getLatestReport = async () => {
        setisLoading(true);
        await fetch(APIURL + "supply-planning-report", GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                fetch(APIURL + `suppy-planning-snapshot/po-id/${data[0].spId.substring(4)}`).then(
                    response => response.json()
                ).then(poIdData => {
                    if (poIdData.length > 0) {
                        arrangeData(poIdData);
                        setRecentPoId({
                            poId: poIdData[0].poId,
                            createdAt: poIdData[0].createdAt
                        });
                        console.log(poIdData[0].poId);
                        setRows(poIdData);
                        return;
                    }
                    else {
                        sendToDatabase(data.filter(report => report.spId == data[0].spId));
                    }
                });
                // setRows(data.filter(report => report.spId == data[0].spId));

            }).catch(err => { console.log(err); setisLoading(false); })
    }
    useEffect(async () => {

        // handleChangeSupplier("Vishnu")
        getLatestReport();
        getPrimarySuppliers();
    }, [offSet]);
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
        var currentdate = new Date();
        var datetime =
            currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
            + " " + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        let urlString = `suppy-planning-snapshot/${row.id}`;
        let supportData = {
            receivedQty: tempFormData.receivedQty,
            wastageQty: tempFormData.wastageQty,
            qualityRating: tempFormData.qualityRating,
            updatedAt: datetime,
            missedQty: tempFormData.missedQty,
            comments: tempFormData.comments,
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
        setisRowLoading(true);
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
        setEditContactId(null);
        uploadBackEnd(row, tempFormData);
    }
    const handleChangeSupplier = async (name) => {

        console.log(name);
        if (name == "all") {
            receivedData(offSet);
            return;
        }
        setisLoading(true);
        await fetch(APIURL + `supply-planning-report/primary-supplier/${name}`).
            then(response => response.json()).
            then(data => {
                setRows("");
                setRows(data);
                setisLoading(false);
            }).then(err => setErrFound(true));
    }
    const handleAddPoData = async (event, tempData) => {
        setTotalPoData(totalPoData => [...totalPoData, tempData]);
        // setisApiLoading(true);
        setPoData([]);
        setToggle(true);
        console.log(totalPoData);
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(tempData)
        // };
        // await fetch(APIURL + 'suppy-planning-snapshot', requestOptions).then(
        //     response => response.json()
        // ).then(
        //     data => {
        //         setisApiLoading(false);
        //         setPoData([]);
        //     }
        // ).catch(err => console.log(err));
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
    const sendTotalPoData = async (checkList) => {
        let finalList = [];
        let poId = getRandom();
        console.log(checkList);
        checkList.map((row) =>

            finalList.push({
                "skuUom": row.skuUom,
                "staginArea": "nm",
                "skuCount": "2",
                "orderIdCount": "22",
                "totalQtyReq": "",
                "suggestedQty": row.suggestedQty,
                "primarySupplier": "",
                "orderedQty": row.orderedQty,
                "orderedUom": row.orderedUom,
                "productName": row.productName,
                "productId": 0,
                "vendorName": row.vendorName,
                "comments": "raw",
                "poId": "PO-V" + poId,
                "totalPay": row.totalPay * row.orderedQty,
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
                setisLoading(false);
            }).catch(err => console.log(err));
    }
    const getTotalCost = (list) => {
        let sum = 0;
        list.map((ls) => {
            sum += ls.totalPay * ls.missedQty;
        })
        return sum;
    };
    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                    PO Reports
                </Typography>
                {/* <SearchBySupplier suppliers={suppliers} handleChangeSupplier={handleChangeSupplier} /> */}
            </div>

            <Box m={1} />
            {totalPoData.length > 0 &&
                <>
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Total Qty Req</TableCell>


                            <TableCell align="left" style={{ color: 'wheat' }}>Ordered Qty</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Ordered Uom</TableCell>
                            <TableCell align="left" style={{ color: 'wheat' }}>Product Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell align="left" style={{ color: 'wheat' }}>Price/Uom</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Comments</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {totalPoData.map((data, index) => (
                            <TableRow>
                                <TableCell style={{ color: 'wheat' }}>{data.totalQtyReq}</TableCell>

                                <TableCell style={{ color: 'wheat' }}>{data.orderedQty}</TableCell>
                                <TableCell style={{ color: 'wheat' }}>{data.orderedUom}</TableCell>
                                <TableCell style={{ color: 'wheat' }}>{data.productName}</TableCell>
                                <TableCell style={{ color: 'wheat' }}>{data.vendorName}</TableCell>
                                <TableCell style={{ color: 'wheat' }}>{data.totalPay}</TableCell>
                                <TableCell style={{ color: 'wheat' }}>{data.comments}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </>

            }



            {toggle ?
                <>
                    <Button variant="contained" onClick={() => setToggle(false)}>Add</Button> &nbsp;
                    {totalPoData.length > 0 && <Button variant="contained" onClick={() => sendTotalPoData(totalPoData)}>Save All</Button>}
                </>
                :

                <AddPoData setToggle={setToggle} suppliers={suppliers} poData={podata} setPoData={setPoData} handleAddPoData={handleAddPoData} handlePoDataChange={handlePoDataChange} />
            }
            {checkData.length > 0 ?
                <>
                    {checkData.length > 0 && checkData.map((data, index) => (
                        <>
                            <h3 style={{ color: 'white' }}>Primary Supplier : {checkData[index]} |   PO Number: {recentPoId.poId} | Created At : {recentPoId.createdAt} | Payment Status: Pending</h3>
                            <TableContainer component={Paper}>
                                <Table className="table" aria-label="spanning table">
                                    <TableTitles data={poReportsTabData} />

                                    {rows.length > 0 && !(isLoading) ?
                                        <TableBody>
                                            {rows.filter(data => data.primarySupplier === checkData[index]).map((row) => (
                                                <Fragment>
                                                    {editContactId === row.id ?


                                                        <EditableRow row={row} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />

                                                        :
                                                        <ReadOnlyRow row={row} handleEditClick={handleEditClick} />}
                                                </Fragment>

                                            ))}
                                            <TableRow>
                                                <TableCell colSpan={10} style={{ fontSize: '20px', textAlign: 'center', width: '100%', fontWeight: 'bolder' }}>Total: Rs {getTotalCost(rows.filter(data => data.primarySupplier === checkData[index]))}/-</TableCell>
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
                        </>
                    ))

                    }

                </> : <div>
                    <center>
                        {errFound ? <h1 style={{ color: 'black' }}>NO DATA</h1> : <CircularProgress />}
                    </center></div>
            }
            <Box m={2} />
            {/* <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={(event, value) => setOffSet(value - 1)} />
            </Grid> */}
            <Box m={2} />
        </div >
    )
}

export default PoReports
