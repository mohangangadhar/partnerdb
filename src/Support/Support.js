
import React, { useState, useEffect } from 'react';
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


const Support = () => {
    const [messages, setMessages] = useState([]);
    // const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDcxMzQxNDQ3NmFjZjMzNmZlZTAzYjk0YTBiNGRkMjJiOWE0NTk3M2U5Y2MyN2M5Y2U1OTdjZjJhMmJhZDIwZTQ4Y2M0OWVjODU0MGVjZTIiLCJpYXQiOjE2NDQzMDYyOTgsIm5iZiI6MTY0NDMwNjI5OCwiZXhwIjoxNjc1ODQyMjk3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.cPLfFwvU-9Ga26YBaGc_dnLKHj1hbDC4ozf8YA6nX-Z72XMN-nOMWN8v-7uchBvIjSWfN-i4_J4k9bQMO0c-o8J1RncvlEu55EUTfTaHd5L8lYovuCiNYp0C5aNlK4uoYg9ms7koMcEt0n4Sd818y9SLWAXOOFJ_aNQHNl69Fpj9fMRs5l2idMonnEK-IMIHbZ-1JQsLo2m5DkjASfFi3sTDywsRJ4Zj78ajN7kvtyOT2yokc4DdDlcYCeFwtHfoNtm7M9yY4uNpiPTtagKDmzBpnB9wRsXcyEO_M8KJVBPLGmB6DzOov5_D0P4Ir61Oae6ZEmyul7upnHqKqBCRPi7w3k-oM1Z8yljgvag7AcVZjNcVdUX4nB8KDt3FQHiBrIf6FN39xZUNivQ_aeBottFLbB6x5-zoYxFB0n4tI7rk5GpuIhHFNEa2-c3Jx5QNKaZ_ohHaPGu8VfTowZ0p9l_Lh6NodHlnTaeMRXDCJgcpTgstEOW-eIOaBjCH7raj3tE6oXSxc47r23Ro1-hGXWsHkcDATDPX5g4HXzLwWUksgkPnQ8ignDAUwrWywcqX_smIpnR2PGVdUXoJNiL9DElpwQs7cwQy4gCsuFdEs_fZOYwYz5OiGhaIxcIKEJsvoGZ-ItuHfWTYVUQqE-sgGPTNpGc7Fa_dqSmbhkK2PNo";
    const RequestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
    const handleChange = async (page) => {
        setisLoading(true);
        let apiUrl = `https://admin.ityme.in/api/admin/supports?page=${page}&per_page=15`;
        await fetch(apiUrl, RequestOptions)
            .then(response => response.json())
            .then(data => {
                setMessages(data.data.reverse());
                setTotalPages(data.meta.last_page)
            }).catch(err => console.log(err));
        setisLoading(false);
    }
    useEffect(async () => {
        setisLoading(true);
        let apiUrl = `https://admin.ityme.in/api/admin/supports?page=1&per_page=15`;
        await fetch(apiUrl, RequestOptions)
            .then(response => response.json())
            .then(data => {
                handleChange(data.meta.last_page);
            }).catch(err => console.log(err));
    }, []);
    return <div>
        <TableContainer component={Paper}>
            <Table className="table" aria-label="spanning table">
                <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                    <TableRow>
                        <TableCell style={{ color: 'wheat' }}>Id</TableCell>
                        <TableCell style={{ color: 'wheat' }}>Name</TableCell>
                        <TableCell style={{ color: 'wheat' }}>Email</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Message</TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>Created At</TableCell>
                    </TableRow>
                </TableHead>
                {messages.length > 0 && !(isLoading) ?
                    <TableBody>
                        {messages.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell >{row.id}</TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell align="center" >{row.email}</TableCell>
                                <TableCell align="center">{row.message}</TableCell>
                                <TableCell align="center">{new Date(Date.parse(row.created_at)).toLocaleString()}</TableCell>
                            </TableRow>
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
                onChange={(event, value) => handleChange(totalPages - value + 1)} />
        </Grid>
        <Box m={2} />
    </div >;
};

export default Support;
