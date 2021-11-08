import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Container, Divider, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";
import { Item } from "../components/Item";
import { Grid } from "@mui/material";
import CustomTextField from "../CustomTextField";
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
function ProductDetail(props) {
    const [product, setProduct] = useState({});
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        if (!user) {
            history.push("/");
        }
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
            }
            );
    }, []);
    const productNameChange = (e) => {
        console.log(e.target.value);
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
                        <TableRow style={{ color: 'wheat' }}>
                            {/*<CustomTextField*/}
                            {/*    id="productName"*/}
                            {/*    value={detail( product.title)}*/}
                            {/*    onChange={this.productNameChange}*/}
                            {/*    margin="normal"*/}
                            {/*/>*/}
                            <TableCell style={{ borderBottom: "none" }}>
                                <TextField
                                    id="productName"
                                    default={detail(product.title)}
                                    value={detail(product.title)}
                                    onChange={() => productNameChange()}
                                    color='secondary'
                                />
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

            </Container>
        </div>
    )
}

export default ProductDetail
