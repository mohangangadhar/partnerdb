import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Box, Container, Divider, FormLabel} from "@material-ui/core";

class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {
                "order": {
                    "id": 182,
                    "notes": null,
                    "meta": "{}",
                    "isGuest": 0,
                    "customerName": null,
                    "customerEmail": null,
                    "customerMobile": null,
                    "subTotal": 477,
                    "taxes": 0,
                    "deliveryFee": 25,
                    "total": 502,
                    "discount": 0,
                    "type": "ASAP",
                    "scheduledOn": "2021-08-20 13:14:02",
                    "vendorId": 10,
                    "userId": 11,
                    "createdAt": "2021-08-20 13:14:02",
                    "distanceTravelled": 0,
                    "updatedAt": "2021-08-20 13:14:02"
                },
                "orderProductList": [
                    {
                        "id": 309,
                        "quantity": 1,
                        "total": 27,
                        "orderId": 182,
                        "vendorProduct": {
                            "id": 530,
                            "price": 27,
                            "salePrice": null,
                            "salePriceFrom": null,
                            "salePriceTo": null,
                            "stockQuantity": 1000,
                            "stockLowThreshold": 0,
                            "vendorId": 10,
                            "productId": 530,
                            "createdAt": "2021-07-31 12:17:07",
                            "updatedAt": "2021-07-31 12:17:07",
                            "product": {
                                "id": 530,
                                "title": "{\"en\": \"Sweet Corn - 1 Pc\"}",
                                "detail": "{\"en\": \"Sweet Corn - 1 Pc\"}",
                                "meta": "{\"prescription\": \"0\"}",
                                "price": 27,
                                "owner": "vendor",
                                "parentId": null,
                                "attributeTermId": null,
                                "createdAt": "2021-07-31 12:17:07",
                                "updatedAt": "2021-07-31 12:17:07",
                                "sellsCount": 0
                            }
                        },
                        "createdAt": "2021-08-20 13:14:02",
                        "updatedAt": "2021-08-20 13:14:02"
                    },
                    {
                        "id": 310,
                        "quantity": 1,
                        "total": 450,
                        "orderId": 182,
                        "vendorProduct": {
                            "id": 527,
                            "price": 450,
                            "salePrice": null,
                            "salePriceFrom": null,
                            "salePriceTo": null,
                            "stockQuantity": 18,
                            "stockLowThreshold": 0,
                            "vendorId": 10,
                            "productId": 527,
                            "createdAt": "2021-07-31 12:17:07",
                            "updatedAt": "2021-07-31 12:17:07",
                            "product": {
                                "id": 527,
                                "title": "{\"en\": \"Coconut Oil - 1 Ltr\"}",
                                "detail": "{\"en\": \"Coconut Oil - 1 Ltr\"}",
                                "meta": "{\"prescription\": \"0\"}",
                                "price": 450,
                                "owner": "vendor",
                                "parentId": null,
                                "attributeTermId": null,
                                "createdAt": "2021-07-31 12:17:07",
                                "updatedAt": "2021-07-31 12:17:07",
                                "sellsCount": 0
                            }
                        },
                        "createdAt": "2021-08-20 13:14:02",
                        "updatedAt": "2021-08-20 13:14:02"
                    }
                ]
            }
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        console.log(this.state.order.orderProductList);
        const detail = (val) => {
            let jsonVal = JSON.parse(val)
            return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
        }
        let total = 0;
        if (this.state.order.orderProductList.length > 0) {
            this.state.order.orderProductList.forEach(row => total = row.total + total)
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
                                    <FormLabel>Date: {this.state.order.order.createdAt} </FormLabel>
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
                            {this.state.order.orderProductList.length > 0 ? this.state.order.orderProductList.map((row, index) => (
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