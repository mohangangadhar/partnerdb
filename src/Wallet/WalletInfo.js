import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import {Button, FormLabel, FormControl,Grid, MenuItem, TableCell, TextField, Typography, Select, Divider} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import CustomTextField from "../CustomTextField";
import {InputOutlined, SearchOutlined} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {NotificationManager} from "react-notifications";

class WalletInfo extends Component {
    constructor(props) {
        super(props);
        this.updateBalance = this.updateBalance.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWallet = this.handleChangeWallet.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.proceedTransaction = this.proceedTransaction.bind(this);
        this.state = {
            data: this.props.data,
            wallet: {
                walletId: "",
                amount:"",
                type:"",
                accepted: 1,
                meta: {
                    type: "earnings",
                    source: "order",
                    source_id: "",
                    description: "",
                    source_amount: 70,
                    source_payment_type: "Online",
                    source_title: ""
                },
            }
        }
    }

    handleChange(event) {
        this.setState({balance: event.target.value})
    }
         handleChangeWallet(event){
            // const name = event.target.name;
            const value = event.target.value;
             this.setState({
             wallet : { 
                     ...this.state.wallet,
                     amount : value,
                    }
             }
             );
             console.log(this.state.wallet);
         }
         handleChangeType(event){
             this.setState({
                 wallet :{
                    ...this.state.wallet,
                    type : event.target.value,
                 }
             })
             console.log(this.state.wallet.type);
         }
         handleChangeDescription(event){
            this.setState({
                wallet : { 
                    ...this.state.wallet,
                    meta : {
                        ...this.state.wallet.meta,
                        description : event.target.value,
                    }
                }
            })
                console.log(this.state.wallet.meta);
         }
         proceedTransaction(){
                    this.state.data.wallet = this.state.wallet;
                    this.state.data.wallet.meta = this.state.wallet.meta;
                    console.log(this.state.data);
                    fetch(`https://www.alfanzo.com:443/wallet/${this.state.wallet.walletId}`,{
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true'
                        },
                        body: JSON.stringify(this.state.data.wallet),
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
                <Divider/>
                <Typography component="h2" variant="h6" style={{color: 'blue',marginTop:20}} align={"center"} gutterBottom>
                    Wallet Update
                </Typography>
                <Table>
                    <TableBody>
                    <TableRow>
                            <TableCell style={{borderBottom: "none"}}>
                                <FormLabel style={{color: 'indianred'}}>
                                  Enter Amount
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    id="standard-bare"
                                    name = "amount"
                                    variant="outlined"
                                    defaultValue={this.state.data.balance}
                                    value={this.state.wallet.amount}
                                    onChange={evt => this.handleChangeWallet(evt)}
                                />
                            </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell style={{borderBottom: "none"}}>
                                <FormControl fullWidth>
                            <FormLabel style={{color: 'indianred'}}>
                                  Select Withdraw/Deposit
                                </FormLabel>
                            <Select name="type" value={this.state.wallet.type} onChange={this.handleChangeType}
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
                                <TextField variant="outlined" fullWidth name="description"
                                        id="outlined-multiline-static"
                                        label="Enter Description"
                                        multiline
                                        onChange={(event)=>this.handleChangeDescription(event)}
                                        rows={4}
                                        defaultValue="I would like to Withdraw/Deposit xxx for..."
                                        />
                         <Table>
                             <TableCell style={{display:'flex',justifyContent:'center'}}>
                                <Button color="primary"
                                    variant="contained"
                                    onClick={this.proceedTransaction}
                                >Proceed</Button>
                                </TableCell>
                                </Table>
                                    </TableRow>
                        </TableBody>
                        </Table>
            </div>
        )
    }
}

export default WalletInfo;