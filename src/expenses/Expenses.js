import React, { useState, useEffect, Fragment } from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import TableTitles from "../components/TableTitles/TableTitles";
import "../App.css"
import Select from '@mui/material/Select';
import EditableRow from "./EditableRow"
import ReadOnlyRow from "./ReadOnlyRow"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, DialogTitle, Grid, Modal, TextField, Typography } from "@material-ui/core";
import { APIURL, expenseTabData, GetRequestOptions, supportTabData } from '../constants/Constants';
import SearchByUserName from "../users/SearchByUserName";
import SearchProducts from "../products/Components/SearchProducts";
import Button from "@mui/material/Button";
import Picker from "../components/Picker";
import DropDownForPaymentStatus from './Components/DropDownForStatus';
import DropDownForStatus from './Components/DropDownForStatus';
import SearchOrdersByUserName from '../orders/SearchOrdersByUserName';

const Expenses = () => {
    const [perPage, setPerPage] = useState(15);
    const [startDate, setStartDate] = useState("");
    const [offSet, setOffSet] = useState(0);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [editPage, setEditPage] = useState(0);
    const [isDownloading, setisDownloading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [editContactId, setEditContactId] = useState(null);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [reimbursmentStatus, setReimbursmentStatus] = useState("");
    const [url, setUrl] = useState("page-query?size=30&page=");
    const [vendorName, setVendorName] = useState("");
    const [addFormData, setAddFormData] = useState({
        paymentStatus: "",
        clearedDate: "",
        clearedBy: "",
        eventDate: "",
        reimbursmentStatus: "",
        vendorName: "",
        paymentRef: "",
        comments: "",
        reimbursmentRef: "",
        memberName: "",
        expectedDeliveryDate: ""
    });
    const [modalData, setModalData] = useState({
        raisedDate: "",
        raisedBy: "",
        subCategory: "",
        category: "",
        memberName: "",
        amount: 0,
        vendorName: ""
    })
    const [editedRowData, setEditedRowData] = useState([]);
    const [expenseId, setExpenseId] = useState(0);
    const receivedData = async (currUrl, page) => {
        setisLoading(true);
        setNoData(false);
        setEditedRowData([]);
        setEditPage(page);
        await fetch(APIURL + "expenses/" + currUrl + page, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setEditedRowData(data.content);
                setTotalPages(data.totalPages);
                if (data.content.length == 0) {
                    setNoData(true);
                }
            }).catch(err => console.log(err));
        setisLoading(false);
    }
    useEffect(async () => {
        receivedData("page-query?size=30&page=", 0);
    }, []);



    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        console.log(newFormData);
        setAddFormData(newFormData);
    };
    const handleEditClick = (event, row) => {
        event.preventDefault();
        console.log(row.reimbursmentStatus);
        setAddFormData({
            paymentStatus: row.paymentStatus,
            clearedDate: row.clearedDate,
            clearedBy: row.clearedBy,
            eventDate: row.eventDate,
            reimbursmentStatus: row.reimbursmentStatus,
            vendorName: row.vendorName,
            paymentRef: row.paymentRef,
            comments: row.comments,
            reimbursmentRef: row.reimbursmentRef,
            memberName: row.memberName,
            expectedDeliveryDate: row.expectedDeliveryDate
        });
        setEditContactId(row.id);
    }
    const uploadBackEnd = async (row, tempFormData) => {

        let supportData = {
            paymentStatus: tempFormData.paymentStatus,
            clearedDate: tempFormData.clearedDate,
            clearedBy: tempFormData.clearedBy,
            eventDate: tempFormData.eventDate,
            reimbursmentStatus: tempFormData.reimbursmentStatus,
            vendorName: tempFormData.vendorName,
            paymentRef: tempFormData.paymentRef,
            reimbursmentRef: tempFormData.reimbursmentRef,
            comments: tempFormData.comments,
            memberName: tempFormData.memberName,
            expectedDeliveryDate: tempFormData.expectedDeliveryDate
        };
        setisApiLoading(true);

        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(supportData)
        };
        await fetch(APIURL + `expenses/${row.id}`, requestOptionsForUpdate)
            .then(response => response.json())
            .then(data => {
                setisApiLoading(false);
            }
            ).catch((err) => {
                alert('something wrong' + err);
                setisApiLoading(false);
            });
    }
    const handleFormSubmit = async (event, row, tempFormData) => {
        event.preventDefault();
        setAddFormData("");
        let ind;
        let xyz = row;
        xyz = { ...xyz };
        xyz.paymentStatus = tempFormData.paymentStatus;
        xyz.clearedBy = tempFormData.clearedBy;
        xyz.clearedDate = tempFormData.clearedDate;
        xyz.reimbursmentStatus = tempFormData.reimbursmentStatus;
        xyz.eventDate = tempFormData.eventDate;
        xyz.vendorName = tempFormData.vendorName;
        xyz.paymentRef = tempFormData.paymentRef;
        xyz.comments = tempFormData.comments;
        xyz.reimbursmentRef = tempFormData.reimbursmentRef;
        xyz.memberName = tempFormData.memberName;
        xyz.expectedDeliveryDate = tempFormData.expectedDeliveryDate;
        for (let i = 0; i < editedRowData.length; i++) {
            if (row.id == editedRowData[i].id) {
                ind = i;
                break;
            }
        }
        editedRowData[ind] = xyz;
        setEditContactId(null);
        uploadBackEnd(row, tempFormData);
    }

    const handleChangePaymentStatus = async (val) => {
        setReimbursmentStatus("");
        setPaymentStatus(val);
        setVendorName("");
        setExpenseId("");
        setEditedRowData([]);
        if (val == "all") {
            setUrl("page-query?size=30&page=");
            await receivedData("page-query?size=30&page=", 0);
            return;
        }
        setUrl(`payment-status/${val}?size=30&page=`);
        await receivedData(`payment-status/${val}?size=30&page=`, 0);
    }
    const handleChangeReimbursmentStatus = async (val) => {
        console.log(val);
        setPaymentStatus("");
        setVendorName("");
        setExpenseId("");
        setReimbursmentStatus(val);
        setEditedRowData([]);
        if (val == "all") {
            setUrl("page-query?size=30&page=");
            await receivedData("page-query?size=30&page=", 0);
            return;
        }
        setUrl(`reimbursment-status/${val}?size=30&page=`);
        await receivedData(`reimbursment-status/${val}?size=30&page=`, 0);
    }
    const handleSearchByVendorName = async (event) => {
        event.preventDefault();
        setPaymentStatus("");
        setExpenseId("");
        setReimbursmentStatus("");
        setEditedRowData([]);
        if (vendorName == "" || vendorName.length == 0) {
            await receivedData("page-query?size=30&page=", 0);
            return;
        }
        await receivedData(`vendor/${vendorName}?size=30&page=`, 0);
    }
    const handleSearchByExpenseId = async (event) => {
        event.preventDefault();
        setPaymentStatus("");
        setVendorName("");
        setReimbursmentStatus("");
        setEditedRowData([]);
        if (expenseId == "" || expenseId.length == 0) {
            await receivedData("page-query?size=30&page=", 0);
            return;
        }
        await receivedData(`id/${expenseId}?size=30&page=`, 0);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleModalSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modalData)
        };
        await fetch(APIURL + "expenses", requestOptions).
            then(response => response.json()).
            then(data => {
                receivedData("page-query?size=30&page=", 0);
                handleClose();
                setModalData(null);
            }

            ).catch(err => console.log(err))
    }
    const handleDownload = async () => {
        setisDownloading(true);

        fetch(APIURL + "export/admin/expensereport/", GetRequestOptions)
            .then(response => {
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url
                    a.download = filename;
                    a.click();
                    setisDownloading(false);
                }).catch(err => setisDownloading(false));
            });
    }
    return <div>
        {isDownloading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Downloading Orders</b>}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                Expenses
            </Typography>
            <DropDownForStatus label="Payment Status" status={paymentStatus} handleChangeStatus={handleChangePaymentStatus} />
            <DropDownForStatus label="Reimbursment Status" status={reimbursmentStatus} handleChangeStatus={handleChangeReimbursmentStatus} />
            <SearchOrdersByUserName setSearchQuery={setVendorName} searchquery={vendorName}
                handleSearch={handleSearchByVendorName}
                label="Search By Vendor Name" />
            <Button variant="contained" color="success" onClick={(event) => handleOpen()}>Add</Button>
            <SearchOrdersByUserName setSearchQuery={setExpenseId} searchquery={expenseId}
                handleSearch={handleSearchByExpenseId}
                label="Search By Expense Id" />
            <Button variant="contained" color="success" onClick={(event) => handleDownload()}>Download</Button>
        </div>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" align={"center"} gutterBottom>
                        Add Expense
                    </Typography>
                    <Picker dateChange={(e) => setModalData((prev) => ({
                        ...prev,
                        raisedDate: e.target.value
                    }))} label={"Raised Date"} />
                    <TextField
                        autoFocus
                        onChange={(e) => setModalData((prev) => ({
                            ...prev,
                            raisedBy: e.target.value
                        }))
                        }
                        margin="dense"
                        id="raisedBy"
                        label="Raised By"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                        <InputLabel id="demo-simple-select-required-label"> Category</InputLabel>
                        <Select

                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-disabled"

                            onChange={(e) => setModalData((prev) => ({
                                ...prev,
                                category: e.target.value
                            }))
                            }
                            label="category"
                        >
                            <MenuItem value="operations">Operations</MenuItem>
                            <MenuItem value="inbound transportation">Inbound Tranportation</MenuItem>
                            <MenuItem value="outbound transportation">Outbound Transportation</MenuItem>
                            <MenuItem value="office expense">Office Expense</MenuItem>
                            <MenuItem value="marketing">Marketing</MenuItem>
                            <MenuItem value="technology">Technology</MenuItem>
                            <MenuItem value="advance">Advance</MenuItem>
                            <MenuItem value="ops associate">Ops Associate</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        onChange={(e) => setModalData((prev) => ({
                            ...prev,
                            subCategory: e.target.value
                        }))
                        }
                        margin="dense"
                        id="subCategory"
                        label="Sub Category"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        onChange={(e) => setModalData((prev) => ({
                            ...prev,
                            memberName: e.target.value
                        }))
                        }
                        margin="dense"
                        id="name"
                        label="Paid By"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        onChange={(e) => setModalData((prev) => ({
                            ...prev,
                            vendorName: e.target.value
                        }))
                        }
                        margin="dense"
                        id="vendor"
                        label="Vendor"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        onChange={(e) => setModalData((prev) => ({
                            ...prev,
                            amount: e.target.value
                        }))
                        }
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                    />

                    <Box m={2} />
                    <Box textAlign='center'>
                        <Button variant='contained' color="success" onClick={(e) => handleModalSubmit(e)}>
                            Submit
                        </Button>
                    </Box>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Please check once before submitting the expense.
                    </Typography>
                </Box>
            </Modal>
        </div>
        <TableContainer component={Paper}>
            <Table className="table" aria-label="spanning table">
                <TableTitles data={expenseTabData} />
                {editedRowData.length > 0 && !(isLoading) ?
                    <TableBody>
                        {editedRowData.map((row, index) => (
                            <Fragment>
                                {editContactId === row.id ?
                                    <EditableRow row={row} addFormData={addFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleFormSubmit={handleFormSubmit} />
                                    :
                                    <ReadOnlyRow row={row} handleEditClick={handleEditClick} />}

                            </Fragment>

                        ))}
                    </TableBody>
                    :
                    <div>
                        <center>
                            {noData ? <h2>No Data</h2> : <h2>Loading....</h2>}
                        </center>
                    </div>
                }
            </Table>
        </TableContainer>
        <Box m={2} />
        <Grid container justifyContent={"center"}>
            <Pagination variant={"text"} color={"primary"}
                count={totalPages}
                page={editPage + 1}
                onChange={(event, value) => receivedData(url, value - 1)} />
        </Grid>
        <Box m={2} />
    </div>;
};

export default Expenses;
