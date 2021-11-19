import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        // if (!user) {
        //     history.push("/");
        // }
        let apiUrl;
        apiUrl = `https://www.alfanzo.com:443/`;
        console.log(props.location.id);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl + 'product/' + props.location.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                console.log(data.title);
            }
            );
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        let productdata = { title: productName, price: productPrice };
        console.log(productName + ":" + productPrice);
        let apiUrl;
        apiUrl = `https://www.alfanzo.com:443/`;
        console.log(props.location.id);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productdata)
        };
        await fetch(apiUrl + 'product/' + props.location.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                console.log(data.title);
            }
            );

    }
    const detail = (val) => {

        let jsonVal = val ? JSON.parse(val) : ""
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    let total = 0;
    return (
        <div>
            <Container maxWidth="md" fixed={true}>
                <Grid>
                    <Item />
                </Grid>
                <Box m={2} />
                <Table>
                    <TableContainer>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}> Product Id
                                    : {props.location.id} </FormLabel>
                            </TableCell>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}> Name
                                    : {detail(product.title)} </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}> Price :
                                    Rs {product.price} </FormLabel>
                            </TableCell>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}> Created
                                    : {product.createdAt} </FormLabel>
                            </TableCell>
                        </TableRow>
                    </TableContainer>
                </Table>
                <Divider />
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ minWidth: 300 }}>
                        <Stack spacing={2}>
                            <CardContent style={{ marginBottom: -20 }}>
                                <Typography variant="h5" component="div">
                                    Edit Product
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <TextField
                                    id="productName"
                                    label="Enter Product Name"
                                    value={productName}
                                    onChange={(event) => setProductName(event.target.value)}
                                    variant='filled'
                                />
                                <TextField
                                    id="productName"
                                    label="Enter Product Price"
                                    value={productPrice}
                                    onChange={(event) => setProductPrice(event.target.value)}
                                    variant='filled'
                                />
                                <Button variant='contained' color="primary" onClick={(ev) => handleSubmit(ev)}
                                >Submit</Button>
                            </CardActions>
                        </Stack>
                    </Card>
                </Box>
            </Container>
        </div>
    )
}

export default ProductDetail
