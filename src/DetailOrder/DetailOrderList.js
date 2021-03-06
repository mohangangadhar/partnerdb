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
import {Box, Button, Grid, Typography} from "@material-ui/core";
import Picker from "../components/Picker";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

class DetailOrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            page: 1,
            per_page: 15,
            pagination: {},
            startDate: "",
            endDate: "",
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    // For Pagination
    handlePageClick = (event, value) => {
        this.setState({page: value}, () => {
            this.receivedData()
        });
    };

    receivedData() {
        let urlString = `?page=` + this.state.page + `&perPage=` + this.state.per_page;

        // if (this.props.match.params.hasOwnProperty("vendorId")) {
        //     urlString = this.props.match.params.vendorId === "order"
        //         ? "order/"
        //         : "vendor/" + this.props.match.params.vendorId + "/order/"
        // }

        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/fb`
//        const apiUrl = `https://localhost:443/order/fb`
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(resp =>
                this.setState({rows: resp.data, pagination: resp.meta})
            );
    }

    async componentDidMount() {
        this.receivedData()
    }

    setStartDate(e) {
        this.setState({startDate: e.target.value})
    }

    setEndDate(e) {
        this.setState({endDate: e.target.value})
    }

    handleButtonClick() {
        this.receivedData()
    }

    render() {
        return (
            <div>
                <Typography component="h2" variant="h6" style={{color: 'wheat',}} align={"left"} gutterBottom>
                    Detail Orders
                </Typography>
                <Box m={1}/>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="spanning table">
                        <TableHead style={{backgroundColor: 'indianred', color: 'white',}}>
                            <TableRow>
                                <TableCell style={{color: 'wheat'}}>Order No</TableCell>
                                <TableCell style={{color: 'wheat'}}>Name</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Date</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Total</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Delivery</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Payment GW </TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Payment Status </TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Order Status </TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Vendor </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.user.name}</TableCell>
                                    <TableCell align="center">{row.created_at.substring(0, 10)}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell align="center">{row.delivery_fee}</TableCell>
                                    <TableCell align="center">{row.payment.payment_method.title}</TableCell>
                                    <TableCell align="center">{row.payment.status}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{row.vendor.name.substring(0, 10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box m={2}/>
                <Grid container justifyContent={"center"}>
                    <Pagination variant={"text"} color={"primary"}
                                count={this.state.pagination.last_page}
                                onChange={this.handlePageClick}/>
                </Grid>
                <Box m={2}/>
            </div>
        );
    }
}

export default DetailOrderList;