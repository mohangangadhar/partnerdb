import React, {Component} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import {Link} from 'react-router-dom';
import {Box, Grid, Typography} from "@material-ui/core";

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            offset: 0,
            perPage: 10,
            currentPage: 0,
            totalPages: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (event, value) => {
        value = value - 1 < 0 ? 0 : value - 1

        this.setState({
            offset: value
        }, () => {
            this.receivedData()
        });

    };

    receivedData() {
        const apiUrl = `https://18.188.119.57:8443/`
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "pageNumber": this.state.offset,
                "pageSize": this.state.perPage,
                "sortDirection": "asc",
                "sortByKey": "id"
            })
        };
        console.log(requestOptions);
        fetch(apiUrl + 'order/', requestOptions)
            .then(response => response.json())
            .then(data =>
                this.setState({rows: data.content, totalPages: data.totalPages})
            );
    }

    async componentDidMount() {
        this.receivedData()
    }

    render() {
        return (
            <div>
                <Typography component="h2" variant="h6" color="primary" align={"center"} gutterBottom>
                    Recent Orders
                </Typography>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order No</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Link to={{
                                            pathname: 'order',
                                            id: row.id
                                        }}>{row.id}</Link>
                                    </TableCell>
                                    <TableCell align="center">{row.createdAt}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell align="center">Processing</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box m={2}/>
                <Grid container justifyContent={"center"}>
                    <Pagination variant={"text"} color={"primary"} count={this.state.totalPages}
                                onChange={this.handlePageClick}/>
                </Grid>
            </div>
        );
    }
}

export default OrderList;