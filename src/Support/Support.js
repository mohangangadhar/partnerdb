
import React, { useState, useEffect, Fragment } from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';

import Button from '@mui/material/Button';

import { Box, Grid, TextField } from "@material-ui/core";
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';


const Support = () => {
    const [perPage, setPerPage] = useState(15);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [editContactId, setEditContactId] = useState(null);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [isRowLoading, setisRowLoading] = useState(false);
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

    const handleChange = async (page) => {
        setisLoading(true);
        let apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/support/page-query?page=${page}`;

        await fetch(apiUrl, RequestOptions)
            .then(response => response.json())
            .then(data => {
                setEditedRowData(data.content.reverse());
                setTotalPages(data.totalPages - 1);
            }).catch(err => console.log(err));
        setisLoading(false);
    }
    useEffect(async () => {
        setisLoading(true);
        let apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/support/page-query?page=0`;
        await fetch(apiUrl, RequestOptions)
            .then(response => response.json())
            .then(data => {
                handleChange(data.totalPages - 1);
            }).catch(err => console.log(err));
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
        <TableContainer component={Paper}>
            <Table className="table" aria-label="spanning table">
                <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                    <TableRow>
                        <TableCell style={{ color: 'wheat' }}>Id</TableCell>
                        <TableCell style={{ color: 'wheat' }}>Name</TableCell>
                        <TableCell style={{ color: 'wheat' }}>Email</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Message</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Created At</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Status</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Resolution</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Category</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Resolver</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
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
                            <h2>Loading....</h2>
                        </center>
                    </div>
                }
            </Table>
        </TableContainer>
        <Box m={2} />
        <Grid container justifyContent={"center"}>
            <Pagination variant={"text"} color={"primary"}
                count={totalPages}
                onChange={(event, value) => handleChange(totalPages - value)} />
        </Grid>
        <Box m={2} />
    </div >;
};

export default Support;
