import React, { useState, useEffect, Fragment } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import { Box, Grid, Typography, TextField } from "@material-ui/core";
import Picker from "../components/Picker";
import InputAdornment from '@mui/material/InputAdornment';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
function ProductList(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [size, setSize] = useState(50);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filterInStock, setFilterInStock] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [searchquery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [editContactId, setEditContactId] = useState(null);
    const [addFormData, setAddFormData] = useState({
        price: 0,
        stockQuantity: "",
    });
    let urlString;
    let apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
    const receivedData = (val) => {
        if (filterInStock == "OUT OF STOCK") { setSize(100); }
        else { setSize(size == 100 ? 50 : size); }
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
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };
    const handleEditClick = (event, row) => {
        event.preventDefault();
        setAddFormData({
            price: row.product.price,
            stockQuantity: row.product.stockQuantity
        });
        setEditContactId(row.id);
    }

    const handleFormSubmit = async (event, row) => {
        event.preventDefault();
        setisLoading(true);
        let apiUrl;
        apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`;
        let urlString = 'vendor-product-m/' + row.id;
        let productData;
        console.log(apiUrl + urlString);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        await fetch(apiUrl + urlString, requestOptions)
            .then(response => response.json())
            .then(data => {
                productData = {
                    "price": addFormData.price,
                    "productId": data.product.id,
                    "stockQuantity": addFormData.stockQuantity.toString(),
                    "vendorProductId": data.id.toString(),
                    "gstRate": data.product.gstRate == null ? 0 : data.gstrate,
                    "brandName": data.product.brandName == null ? null : data.product.brandName.toString(),
                    "manufacturer": data.product.manufacturer == null ? null : data.product.manufacturer,
                    "about": data.product.about == null ? null : data.product.about,
                    "shelfLife": data.product.shelfLife == null ? null : data.product.shelfLife,
                    "instructionsToStore": data.product.instructionsToStore == null ? null : data.product.instructionsToStore,
                    "usages": data.product.usages == null ? null : data.product.usages,
                    "certification": data.product.certification == null ? null : data.product.certification,
                    "seed": data.product.seed == null ? null : data.product.seed,
                    "salePrice": data.product.salePrice == null ? 0 : data.salePrice,
                    "regularPrice": data.product.regularPrice == null ? 0 : data.regularPrice,
                    "localName": data.product.localName == null || "" ? "" : data.product.localName,
                    "isNaturalProduct": data.product.isNaturalProduct == 1 ? "Y" : "N",
                    "uniqueness": data.product.uniqueness == null ? null : data.product.uniqueness
                };
            });
        console.log(productData);
        let urlStringForUpdate = "vendor-product-m/" + props.match.params.vendorId + "/update";
        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        };
        await fetch(apiUrl + urlStringForUpdate, requestOptionsForUpdate)
            .then(response => response.json())
            .then(data => {
                console.log("put done");
                setAddFormData("");
            }
            );
        receivedData(offSet);
        setEditContactId(null);
    }
    const handleSearch = async (event, query) => {
        event.preventDefault();
        setSearchNotFound(false);
        setisLoading(true);
        console.log(query);
        if (query == "" || query.length == 0) {
            console.log(query.length);
            receivedData(offSet);
            return;
        } else {
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
                    detail(eachprod.product.title.toLowerCase()).includes(query));
                return xyz;
            }
            await fetch(apiUrl + urlString, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setRows(searchProducts(data));
                    if (searchProducts(data).length == 0) { setSearchNotFound(true); setisLoading(false); console.log("hii"); }
                    setisLoading(false);
                });
        }
    }
    const downloadCsvFile = () => {

        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId == "GHS5sVHoRShSE2KmLtvVCGue8X82" ? "export/admin/productexport" : "export/" + props.match.params.vendorId + "/productexport/";
        }

        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
        console.log(apiUrl + urlString);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(apiUrl + urlString, requestOptions)
            .then(response => {
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
            });
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
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
                <div>
                    <Button style={{ marginRight: 10, marginBottom: -50, color: 'white' }} variant={filterInStock == "ALL" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        ev.preventDefault();
                        if (filterInStock == "ALL") { return; }
                        else {
                            setisLoading(true);
                            setFilterInStock("ALL");
                        }

                    }}
                    >ALL</Button>
                    <Button style={{ marginRight: 10, marginBottom: -50, color: 'white' }} variant={filterInStock == "IN STOCK" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        if (filterInStock == "IN STOCK") { return; }
                        else {
                            setisLoading(true);
                            setFilterInStock("IN STOCK");
                        }

                    }}
                    >IN STOCK</Button>
                    <Button style={{ marginRight: 10, marginBottom: -50, color: 'white' }} variant={filterInStock == "OUT OF STOCK" ? 'contained' : "outlined"} color="success" onClick={(ev) => {
                        if (filterInStock == "OUT OF STOCK") { return; }
                        else {
                            setisLoading(true);
                            setFilterInStock("OUT OF STOCK");
                        }

                    }}
                    >OUT OF STOCK</Button>
                </div>
                <div>
                    <TextField
                        id="searchquery"
                        label="Search"
                        value={searchquery}
                        onChange={(event) => {
                            setSearchQuery((event.target.value).toLowerCase());
                            handleSearch(event, (event.target.value).toLowerCase());
                        }}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                            endAdornment: <InputAdornment position="end" style={{ color: "white" }}>
                                <SearchIcon />
                            </InputAdornment>
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        variant='outlined'

                    />
                    {/* <IconButton onClick={async (ev) => {
                        handleSearch(ev);
                    }} type="submit" sx={{ marginTop: 0.8, color: 'white' }} aria-label="search">
                        <SearchIcon />
                    </IconButton> */}
                </div>
            </div>
            <Grid container justifyContent="flex-end" component={Paper}>
                <Button variant='contained' color="success" onClick={() => downloadCsvFile()}
                >Download</Button>
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
                            <TableCell align="center" style={{ color: 'wheat' }}>Status</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {rows.length > 0 && !(isLoading) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <Fragment>
                                    {editContactId === row.id ? (
                                        <EditableRow row={row} vendorId={props.match.params.vendorId} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />) :
                                        <ReadOnlyRow row={row} vendorId={props.match.params.vendorId} handleEditClick={handleEditClick} />}
                                </Fragment>
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
            {
                searchquery == "" ?
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
