import React, { Fragment, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableTitles from '../components/TableTitles/TableTitles';
import { APIURL, CircularProgressInTable, GetRequestOptions, poSummaryData, detail } from '../constants/Constants';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress } from '@material-ui/core';
const CategorySummary = () => {
    const [topReports, setTopReports] = useState([]);
    const [noData, setNoData] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState();


    const changeStatus = async (slug) => {
        setTopReports([]);
        setNoData(false);
        await fetch(APIURL + `order/categories-summary`, GetRequestOptions).then(
            response => response.json()
        ).then(data => {
            console.log(data);
            setTopReports(data);
            if (data.length === 0) {
                setNoData(true);
            }
        }).catch(err => console.log(err));
    }
    useEffect(() => {
        changeStatus();
    }, []);

    return (
        <>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Categories:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>


                        <TableCell align="center" style={{ color: 'wheat' }}>Category</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>In Stock</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Out Of Stock</TableCell>

                    </TableHead>
                    {topReports ?

                        < TableBody >
                            {noData && <h2>No Data</h2>}
                            {topReports.length > 0 && topReports.map((rows, index) => (
                                <TableRow >


                                    <TableCell align="center">{rows.category}</TableCell>
                                    <TableCell align="center">{rows.inStock}</TableCell>
                                    <TableCell align="center">{rows.outOfStock}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody> : <CircularProgressInTable />}
                </Table>
            </TableContainer>
        </>
    )
}

export default CategorySummary