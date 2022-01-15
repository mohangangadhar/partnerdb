import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, Container, Divider, Typography, Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";
import { Item } from "../components/Item";
import { Grid, Stack } from "@mui/material";
import CustomTextField from "../CustomTextField";
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
function ProductDetail(props) {
    const [product, setProduct] = useState({});
    const [stockQ, setStockQ] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        // if (!user) {
        //     history.push("/");
        // }
        let apiUrl;
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`;
        console.log(props.location.id);
        let urlString = 'vendor-product-m/' + props.match.params.productId;
        console.log(apiUrl + urlString);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setProductPrice(data.product.price);
                setStockQ(data.stockQuantity);
            }
            );
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        let productdata = {
            "productId": product.product.id,
            "vendorProductId": props.match.params.productId,
            "price": productPrice,
            "stockQuantity": stockQ
        };
        console.log(stockQ + ":" + productPrice);
        let apiUrl;
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`;
        console.log(props.match.params.productId);
        let urlString = "vendor-product-m/" + props.match.params.vendorId + "/update";
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productdata)
        };
        await fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            }
            ).then(history.goBack);
    }
    const detail = (val) => {
        let jsonVal = val ? JSON.parse(val) : ""
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    let total = 0;
    const styles = theme => ({
        textField: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500
        },
        input: {
            color: 'white'
        }
    });
    return (
        <div>
            {Object.keys(product).length > 2 && !(loading) ?
                <Container maxWidth="md" fixed={true}>
                    <Grid>
                        <Item />
                    </Grid>
                    <Box m={2} />
                    <Table>
                        <TableContainer>
                            <TableRow>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <FormLabel style={{ color: 'wheat' }}> Name
                                        : {detail(product.product.title)} </FormLabel>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <TextField
                                        id="productName"
                                        label="Enter Product Price"
                                        value={productPrice}
                                        onChange={(event) => setProductPrice(event.target.value)}
                                        InputProps={{
                                            style: {
                                                color: "white",
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: { color: '#fff' },
                                        }}
                                        variant='outlined'
                                    />
                                </TableCell>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <TextField
                                        id="productName"
                                        label="Enter Stock Quantity"
                                        value={stockQ}
                                        onChange={(event) => setStockQ(event.target.value)}
                                        InputProps={{
                                            style: {
                                                color: "white",
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: { color: '#fff' },
                                        }}
                                        variant='outlined'
                                    />
                                </TableCell>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <Button variant='contained' color="success" onClick={(ev) => {
                                        setLoading(true);
                                        handleSubmit(ev);
                                    }}
                                    >Submit</Button>
                                </TableCell>
                            </TableRow>
                        </TableContainer>
                    </Table>
                </Container> :
                <center>
                    <CircularProgress />
                </center>}
        </div>
    )
}

export default ProductDetail
