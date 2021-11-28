import React, {Component} from "react";
import {NotificationManager} from "react-notifications";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import {Box, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {SearchOutlined} from "@material-ui/icons";
import TableBody from "@material-ui/core/TableBody";
import WalletInfo from "./WalletInfo";

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.searchOrder = this.searchOrder.bind(this);
        this.state = {
            inputValue: "",
            data: ""
        }
    }

    updateInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    searchOrder() {
        this.setState({data: ""});
        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-18-188-119-57.us-east-2.compute.amazonaws.com:8080/`
        // this.set State({loading: true});
        fetch(apiUrl + '/wallet/' + this.state.inputValue)
            .then(res => res.json())
            .then((data) => {
                NotificationManager.success('Found it!', 'Successful!', 1000);
                this.setState({
                    // orderVal: JSON.parse(data.order_result).Items,
                    // orderInfo: JSON.parse(data.order_result).Items[0],
                    // productVal: JSON.parse(data.product_result).Items,
                    data: data,
                    loading: false
                });
            })
            .catch((error) => {
                NotificationManager.error('Unable to retreive your record', 'Failed!');
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{backgroundColor: 'indianred', color: 'white',}}>
                        <TableRow>
                            <TableCell align="center" style={{color: 'wheat'}}>
                                <TextField
                                    fullWidth
                                    id="standard-bare"
                                    variant="outlined"
                                    defaultValue="Enter Phone Number"
                                    onChange={evt => this.updateInputValue(evt)}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton>
                                                <SearchOutlined
                                                    onClick={this.searchOrder}
                                                />
                                            </IconButton>),
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Box m={2}/>
                {(this.state.data.name !== undefined || this.state.data !== "") ?
                    <WalletInfo data={this.state.data}/> : ""}
                <Box m={2}/>
                {}
            </TableContainer>
        );
    }

}

export default Wallet;