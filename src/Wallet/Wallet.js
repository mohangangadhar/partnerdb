import React, { useState, useEffect } from 'react'
import { NotificationManager } from "react-notifications";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { Box, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { SearchOutlined } from "@material-ui/icons";
import TableBody from "@material-ui/core/TableBody";
import WalletInfo from "./WalletInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
function Wallet() {
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState("");
    const updateInputValue = (event) => {
        setInputValue(event.target.value);
    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(async () => {
        if (!user) {
            console.log(user);
            history.replace("/");
        }
    }, []);
    const searchOrder = () => {
        setData("");

        // this.set State({loading: true});
        fetch("https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/" + '/wallet/' + inputValue)
            .then(res => res.json())
            .then((data) => {
                NotificationManager.success('Found it!', 'Successful!', 1000);
                setData(data);
            })
            .catch((error) => {
                NotificationManager.error('Unable to retreive your record', 'Failed!');
                // this.setState({
                //     loading: false
                // })
            })
    }
    return (
        <TableContainer component={Paper}>
            <Table className="table" aria-label="spanning table">
                <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                    <TableRow>
                        <TableCell align="center" style={{ color: 'wheat' }}>
                            <TextField
                                fullWidth
                                id="standard-bare"
                                variant="outlined"
                                defaultValue="Enter Phone Number"
                                onChange={(evt) => updateInputValue(evt)}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <SearchOutlined
                                                onClick={() => searchOrder()}
                                            />
                                        </IconButton>),
                                }} Wallet
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Box m={2} />
            {(data.name !== undefined || data !== "") ?
                <WalletInfo data={data} /> : ""}
            <Box m={2} />
            { }
        </TableContainer>
    )
}

export default Wallet
