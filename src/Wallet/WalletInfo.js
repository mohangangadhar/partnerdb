import React, { useState, useEffect } from "react";

import { Button, FormLabel, FormControl, Grid, MenuItem, TableCell, TextField, Typography, Select, Divider } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import WalletTransactions from "./WalletTransactions";
const WalletInfo = ({ data, searchOrder }) => {
    const [wallet, setWallet] = useState({
        walletId: "",
        amount: "",
        type: "",
        accepted: 1,
        meta: {
            type: "earnings",
            source: "order",
            source_id: "",
            description: "",
            source_amount: 70,
            source_payment_type: "Online",
            source_title: "",
        }
    });
    const [toggle, setToggle] = useState(false);

    const handleChangeWallet = (event) => {
        const value = event.target.value;
        setWallet({

            ...wallet,
            amount: value,

        }
        );
    }
    const handleChangeType = (event) => {
        setWallet({

            ...wallet,
            type: event.target.value,

        })
    }
    const handleChangeDescription = (event) => {
        setWallet({

            ...wallet,
            meta: {
                ...wallet.meta,
                description: event.target.value,
            }

        })
    }
    const proceedTransaction = () => {
        wallet.walletId = data.id;
        var source = {
            walletId: wallet.walletId,
            amount: wallet.amount,
            type: wallet.type,
            accepted: wallet.accepted,
            currentBalance: data.balance,
            meta: JSON.stringify(wallet.meta),
        }
        data.wallet = wallet;
        data.wallet.meta = wallet.meta;

        fetch(`https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/wallet/${wallet.walletId}/transaction`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(source),
        })
            .then(data => {
                console.log('Success:', data.json());
                NotificationManager.success('You changes have been updated!', 'Successful!', 1000);
                setToggle(!toggle);
            })
            .catch((error) => {
                console.error('Error:', error);
                NotificationManager.error('Error occurred while making your changes, contact support!', 'Error!');
            });
    }

    return (
        <div style={{ width: '100%' }}>
            <Typography component="h2" variant="h6" style={{ color: 'indianred', }} align={"center"} gutterBottom>
                Wallet Information
            </Typography>
            <Table className="table" aria-label="spanning table">
                <TableBody>
                    <TableRow style={{ backgroundColor: 'white', }}>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormLabel style={{ color: 'indianred' }}>
                                User id: {data.userId}
                            </FormLabel>
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormLabel style={{ color: 'indianred' }}>
                                Name: {data.name}
                            </FormLabel>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormLabel style={{ color: 'indianred' }}>
                                Phone Number: {data.mobileNumber}
                            </FormLabel>
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormLabel style={{ color: 'indianred' }}>
                                Email: {data.email}
                            </FormLabel>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormLabel style={{ color: 'indianred' }}>
                                Balance: Rs {data.balance} /-
                            </FormLabel>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Divider />
            <Typography component="h2" variant="h6" style={{ color: 'blue', marginTop: 20 }} align={"center"} gutterBottom>
                Wallet Update
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormLabel style={{ color: 'indianred' }}>
                                Enter Amount
                            </FormLabel>
                            <TextField
                                fullWidth
                                id="standard-bare"
                                name="amount"
                                variant="outlined"
                                defaultValue={data.balance}
                                value={wallet.amount}
                                onChange={evt => handleChangeWallet(evt)}
                            />
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormControl fullWidth>
                                <FormLabel style={{ color: 'indianred' }}>
                                    Select Withdraw/Deposit
                                </FormLabel>
                                <Select name="type" value={wallet.type} onChange={handleChangeType}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="transaction"
                                >
                                    <MenuItem value="withdraw">Withdraw</MenuItem>
                                    <MenuItem value="deposit">Deposit</MenuItem>
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ borderBottom: "none" }}>
                            <TextField variant="outlined" fullWidth name="description"
                                id="outlined-multiline-static"
                                label="Enter Description"
                                multiline
                                onChange={(event) => handleChangeDescription(event)}
                                rows={4}
                                defaultValue="I would like to Withdraw/Deposit xxx for..."
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ borderBottom: "none", justifyContent: 'center' }}>
                            <Button color="primary"
                                variant="contained"
                                onClick={proceedTransaction}
                            >Add Transaction</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Typography component="h2" variant="h6" style={{ color: 'indianred', }} align={"center"} gutterBottom>
                Transactions
            </Typography>
            {data.id && <WalletTransactions toggle={toggle} walletid={data.id} />}
        </div>
    )
}

export default WalletInfo;