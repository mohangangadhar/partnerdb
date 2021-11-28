import React, { useState, useEffect } from 'react'
import {TableContainer, Table, TableCell, TableHead, TableBody, TableRow, Box, Grid} from '@material-ui/core'
import Pagination from "@material-ui/lab/Pagination";
function WalletTransactions({ walletid }) {
    const [wallet, setWallet] = useState([]);
    const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-18-188-119-57.us-east-2.compute.amazonaws.com:8080/`
    const fetchData = async () => {
        await fetch(apiUrl + `/wallet/${walletid}/transaction`).
            then(response => response.json()).
            then(data => setWallet(data.content)).catch(error => alert(error));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('description') ? jsonVal.description : "";
    }

    return (
        <div>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Amount</TableCell>
                            <TableCell >Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell >Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wallet.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.amount}</TableCell>
                                <TableCell>{data.type}</TableCell>
                                <TableCell>{data.createdAt}</TableCell>
                                <TableCell>{detail(data.meta)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default WalletTransactions;
