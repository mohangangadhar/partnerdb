import React, { useEffect, useState } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { Box, Grid } from "@material-ui/core";

import { APIURL, GetRequestOptions } from '../constants/Constants';

import TableTitles from './Components/TableTitles';
import ReadOnlyRow from './Components/ReadOnlyRow';

const SupplyPlanning = () => {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [editContactId, setEditContactId] = useState(-1);
    const [isApiLoading, setisApiLoading] = useState(false);
    const modifyInputData = (arr) => {
        const result = [...arr.reduce((r, o) => {
            const key = o.vendorName + '-' + o.article + '-' + o.skuQuantity + '-' + o.skuUom;

            const item = r.get(key) || Object.assign({}, o, {
                orderId: 0,
                skuCount: 0,
                totalQuantityReq: 0
            });

            item.orderId += 1;
            item.skuCount += o.countOfProductsPurchased;
            item.totalQuantityReq += item.skuCount * o.skuQuantity * o.buffer

            return r.set(key, item);
        }, new Map).values()];
        return result;
    }
    const receivedData = async (pageval) => {
        setSearchNotFound(false);
        setRows("");
        setisLoading(true);
        let urlString = `ecommerce-vendor/financereports`;
        await fetch(APIURL + urlString, GetRequestOptions)
            .then(response => response.json())
            .then(data => {

                setRows(modifyInputData(data));

                setisLoading(false);
            }).catch(err => setisLoading(false));
    }

    useEffect(() => {
        receivedData(0);
    }, []);

    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <center><h2 style={{ marginTop: -9, marginBottom: 0, fontStyle: 'italic', color: 'white' }}>Supply Planning</h2></center>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles />
                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (

                                <ReadOnlyRow row={row} index={index} />

                            ))}
                        </TableBody> :
                        <div>
                            <center>
                                <CircularProgress />
                            </center>
                        </div>}
                </Table>
            </TableContainer>

        </div>
    )
}
export default SupplyPlanning;