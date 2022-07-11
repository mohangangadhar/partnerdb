
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
import GetDate from '../components/GetDate';

import { Box, Grid, TextField } from "@material-ui/core";
import EditableRow from './Components/EditableRow';
import ReadOnlyRow from './Components/ReadOnlyRow';
import { APIURL, GetRequestOptions, PricingSelectionTabData } from '../constants/Constants';



const PricingSelection = () => {
    const [perPage, setPerPage] = useState(15);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [editPage, setEditPage] = useState(0);
    const [noData, setNoData] = useState(false);
    const [editContactId, setEditContactId] = useState(null);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [isRowLoading, setisRowLoading] = useState(false);
    const [url, setUrl] = useState(APIURL + "PricingSelection/page-query?page=");
    const [addFormData, setAddFormData] = useState({
        product: "",
        category: "",
        unit: "",
        jeevamrut: 0,
        daman: 0,
        dhriti: 0,
        bb: 0,
        vijetha: 0,
        lastUpdated: "",
        landingCost: "",
        proposedCost: "",
        comments: ""
    });
    const [editedRowData, setEditedRowData] = useState([]);


    const handleChange = async () => {
        setisLoading(true);
        setNoData(false);
        setEditedRowData([]);

        await fetch(APIURL + "pricing-selection/get-all", GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setEditedRowData(data);

                if (data.length == 0) { setNoData(true); }
            }).catch(err => console.log(err));
        setisLoading(false);
    }
    useEffect(() => {
        handleChange();
    }, []);


    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        newFormData["lastUpdated"] = GetDate();
        setAddFormData(newFormData);
    };
    const handleEditClick = (event, row) => {
        event.preventDefault();

        setAddFormData({
            product: row.product,
            category: row.category,
            unit: row.unit,
            jeevamrut: row.jeevamrut,
            bb: row.bb,
            daman: row.daman,
            dhriti: row.dhriti,
            vijetha: row.vijetha,
            lastUpdated: row.lastUpdated,
            landingCost: row.landingCost,
            proposedCost: row.proposedCost,
            comments: row.comments
        });
        setEditContactId(row.id);
    }
    const uploadBackEnd = async (row, tempFormData) => {
        let PricingSelectionData = {
            "product": tempFormData.product,
            "category": tempFormData.category,
            "unit": tempFormData.unit,
            "jeevamrut": tempFormData.jeevamrut,
            "bb": tempFormData.bb,
            "daman": tempFormData.daman,
            "dhriti": tempFormData.dhriti,
            "vijetha": tempFormData.vijetha,
            "lastUpdated": tempFormData.lastUpdated,
            "landingCost": tempFormData.landingCost,
            "proposedCost": tempFormData.proposedCost,
            "comments": tempFormData.comments
        };

        setisApiLoading(true);

        const requestOptionsForUpdate = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(PricingSelectionData)
        };
        await fetch(APIURL + `pricing-selection`, requestOptionsForUpdate)
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
        xyz.product = tempFormData.product;
        xyz.category = tempFormData.category;
        xyz.unit = tempFormData.unit;
        xyz.jeevamrut = tempFormData.jeevamrut;
        xyz.bb = tempFormData.bb;
        xyz.daman = tempFormData.daman;
        xyz.dhriti = tempFormData.dhriti;
        xyz.vijetha = tempFormData.vijetha;
        xyz.landingCost = tempFormData.landingCost;
        xyz.proposedCost = tempFormData.proposedCost;
        xyz.comments = tempFormData.comments;
        xyz.lastUpdated = tempFormData.lastUpdated;
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
                <TableTitles data={PricingSelectionTabData} />
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
    </div>
};

export default PricingSelection;
