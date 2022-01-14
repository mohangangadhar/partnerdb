import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
import {TableContainer, Table, TableCell, TableHead, TableBody, TableRow, Box, Grid} from '@material-ui/core'
import Pagination from "@material-ui/lab/Pagination";
function WalletTransactions({ walletid }) {
    const [wallet, setWallet] = useState([]);
    const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
    const fetchData = async () => {
        await fetch(apiUrl + `/wallet/${walletid}/transaction`).
=======
import { TableContainer, Table, TableCell, TableHead, TableBody, TableRow } from '@material-ui/core'
function WalletTransactions({ walletid }) {
    console.log(walletid);
    const [wallet, setWallet] = useState([]);
    const fetchData = async () => {
        await fetch(`https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/wallet/${walletid}/transaction`).
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
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
<<<<<<< HEAD
                            <TableCell >current Balance</TableCell>
                            <TableCell>Date</TableCell>
=======
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
                            <TableCell >Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wallet.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.amount}</TableCell>
                                <TableCell>{data.type}</TableCell>
<<<<<<< HEAD
                                <TableCell>{data.currentBalance}</TableCell>
                                <TableCell>{data.createdAt}</TableCell>
=======
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
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
