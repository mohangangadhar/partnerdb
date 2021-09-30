import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Box, Container, Divider, FormLabel, TextField} from "@material-ui/core";
import {Item} from "./Item";
import {Grid} from "@mui/material";


class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "product": {
                "title":""
            }
        }
    }

    componentDidMount() {
        let apiUrl;
        apiUrl = `https://www.alfanzo.com:443/`;
        console.log(this.props);
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(apiUrl + 'product/' + this.props.location.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                    this.setState({product: data})
                }
            );
    }

    render() {
        const detail = (val) => {

            let jsonVal = val ? JSON.parse(val):""
            return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
        }
        let total = 0;
        console.log(this.state);
        return (
            <div>
                <Container maxWidth="md" fixed={true}>
                    <Grid>
                        <Item/>
                    </Grid>
                    <Box m={2}/>
                    <Table>
                        <TableContainer>
                            <TableRow>
                                <TableCell style={{borderBottom:"none"}}>
                                    <FormLabel style={{color: 'wheat'}}> Product Id : {this.props.location.id} </FormLabel>
                                </TableCell>
                                <TableCell style={{borderBottom:"none"}}>
                                    <FormLabel style={{color: 'wheat'}}> Name : {detail(this.state.product.title)} </FormLabel>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{borderBottom:"none"}}>
                                    <FormLabel style={{color: 'wheat'}}> Price : Rs {this.state.product.price} </FormLabel>
                                </TableCell>
                                <TableCell style={{borderBottom:"none"}}>
                                    <FormLabel style={{color: 'wheat'}}> Created : {this.state.product.createdAt} </FormLabel>
                                </TableCell>
                            </TableRow>
                        </TableContainer>
                    </Table>
                    <Divider/>
                </Container>
            </div>
        );
    }
}

export default ProductDetail;