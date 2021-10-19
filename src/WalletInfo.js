import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import {Button, FormLabel, Grid, TableCell, TextField, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import CustomTextField from "./CustomTextField";
import {InputOutlined, SearchOutlined} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {NotificationManager} from "react-notifications";

class WalletInfo extends Component {
    constructor(props) {
        super(props);
        this.updateBalance = this.updateBalance.bind(this);
        this.state = {
            data: this.props.data
        }
    }

    handleChange(event) {
        this.setState({balance: event.target.value})
    }

    updateBalance() {
        this.state.data.balance = this.state.balance;
        console.log(this.state);
        fetch("https://www.alfanzo.com:443/wallet/" + this.state.data.mobileNumber, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(this.state.data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                NotificationManager.success('You changes have been updated!', 'Successful!', 1000);
            })
            .catch((error) => {
                console.error('Error:', error);
                NotificationManager.error('Error occurred while making your changes, contact support!', 'Error!');
            });
    }

    render() {
        return (
            <div>
                <Typography component="h2" variant="h6" style={{color: 'indianred',}} align={"center"} gutterBottom>
                    Wallet Information
                </Typography>
                <Table className="table" aria-label="spanning table">
                    <TableBody>
                        <TableRow style={{backgroundColor: 'white',}}>
                            <TableCell style={{borderBottom: "none"}}>
                                <FormLabel style={{color: 'indianred'}}>
                                    User id: {this.state.data.userId}
                                </FormLabel>
                            </TableCell>
                            <TableCell style={{borderBottom: "none"}}>
                                <FormLabel style={{color: 'indianred'}}>
                                    Name: {this.state.data.name}
                                </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{borderBottom: "none"}}>
                                <FormLabel style={{color: 'indianred'}}>
                                    Phone Number: {this.state.data.mobileNumber}
                                </FormLabel>
                            </TableCell>
                            <TableCell style={{borderBottom: "none"}}>
                                <FormLabel style={{color: 'indianred'}}>
                                    Email: {this.state.data.email}
                                </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{borderBottom: "none"}}>
                                <FormLabel style={{color: 'indianred'}}>
                                    Balance:
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    id="standard-bare"
                                    variant="outlined"
                                    defaultValue={this.state.data.balance}
                                    onChange={evt => this.handleChange(evt)}
                                />
                            </TableCell>
                            <TableCell style={{borderBottom: "none"}}>
                                <Button
                                    variant="contained"
                                    onClick={this.updateBalance}
                                >Save</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default WalletInfo;