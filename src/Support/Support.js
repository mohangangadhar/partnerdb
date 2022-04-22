
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

import { Box, Grid, TextField } from "@material-ui/core";
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import { APIURL, supportTabData } from '../constants/Constants';
import FilterByStatus from './Components/FilterByStatus';


const Support = () => {
    const [perPage, setPerPage] = useState(15);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [editPage, setEditPage] = useState(0);
    const [noData, setNoData] = useState(false);
    const [editContactId, setEditContactId] = useState(null);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [isRowLoading, setisRowLoading] = useState(false);
    const [url, setUrl] = useState(APIURL + "support/page-query?page=");
    const [addFormData, setAddFormData] = useState({
        status: "",
        resolution: "",
        category: "",
        resolver: ""
    });
    const [editedRowData, setEditedRowData] = useState([]);
    const RequestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const handleChange = async (page, apiUrl) => {
        setisLoading(true);
        setNoData(false);
        setEditedRowData([]);
        setEditPage(page);
        await fetch(apiUrl + page, RequestOptions)
            .then(response => response.json())
            .then(data => {
                setEditedRowData(data.content);
                setTotalPages(data.totalPages);
                if (data.content.length == 0) { setNoData(true); }
            }).catch(err => console.log(err));
        setisLoading(false);
    }
    useEffect(async () => {
        handleChange(0, APIURL + "support/page-query?page=");
    }, []);

    const handleChangeStatus = (e) => {
        if (e == "all") {
            setUrl(APIURL + "support/page-query?page=");
            handleChange(0, APIURL + "support/page-query?page=");
            return;
        }
        setUrl(APIURL + `support/${e}/page-query?page=`);
        handleChange(0, APIURL + `support/${e}/page-query?page=`);
        console.log(e);
    }
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
            status: row.status,
            resolution: row.resolution,
            category: row.category,
            resolver: row.resolver
        });
        setEditContactId(row.id);
    }
    const uploadBackEnd = async (row, tempFormData) => {
        let urlString = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/support/${row.id}`;
        let supportData = {
            "status": tempFormData.status,
            "resolution": tempFormData.resolution,
            "category": tempFormData.category,
            "resolver": tempFormData.resolver
        };

        setisApiLoading(true);

        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(supportData)
        };
        await fetch(urlString, requestOptionsForUpdate)
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
        xyz.status = tempFormData.status;
        xyz.resolution = tempFormData.resolution;
        xyz.category = tempFormData.category;
        xyz.resolver = tempFormData.resolver;
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
    return <div>
        {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
        <FilterByStatus handleChangeStatus={handleChangeStatus} />
        <TableContainer component={Paper}>
            <Table className="table" aria-label="spanning table">
                <TableTitles data={supportTabData} />
                {editedRowData.length > 0 && !(isLoading) ?
                    <TableBody>
                        {editedRowData.map((row, index) => (
                            <Fragment>
                                {editContactId === row.id ?
                                    <>
                                        {!(isRowLoading) ?
                                            <EditableRow row={row} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />
                                            : <TableRow><TableCell>Updating...</TableCell></TableRow>}</>
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
                onChange={(event, value) => handleChange(value - 1, url)} />
        </Grid>
        <Box m={2} />
    </div >;
};

export default Support;
