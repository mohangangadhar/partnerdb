import React, { Fragment, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableTitles from '../components/TableTitles/TableTitles';
import { APIURL, CircularProgressInTable, GetRequestOptions, poSummaryData } from '../constants/Constants';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress } from '@material-ui/core';
const CategorySummary = () => {
    const [topReports, setTopReports] = useState([]);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState();

    const getCategories = async () => {
        await fetch(APIURL + "category", GetRequestOptions).then(
            response => response.json()
        ).then(data => {
            console.log(data);
            setCategories(data);
        }).catch(err => console.log(err));
    }
    const changeStatus = async (slug) => {
        setTopReports([]);

        await fetch(APIURL + `order/categories-summary/${slug}`, GetRequestOptions).then(
            response => response.json()
        ).then(data => {
            console.log(data);
            setTopReports(data);
        }).catch(err => console.log(err));
    }
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Categories:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>


                        <TableCell align="center" style={{ color: 'wheat' }}> Instock</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Out Of Stock</TableCell>
                        <TableCell>
                            <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    style={{ height: 50, color: 'white' }}
                                    id="demo-simple-select-disabled"
                                    value={status}
                                    onChange={(event) => {
                                        setCategory(event.target.value);
                                        changeStatus(event.target.value);
                                    }}
                                    label="Report Type?"
                                >
                                    {categories.length > 0 && categories.map((cat, index) => {

                                        return <MenuItem key={index} value={cat.slug}>{cat.slug}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableHead>
                    {topReports ?
                        < TableBody >
                            <TableRow >
                                {topReports.map((rows, index) => (

                                    <TableCell align="center">{rows.count}</TableCell>

                                ))}
                            </TableRow>

                        </TableBody> : <CircularProgressInTable />}
                </Table>
            </TableContainer>
        </>
    )
}

export default CategorySummary