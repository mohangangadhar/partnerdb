import React, {useState, useEffect, Fragment} from 'react';
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

import {Box, DialogTitle, Grid, Modal, TextField, Typography} from "@material-ui/core";
import {APIURL, GetRequestOptions, mangoTabData, supportTabData} from '../constants/Constants';
import Button from "@mui/material/Button";
import FilterByStatus from "../Support/Components/FilterByStatus";
import CityFilter from "./CityFilter";

const Mango = () => {
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [editPage, setEditPage] = useState(0);
    const [noData, setNoData] = useState(false);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [editedRowData, setEditedRowData] = useState({});
    const [url, setUrl] = useState(APIURL + "order/product/summary/city/");
    let result = {};
    let results = [];

    const handleChange = async (page) => {
        setisLoading(true);
        setNoData(false);
        await fetch(url, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                data.map((row) => {
                        result = {
                            "name": row[0],
                            "totalOrders": row[1],
                            "totalQuantity": row[2],
                            "units": row[3]
                        }
                        results.push(result)
                    }
                )
                setEditedRowData(results);
                if (data.length == 0) {
                    setNoData(true);
                }
            }).catch(err => console.log(err));
        setisLoading(false);
    }
    useEffect(async () => {
        handleChange("HYDERABAD")
    }, []);

    const handleChangeStatus = (e) => {

        if (e == "all") {
            setUrl(APIURL + `order/product/summary/city/${e}`);
            handleChange(0, APIURL + `order/product/summary/city/${e}`);
            return;
        }
        setUrl(APIURL + `order/product/summary/city/${e}`);
        handleChange(0, APIURL + `order/product/summary/city/${e}`);
        console.log(e);
    }

    return <div>
        {isApiLoading && <b style={{
            position: 'fixed',
            left: '-20',
            color: 'white',
            display: 'flex',
            justifyContent: 'flex-start',
            width: '40%',
            backgroundColor: 'red'
        }}>Updating...Do not go to any other Page</b>}
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography component="h2" variant="h6" style={{color: 'wheat',}} align={"left"} gutterBottom>
                Mango Requirement
            </Typography>

        </div>
        <CityFilter handleChangeStatus={handleChangeStatus}/>
        <TableContainer component={Paper}>
            <Table className="table" aria-label="spanning table">
                <TableTitles data={mangoTabData}/>
                {editedRowData.length > 0 && !(isLoading) ?
                    <TableBody>
                        {editedRowData.map((row, index) => (
                            <TableRow>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">{row.totalOrders}</TableCell>
                                <TableCell align="center">{row.totalQuantity + " " + row.units}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    :
                    <div>
                        <center> {noData ? <h2>No Data</h2> : <h2>Loading....</h2>}</center>
                    </div>
                }
            </Table>
        </TableContainer>
        <Box m={2}/>
        <Grid container justifyContent={"center"}>
            <Pagination variant={"text"} color={"primary"}
                        count={totalPages}
                        page={editPage + 1}
                        onChange={(event, value) => handleChange(value - 1)}/>
        </Grid>
        <Box m={2}/>
    </div>;
};

export default Mango;
