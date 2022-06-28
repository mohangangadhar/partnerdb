import React, { useState, useEffect, Fragment } from 'react'
import * as xlsx from 'xlsx';
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
import Modal from './Components/ImportPoModal';
import ImportPoModal from './Components/ImportPoModal';
import DropDownForPoStatus from './Components/DropDownForPoStatus';
import SearchOrdersByUserName from '../orders/SearchOrdersByUserName';


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
    const [importData, setImportData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editContactId, setEditContactId] = useState(null);
    const [poStatus, setPoStatus] = useState("");
    const [supplier, setSupplier] = useState("");
    const [poCreatedBy, setPoCreatedBy] = useState("");
    const [addFormData, setAddFormData] = useState({
        id: 0,
        active: 0,
        paymentStatus: "",
        actualTotal: 0,
        poType: "",
        poStatus: "",
        comments: "",
        poReceivedDate: "",
        primarySupplier: "",
        poTotal: 0,
        invoiceNumber: 0,
        paymentDate: "",
        paymentRefNumber: ""
    });
    const [editedRowData, setEditedRowData] = useState([]);
    const [searchPoNumber, setSearchPoNumber] = useState("");

    const receivedData = async (val, query) => {
        setSearchNotFound(false);
        setisLoading(true);
        setInputPrimarySupplier("");
        await fetch(APIURL + "po-report-info/" + query + val, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.content);
                setEditedRowData(data.content);
                setTotalPages(data.totalPages);
                setisLoading(false);
                if (data.content && data.content.length == 0) { setSearchNotFound(true) }
            }).catch(err => console.log(err.message));
        setisLoading(false);
    }
    useEffect(() => {
        setisLoading(true);
        setSearchNotFound(false);
        receivedData(offSet, "page-query?size=30&page=");
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
            comments: row.comments,
            poReceivedDate: row.poReceivedDate,
            primarySupplier: row.primarySupplier,
            poTotal: row.poTotal,
            invoiceNumber: row.invoiceNumber,
            paymentDate: row.paymentDate,
            paymentRefNumber: row.paymentRefNumber
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
            "poReceivedDate": tempFormData.poReceivedDate == null ? "" : tempFormData.poReceivedDate,
            "primarySupplier": tempFormData.primarySupplier,
            "poTotal": tempFormData.poTotal,
            "paymentRefNumber": tempFormData.paymentRefNumber,
            "paymentDate": tempFormData.paymentDate,
            "invoiceNumber": tempFormData.invoiceNumber
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
        xyz.primarySupplier = tempFormData.primarySupplier;
        xyz.poTotal = tempFormData.poTotal;
        xyz.paymentDate = tempFormData.paymentDate;
        xyz.paymentRefNumber = tempFormData.paymentRefNumber;
        xyz.invoiceNumber = tempFormData.invoiceNumber;
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
    const handleChangePoStatus = async (val) => {
        console.log(val);
        setOffSet(0);
        setSupplier("");
        setSearchPoNumber("");
        setPoStatus(val);
        setEditedRowData([]);
        if (val == "all") {
            await receivedData(0, "page-query?size=30&page=");
            return;
        }

        await receivedData(0, `po-status/${val}?size=30&page=`);
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
    const getTotalPay = (finalData) => {
        let finalSum = 0;
        finalData.map(data => (
            finalSum += data.totalPay * data.orderedQty
        ))
        return Math.round(finalSum * 100) / 100;
    }
    const sendTotalPoData = async (checkList, type) => {
        let finalList = [];
        console.log(checkList);
        setisApiLoading(true);
        // let primarySupplier = inputPrimarySupplier;

        // let finalData = totalPoData;
        // if (type == "import" && checkList && checkList.length > 1) {
        //     primarySupplier = checkList[0].primarySupplier;

        //     finalData = checkList;
        // }

        let poId = getRandom();

        checkList.map((row) =>
            finalList.push({
                "skuUom": null,
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
                    "poStatus": "new",
                    "createdBy": poCreatedBy,
                    "actualTotal": getTotalPay(checkList),
                    "poTotal": getTotalPay(checkList),
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
                fetch("http://127.0.0.1:8080/" + "po-report-info", requestOptionsz).then(response => {
                    setTotalPoData([]);
                    setisApiLoading(false);
                    receivedData(0, "page-query?size=30&page=");
                    handleClose();
                }).catch(err => alert(err))
                setisApiLoading(false);
            }).catch(err => console.log(err));
    }
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);

                console.log(json);
                setImportData(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }

    }
    const handleSearchBySupplier = async (event) => {
        event.preventDefault();
        setOffSet(0);
        setEditedRowData([]);
        setPoStatus("");
        setSearchPoNumber("");
        if (supplier == "" || supplier.length == 0) {
            await receivedData(0, "page-query?size=30&page=");
            return;
        }
        await receivedData(0, `supplier/${supplier}?size=30&page=`);
    }
    const handleSearchByPoNumber = async (event) => {
        event.preventDefault();
        setOffSet(0);
        setEditedRowData([]);
        setPoStatus("");
        setSupplier("");
        if (searchPoNumber == "" || searchPoNumber.length == 0) {
            await receivedData(0, "page-query?size=30&page=");
            return;
        }
        await receivedData(0, `po-id/${searchPoNumber}?size=30&page=`);
    }
    const handleDownload = async () => {
        setisApiLoading(true);

        fetch(APIURL + "export/admin/poreport/", GetRequestOptions)
            .then(response => {
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url
                    a.download = filename;
                    a.click();
                    setisApiLoading(false);
                }).catch(err => setisApiLoading(false));
            });
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

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {toggle ?
                    <div style={{ width: '33%' }}>
                        {totalPoData.length == 0 &&
                            <div style={{ display: 'flex' }}>
                                <input placeholder="Po Created By" type="text" onChange={(e) => setPoCreatedBy(e.target.value)} />
                                <input placeholder="Enter Primary Supplier" type="text" onChange={(e) => setInputPrimarySupplier(e.target.value)} />
                                <Picker color="white" dateChange={(e) => setPoCreatedDate(e.target.value)} label={"Po Created Date"} />

                            </div>
                        }

                        <Button variant="contained" style={{ color: 'yellow' }} disabled={poCreatedBy.length > 1 && inputPrimarySupplier.length > 1 && poCreatedDate.length > 1 ? false : true} onClick={() => setToggle(false)}>Add</Button> &nbsp;
                        {totalPoData.length > 0 && <Button variant="contained" onClick={() => sendTotalPoData(totalPoData, "")}>Save All</Button>}
                    </div>
                    :
                    <div>
                        <h3 style={{ color: 'white' }}>{inputPrimarySupplier} | PO Created Date : {poCreatedDate}</h3>
                        <AddPoData setInputPrimarySupplier={setInputPrimarySupplier} setToggle={setToggle} poData={podata} setPoData={setPoData} handleAddPoData={handleAddPoData} handlePoDataChange={handlePoDataChange} />
                    </div>
                }
                <Box m={2} />
                {/* <div style={{ marginRight: '30px', color: 'white' }}>
                    <h3 >Import PO : </h3>
                    <Button variant="contained" color="success" onClick={(event) => handleOpen()}>Import File</Button>
                </div> */}
                <DropDownForPoStatus poStatus={poStatus} handleChangePoStatus={handleChangePoStatus} />
                <SearchOrdersByUserName setSearchQuery={setSupplier} searchquery={supplier}
                    handleSearch={handleSearchBySupplier}
                    label="Search By Primary Supplier" />
                <SearchOrdersByUserName setSearchQuery={setSearchPoNumber} searchquery={searchPoNumber}
                    handleSearch={handleSearchByPoNumber}
                    label="Search By Po Number" />
                <Button style={{ maxHeight: '2vw', display: 'flex', justifyContent: 'center' }} variant="contained" color="success" onClick={(event) => handleDownload()}>Download</Button>
            </div >
            <ImportPoModal open={open} setPoCreatedDate={setPoCreatedDate} sendTotalPoData={sendTotalPoData} importData={importData}
                readUploadFile={readUploadFile} handleClose={handleClose} />
            <TableContainer component={Paper}>
                {isLoading ? <CircularProgress /> :
                    <Table className="table" aria-label="spanning table">
                        <TableTitles data={poReportInfoTabData} />
                        {editedRowData && editedRowData.length > 0 && !(isLoading) ?
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
                }
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
