import React, { useState, useEffect, Fragment } from 'react'

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import { APIURL, getRandom, GetRequestOptions, poReportInfoTabData, productsTabData } from '../constants/Constants';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import TableTitles from '../components/TableTitles/TableTitles';
import Button from '@mui/material/Button';
import { NotificationManager } from "react-notifications";
import TableHead from "@material-ui/core/TableHead";
import { Box, Grid, TextField } from "@material-ui/core";

import CircularProgress from '@mui/material/CircularProgress';
import EditableRow from "./Components/EditablePoReportInfo";
import ReadOnlyRow from "./Components/ReadOnlyPoReportInfo";
import GetDate from '../components/GetDate';
import AddPoData from './Components/AddPoData';
import Picker from '../components/Picker';


const PoReportInfo = () => {
    const [rows, setRows] = useState([]);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [isRowLoading, setisRowLoading] = useState(false);
    const [offSet, setOffSet] = useState(0);
    const [size, setSize] = useState(50);
    const [toggle, setToggle] = useState(true);
    const [podata, setPoData] = useState({});
    const [totalPoData, setTotalPoData] = useState([]);
    const [inputPrimarySupplier, setInputPrimarySupplier] = useState([]);
    const [poCreatedDate, setPoCreatedDate] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [filterInStock, setFilterInStock] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [searchNotFound, setSearchNotFound] = useState(false);


    const [editContactId, setEditContactId] = useState(null);
    const [addFormData, setAddFormData] = useState({
        id: 0,
        active: 0,
        paymentStatus: "",
        actualTotal: 0,
        poType: "",
        poStatus: "",
        comments: ""
    });
    const [editedRowData, setEditedRowData] = useState([]);


    const receivedData = async (val) => {
        setSearchNotFound(false);

        await fetch(APIURL + "po-report-info/page-query?size=30&page=" + val, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.content);
                setEditedRowData(data.content);
                setTotalPages(data.totalPages);
                setisLoading(false);
                if (data.content && data.content.length == 0) { setSearchNotFound(true) }
            });

    }
    useEffect(() => {
        setisLoading(true);
        setSearchNotFound(false);
        receivedData(offSet);
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
        setAddFormData({
            id: row.id,
            active: row.active,
            paymentStatus: row.paymentStatus,
            actualTotal: row.actualTotal,
            poType: row.poType,
            poStatus: row.poStatus,
            comments: row.comments

        });
        setEditContactId(row.id);
    }
    const uploadBackEnd = async (row, tempFormData) => {

        let poData = {
            "active": tempFormData.active,
            "paymentStatus": tempFormData.paymentStatus == null ? "" : tempFormData.paymentStatus,
            "actualTotal": tempFormData.actualTotal,
            "poType": tempFormData.poType == null ? "" : tempFormData.poType,
            "poStatus": tempFormData.poStatus == null ? "" : tempFormData.poStatus,
            "comments": tempFormData.comments == null ? "" : tempFormData.comments,
            "poReceivedDate": tempFormData.poReceivedDate == null ? "" : tempFormData.poReceivedDate
        };
        setisApiLoading(true);


        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(poData)
        };
        await fetch(APIURL + 'po-report-info/' + row.id, requestOptionsForUpdate)
            .then(response => response.json())
            .then(data => {
                setisApiLoading(false);
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
        xyz.active = tempFormData.active;
        xyz.paymentStatus = tempFormData.paymentStatus;
        xyz.actualTotal = tempFormData.actualTotal;
        xyz.poType = tempFormData.poType;
        xyz.poStatus = tempFormData.poStatus;
        xyz.comments = tempFormData.comments;
        xyz.poReceivedDate = tempFormData.poReceivedDate;
        for (let i = 0; i < editedRowData.length; i++) {
            if (row.id == editedRowData[i].id) {
                ind = i;
                break;
            }
        }
        editedRowData[ind] = xyz;
        setEditContactId(null);
        setisRowLoading(false);
        uploadBackEnd(row, tempFormData);
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
    const getTotalPay = () => {
        let finalSum = 0;
        totalPoData.map(data => (
            finalSum += data.totalPay * data.orderedQty
        ))
        console.log(finalSum);
        return finalSum;
    }
    const sendTotalPoData = async (checkList) => {
        let finalList = [];
        setisApiLoading(true);

        let poId = getRandom();

        checkList.map((row) =>

            finalList.push({
                "skuUom": row.skuUom,
                "staginArea": "nm",
                "skuCount": 0,
                "orderIdCount": 0,
                "totalQtyReq": "",
                "suggestedQty": 0,
                "primarySupplier": inputPrimarySupplier,
                "orderedQty": row.orderedQty,
                "orderedUom": row.orderedUom,
                "productName": row.productName,
                "productId": 0,
                "vendorName": "",
                "comments": row.comments,
                "poId": "PO-M" + poId,
                "poNumber": "PO-V" + poId,
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

                let reqBody = {
                    "poReportId": "PO-V" + poId,
                    "createdAt": GetDate(),
                    "comments": "",
                    "paymentStatus": "yet to deliver",
                    "active": 1,
                    "poCreatedDate": poCreatedDate,
                    "poType": "Manual",
                    "poStatus": "New",
                    "actualTotal": 0,
                    "poTotal": getTotalPay(),
                    "primarySupplier": inputPrimarySupplier,
                    "poReceivedDate": null
                }
                const requestOptionsz = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody)
                };
                fetch(APIURL + "po-report-info", requestOptionsz).then(response => {
                    setTotalPoData([]);
                    setisApiLoading(false);
                    receivedData(offSet);
                }).catch(err => alert(err))
                setisApiLoading(false);
            }).catch(err => console.log(err));
    }
    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <center><h2 style={{ marginTop: -9, marginBottom: 0, fontStyle: 'italic', color: 'white' }}>Po Report Info</h2></center>
            <Box m={1} />
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

                    {totalPoData.length == 0 &&
                        <div style={{ display: 'flex' }}>
                            <input placeholder="Enter Primary Supplier" type="text" onChange={(e) => setInputPrimarySupplier(e.target.value)} />
                            <Picker color="white" dateChange={(e) => setPoCreatedDate(e.target.value)} label={"Po Created Date"} />

                        </div>
                    }

                    <Button variant="contained" style={{ color: 'yellow' }} disabled={inputPrimarySupplier.length > 1 && poCreatedDate.length > 1 ? false : true} onClick={() => setToggle(false)}>Add</Button> &nbsp;
                    {totalPoData.length > 0 && <Button variant="contained" onClick={() => sendTotalPoData(totalPoData)}>Save All</Button>}
                </>
                :
                <div>
                    <h3 style={{ color: 'white' }}>{inputPrimarySupplier} | PO Created Date : {poCreatedDate}</h3>
                    <AddPoData setInputPrimarySupplier={setInputPrimarySupplier} setToggle={setToggle} poData={podata} setPoData={setPoData} handleAddPoData={handleAddPoData} handlePoDataChange={handlePoDataChange} />
                </div>
            }
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles data={poReportInfoTabData} />
                    {editedRowData.length > 0 && !(isLoading) ?
                        <TableBody>
                            {editedRowData.map((row, index) => (
                                <Fragment>
                                    {editContactId === row.id ?


                                        <EditableRow row={row} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />

                                        :
                                        <ReadOnlyRow row={row} handleEditClick={handleEditClick} />}
                                </Fragment>
                            ))}
                        </TableBody> :
                        <div>
                            <center>
                                {searchNotFound ? <h1 style={{ color: 'black' }}>Not Found</h1> : <CircularProgress />}
                            </center>
                        </div>
                    }
                </Table>
            </TableContainer>
            <Box m={2} />
            {

                <Grid container justifyContent={"center"}>
                    <Pagination variant={"text"} color={"primary"}
                        count={totalPages}
                        onChange={(event, value) => setOffSet(value - 1)} />
                </Grid>
            }
            <Box m={2} />
        </div >
    )
}

export default PoReportInfo
