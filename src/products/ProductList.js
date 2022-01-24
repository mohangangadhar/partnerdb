import React, { useState, useEffect } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import { Box, Button, Grid, Typography, TextField } from "@material-ui/core";
import Picker from "../components/Picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
function ProductList(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [size, setSize] = useState(10);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filterInStock, setFilterInStock] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [searchquery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    let urlString;
    let apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
    const receivedData = (val) => {
        if (filterInStock == "OUT OF STOCK") { setSize(100); }
        else { setSize(size == 100 ? 10 : size); }
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === ":vendorId"
                ? "product/"
                : "vendor-product-m/" + props.match.params.vendorId + "/query?size=" + size + "&page=" + val;
        }
        console.log(urlString);
        let requestOptions;
        requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                switch (filterInStock) {
                    case "ALL":
                        setRows(data.content);
                        break;
                    case "IN STOCK":
                        setRows(data.content.filter(stock => stock.product.stockQuantity > 0));
                        break;
                    case "OUT OF STOCK":
                        setRows(data.content.filter(stock => stock.product.stockQuantity == 0));
                        break;
                    default:
                        setRows(data.content);
                        break;
                }
                setTotalPages(data.totalPages);
                setisLoading(false);
            });

    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        setisLoading(true);
        setSearchQuery("");
        setSearchNotFound(false);
        receivedData(offSet);
    }, [offSet, filterInStock, size]);
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    const handleSearch = async (event) => {
        event.preventDefault();
        setSearchNotFound(false);
        setisLoading(true);
        console.log(searchquery);
        if (searchquery == "") {
            setFilterInStock("ALL");
            return;
        }
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === ":vendorId"
                ? "product/"
                : "vendor-product-m/" + props.match.params.vendorId + "/query?size=50&page=0";
        }
        let requestOptions;
        console.log(apiUrl + urlString);
        requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const searchProducts = (data) => {
            let xyz = data.content.filter((eachprod) =>
                detail(eachprod.product.title.toLowerCase()).includes(searchquery));
            return xyz;
        }
        await fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRows(searchProducts(data));
                if (searchProducts(data).length == 0) { setSearchNotFound(true); setisLoading(false); console.log("hii"); }
                setisLoading(false);
                console.log(searchProducts(data));
            });

    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                    Products
                </Typography>
                <div>

                    <TextField
                        id="searchquery"
                        label="Search"
                        value={searchquery}
                        onChange={(event) => setSearchQuery(event.target.value)}
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
                    <IconButton onClick={async (ev) => {
                        handleSearch(ev);
                    }} type="submit" sx={{ marginTop: 0.8, color: 'white' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">{size} Products per Page</InputLabel>
                    <Select
                        style={{ height: 50, color: 'white' }}
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-disabled"
                        value={size}
                        onChange={(event) => {
                            setSize(event.target.value);
                        }}
                        label="Get Products"
                    >
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="50">50</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Get Products</InputLabel>
                    <Select
                        style={{ height: 50, color: 'white' }}
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-disabled"
                        value={filterInStock}
                        onChange={(event) => {
                            setFilterInStock(event.target.value);
                        }}
                        label="Get Products"
                    >
                        <MenuItem value="ALL">ALL</MenuItem>
                        <MenuItem value="IN STOCK">IN STOCK</MenuItem>
                        <MenuItem value="OUT OF STOCK">OUT OF STOCK</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Grid container justifyContent="flex-end" component={Paper}>
                <ArrowDownwardOutlinedIcon fontSize={"large"} style={{ marginRight: "5px" }}
                    onClick={() => { }} />
            </Grid>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Product Id</TableCell>
                            <TableCell align="left" style={{ color: 'wheat' }}>Title</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Price</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Stock Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.product.id}>
                                    <TableCell>
                                        <Link to={{
                                            pathname: '/app/' + props.match.params.vendorId + '/product/' + row.id,
                                            id: row.product.id
                                        }}>{row.id}</Link>
                                    </TableCell>
                                    <TableCell align="left">{detail(row.product.title)}</TableCell>
                                    <TableCell align="center">{row.product.price}</TableCell>
                                    <TableCell align="center">{row.product.stockQuantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> :
                        <div>
                            <center>

                                {searchNotFound ? <h1 style={{ color: 'black' }}>Not Found</h1> : <CircularProgress />}
                            </center>
                        </div>
                    }
                </Table>
            </TableContainer>
            <Box m={2} />
            {searchquery == "" ?
                <Grid container justifyContent={"center"}>
                    <Pagination variant={"text"} color={"primary"}
                        count={totalPages}
                        onChange={(event, value) => setOffSet(value - 1)} />
                </Grid> : <b></b>
            }
            <Box m={2} />
        </div >
    )
}

export default ProductList
