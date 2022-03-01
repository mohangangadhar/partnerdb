import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { APIURL } from '../constants/Constants';
import { Box, Container, Divider, Typography, Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";
import { Item } from "../components/Item";
import { Grid, Stack } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
function ProductDetail(props) {
    const [product, setProduct] = useState({});
    const [stockQ, setStockQ] = useState("");
    const [express, setExpress] = useState("YES");
    const [productPrice, setProductPrice] = useState(0);
    const [gstrate, setGstRate] = useState(0);
    const [brandName, setBrandName] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [shelflife, setShelfLife] = useState("");
    const [instructions, setInstructions] = useState("");
    const [usages, setUsages] = useState("");
    const [saleprice, setSalePrice] = useState(0);
    const [regularprice, setRegularPrice] = useState(0);
    const [certification, setCertification] = useState("");
    const [localname, setLocalName] = useState("");
    const [isNatural, setIsNatural] = useState("");
    const [uniqueness, setUniqueness] = useState("");
    const [seed, setSeed] = useState("");
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        let urlString = 'vendor-product-m/' + props.match.params.productId;
        console.log(APIURL + urlString);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(APIURL + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setProductPrice(data.product.price);
                setStockQ(data.product.stockQuantity);
                setGstRate(data.product.gstRate);
                setBrandName(data.product.brandName === null ? "" : data.product.brandName);
                setManufacturer(data.product.manufacturer);
                setAbout(data.product.about);
                setShelfLife(data.product.shelfLife);
                setExpress(data.product.express == 0 || null ? "NO" : "YES",)
                setInstructions(data.product.instructionsToStore);
                setUsages(data.product.usages);
                setCertification(data.product.certification);
                setSeed(data.product.seed);
                setSalePrice(data.salePrice);
                setUniqueness(data.product.uniqueness);
                setIsNatural(data.product.isNaturalProduct == 1 ? "Y" : "N");
                setLocalName(data.product.localName);
            }
            );
    }, [loading]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        let productdata = {
            "price": productPrice,
            "productId": product.product.id,
            "stockQuantity": stockQ.toString(),
            "vendorProductId": product.id.toString(),
            "gstRate": gstrate == null ? 0 : "",
            "brandName": brandName == null ? "" : brandName,
            "manufacturer": manufacturer == null ? "" : manufacturer,
            "about": about == null ? "" : about,
            "shelfLife": shelflife == null ? "" : shelflife,
            "instructionsToStore": instructions == null ? "" : instructions,
            "usages": usages == null ? "" : usages,
            "certification": certification == null ? "" : certification,
            "seed": seed == null ? "" : seed,
            "salePrice": saleprice == null ? 0 : saleprice,
            "localName": localname == null ? "" : localname,
            "isNaturalProduct": isNatural,
            "uniqueness": uniqueness == null ? "" : uniqueness,
            "express": express == "YES" ? 1 : 0,
        };
        console.log(productdata);
        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2"
                ? "vendor-product-m/" + "GHS5sVHoRShSE2KmLtvVCGue8X82" + "/update"
                : "vendor-product-m/" + props.match.params.vendorId + "/update";
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productdata)
        };
        await fetch(APIURL + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
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
                                        id="stockQ"
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
                                    <TextField
                                        id="brandName"
                                        label="Enter BrandName"
                                        value={brandName}
                                        onChange={(event) => setBrandName(event.target.value)}
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
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                        <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">GST Rate</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            style={{ height: 50, color: 'white' }}
                                            id="demo-simple-select-disabled"
                                            value={gstrate}
                                            onChange={(event) => setGstRate(event.target.value)}
                                            label="GST Rate"
                                        >
                                            <MenuItem value="0">
                                                0
                                            </MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                            <MenuItem value="10">10</MenuItem>
                                            <MenuItem value="20">20</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <TextField
                                        id="manufacturer"
                                        label="Manufacturer:"
                                        multiline
                                        value={manufacturer}
                                        onChange={(event) => setManufacturer(event.target.value)}
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
                                        id="shelflife"
                                        label="ShelfLife:"
                                        multiline
                                        value={shelflife}
                                        onChange={(event) => setShelfLife(event.target.value)}
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
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <TextField
                                        id="instructions"
                                        fullWidth
                                        label="Instructions To Store:"
                                        multiline
                                        value={instructions}
                                        onChange={(event) => setInstructions(event.target.value)}
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

                                <TableCell>
                                    <TextField
                                        id="usages"
                                        label="Usages:"
                                        multiline
                                        value={usages}
                                        onChange={(event) => setUsages(event.target.value)}
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
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <TextField
                                        id="certification"
                                        label="Enter Certification"
                                        value={certification}
                                        onChange={(event) => setCertification(event.target.value)}
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
                                        id="seed"
                                        label="Seed:"
                                        multiline
                                        value={seed}
                                        onChange={(event) => setSeed(event.target.value)}
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
                                        id="saleprice"
                                        label="Sale Price:"
                                        multiline
                                        value={saleprice}
                                        onChange={(event) => setSalePrice(event.target.value)}
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
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                        <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Express Product?</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-disabled"
                                            style={{ height: 50, color: 'white' }}
                                            value={express}
                                            onChange={(event) => setExpress(event.target.value)}
                                            label="Express or Regular?"
                                        >
                                            <MenuItem value="YES">
                                                {express == "YES" ? "Yes" : 'Yes'}
                                            </MenuItem>
                                            <MenuItem value="NO">{express == "NO" ? "No" : "No"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell style={{ borderBottom: "none" }}>
                                    <TextField
                                        id="localname"
                                        label="Local Name:"
                                        multiline
                                        value={localname}
                                        onChange={(event) => setLocalName(event.target.value)}
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
                                    <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                        <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Is Natural?</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-disabled"
                                            style={{ height: 50, color: 'white' }}
                                            value={isNatural}
                                            onChange={(event) => setIsNatural(event.target.value)}
                                            label="Is it Natural?"
                                        >
                                            <MenuItem value="Y">
                                                {isNatural == "Y" ? "Yes" : "Yes"}
                                            </MenuItem>
                                            <MenuItem value="N">{isNatural == "N" ? "No" : "No"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <TextField
                                        fullWidth
                                        id="about"
                                        label="Write About..."
                                        multiline
                                        value={about}
                                        onChange={(event) => setAbout(event.target.value)}
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
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <TextField
                                        fullWidth
                                        id="uniqueness"
                                        label="Write Uniqueness..."
                                        multiline
                                        value={uniqueness}
                                        onChange={(event) => setUniqueness(event.target.value)}
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
                </center>
            }
        </div >
    )
}

export default ProductDetail
