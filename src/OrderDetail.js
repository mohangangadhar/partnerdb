import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Container, Divider, FormLabel} from "@material-ui/core";

class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "order": {},
            "orderProductList": []
        }
    }

    componentDidMount() {
        let apiUrl;
        apiUrl = `https://www.alfanzo.com:443/`;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(apiUrl + 'order/' + this.props.location.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    this.setState({order: data.order, orderProductList: data.orderProductList})
                }
            );
    }

    render() {
        console.log(this.state);
        const detail = (val) => {
            let jsonVal = JSON.parse(val)
            return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
        }
        let total = 0;

        if (this.state.orderProductList.length > 0) {
            this.state.orderProductList.forEach(row => total = row.total + total)
        }

        return (
            <div>
                <Container maxWidth="md">
                    <Table className="table" aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <FormLabel> Order No : {this.props.location.id} </FormLabel>
                                </TableCell>
                                <TableCell>
                                    <FormLabel>Date: {this.state.order.createdAt} </FormLabel>
                                </TableCell>
                                <TableCell>
                                    <FormLabel>Status: Processing</FormLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Container>
                <Divider/>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Desc</TableCell>
                                <TableCell align="center">Qty</TableCell>
                                <TableCell align="center">Unit Cost</TableCell>
                                <TableCell align="center">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.orderProductList.length > 0 ? this.state.orderProductList.map((row, index) => (
                                <TableRow key={row.vendorProduct.product.title}>
                                    <TableCell>{detail(row.vendorProduct.product.title)}</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="center">{row.vendorProduct.product.price}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                </TableRow>
                            )) : ""}
                            {/*<TableRow>*/}
                            {/*    <TableCell rowSpan={3}/>*/}
                            {/*    <TableCell colSpan={2}>Subtotal</TableCell>*/}
                            {/*    <TableCell align="right">{120}</TableCell>*/}
                            {/*</TableRow>*/}
                            {/*<TableRow>*/}
                            {/*    <TableCell>Tax</TableCell>*/}
                            {/*    <TableCell align="right">{`${(0.5 * 100).toFixed(0)} %`}</TableCell>*/}
                            {/*    <TableCell align="right">{100}</TableCell>*/}
                            {/*</TableRow>*/}
                            <TableRow>
                                <TableCell rowSpan={3}/>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default OrderDetail;