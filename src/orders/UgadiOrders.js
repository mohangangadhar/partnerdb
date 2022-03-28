import React, { useEffect, useState } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Badge from '@mui/material/Badge';
import { auth } from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';


import { APIURL, detail, GetRequestOptions } from '../constants/Constants';
import TableTitles from './TableTitles';

const UgadiOrders = (props) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    useEffect(async () => {
        setisLoading(true);
        await fetch(APIURL + "order/ugadi-orders", GetRequestOptions).
            then(response => response.json()).
            then(data => {
                setRows(data);
                setisLoading(false);
            }).catch(err => {
                alert(err);
                setisLoading(true);
            });
    }, [])
    return (
        <div>


            <h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>
                Ugadi Orders
                <Badge style={{ marginLeft: '15px' }} color="success" badgeContent={rows.length}></Badge>
            </h2>




            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles auth={auth} />
                    {rows.length > 2 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Link to={{
                                            pathname: '/app/' + props.match.params.vendorId + '/order/' + row.id,
                                            id: row.id
                                        }}>{row.id}</Link>
                                    </TableCell>
                                    <TableCell >{<p>{row.user.id} : {row.user.name} </p>}</TableCell>
                                    <TableCell align="center">
                                        {new Date(Date.parse(row.createdAt + " UTC")).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center" >{row.dispatchWeek}</TableCell>
                                    <TableCell align="center" >{row.user.pincode}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell >{detail(row.vendor.name)}</TableCell>
                                    <TableCell align="center">{row.couponCode}</TableCell>
                                    <TableCell align="center">{row.deliveryStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> : <div>Loading</div>


                    }

                </Table>
            </TableContainer>
        </div>
    )
}

export default UgadiOrders