import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableCell, TableHead, TableBody, TableRow, CircularProgress } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { APIURL } from '../constants/Constants';
function WalletTransactions({ walletid, toggle }) {
    const [wallet, setWallet] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [offSet, setOffSet] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = async () => {
        setisLoading(true);

        await fetch(APIURL + `wallet/${walletid}/transaction?size=10&page=${offSet}`).
            then(response => response.json()).
            then(data => {
                setWallet(data.content);
                setTotalPages(data.totalPages);
                setisLoading(false);

            }).catch(error => alert(error));
        setisLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [toggle, offSet]);

    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('description') ? jsonVal.description : "";
    }

    return (
        <div>
            {isLoading ?
                <CircularProgress />
                :
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Amount</TableCell>
                                <TableCell >Type</TableCell>
                                <TableCell >Earlier Balance</TableCell>
                                <TableCell >Date</TableCell>
                                <TableCell >Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {wallet.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{data.amount}</TableCell>
                                    <TableCell>{data.type}</TableCell>
                                    <TableCell>{data.currentBalance}</TableCell>
                                    <TableCell>{data.createdAt}</TableCell>
                                    <TableCell>{detail(data.meta)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    value={offSet + 1}
                    count={totalPages}
                    onChange={(event, value) => setOffSet(value - 1)} />
            </Grid>
        </div>
    )
}

export default WalletTransactions;
