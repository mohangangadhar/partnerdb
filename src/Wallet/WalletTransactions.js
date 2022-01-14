import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableCell, TableHead, TableBody, TableRow } from '@material-ui/core'
function WalletTransactions({ walletid }) {
    console.log(walletid);
    const [wallet, setWallet] = useState([]);
    const fetchData = async () => {
        await fetch(`https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/wallet/${walletid}/transaction`).
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
                            <TableCell >Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wallet.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.amount}</TableCell>
                                <TableCell>{data.type}</TableCell>
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
