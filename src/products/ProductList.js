import React, { useState, useEffect, Fragment } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';

import Button from '@mui/material/Button';

import { Box, Grid, TextField } from "@material-ui/core";

import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import ProductsPerPage from './Components/ProductsPerPage';
import FilteredInStock from './Components/FilteredInStock';
import SearchProducts from './Components/SearchProducts';
import TableTitles from './Components/TableTitles';
function ProductList(props) {
    const [rows, setRows] = useState([]);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [isRowLoading, setisRowLoading] = useState(false);
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
        id: 0,
        title: "",
        price: 0,
        express: "YES",
        stockQuantity: "",
    });
    const [editedRowData, setEditedRowData] = useState([]);
    const RequestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let urlString;
    const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`;
    const receivedData = async (val) => {
        setSearchNotFound(false);
        if (filterInStock == "OUT OF STOCK") { setSize(100); }
        else { setSize(size == 100 ? 50 : size); }
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === ":vendorId"
                ? "product/"
                : "vendor-product-m/" + props.match.params.vendorId + "/query?size=" + size + "&page=" + val;
        }
        await fetch(apiUrl + urlString, RequestOptions)
            .then(response => response.json())
            .then(data => {
                switch (filterInStock) {
                    case "ALL":
                        setEditedRowData(data.content);
                        break;
                    case "IN STOCK":
                        setEditedRowData(data.content.filter(stock => stock.product.stockQuantity > 0));
                        break;
                    case "OUT OF STOCK":
                        setEditedRowData(data.content.filter(stock => stock.product.stockQuantity == 0));
                        break;
                    default:
                        setEditedRowData(data.content);
                        break;
                }
                setTotalPages(data.totalPages);
                setisLoading(false);
                if (data.content && data.content.length == 0) { setSearchNotFound(true) }
            });

    }
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
            id: row.product.id,
            title: row.product.title,
            price: row.product.price,
            express: row.product.express == 0 || null ? "NO" : "YES",
            stockQuantity: row.product.stockQuantity
        });
        setEditContactId(row.id);
    }
    const uploadBackEnd = async (row, tempFormData) => {
        let urlString = 'vendor-product-m/' + row.id;
        let productData;

        setisApiLoading(true);
        await fetch(apiUrl + urlString, RequestOptions)
            .then(response => response.json())
            .then(data => {
                productData = {
                    "price": tempFormData.price,
                    "productId": data.product.id,
                    "stockQuantity": tempFormData.stockQuantity.toString(),
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
                    "uniqueness": data.product.uniqueness == null ? null : data.product.uniqueness,
                    "express": tempFormData.express == "YES" ? 1 : 0,
                };
            });
        let urlStringForUpdate = "vendor-product-m/" + props.match.params.vendorId + "/update";
        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        };
        await fetch(apiUrl + urlStringForUpdate, requestOptionsForUpdate)
            .then(response => response.json())
            .then(data => {
                setisApiLoading(false);
            }
            ).catch((err) => alert('something wrong' + err));
    }
    const handleFormSubmit = async (event, row, tempFormData) => {
        event.preventDefault();
        setAddFormData("");
        setisRowLoading(true);
        let ind;
        let xyz = row;
        xyz = { ...xyz };
        xyz.product.price = tempFormData.price;
        xyz.product.stockQuantity = tempFormData.stockQuantity.toString();
        xyz.product.express = tempFormData.express == "YES" ? 1 : 0;
        for (let i = 0; i < editedRowData.length; i++) {
            if (row.id == editedRowData[i].id) {
                ind = i;
                break;
            }
        }
        editedRowData[ind] = xyz;
        console.log(editedRowData[ind]);
        setEditContactId(null);
        setisRowLoading(false);
        uploadBackEnd(row, tempFormData);
    }
    const handleSearch = async (event, query) => {
        event.preventDefault();
        console.log(query);
        if (query == "" || query.length == 0) {
            setisLoading(true);
            receivedData(offSet);
            return;
        } else if (query.length > 2) {
            setSearchNotFound(false);
            setisLoading(true);
            if (props.match.params.hasOwnProperty("vendorId")) {
                urlString
                    = "vendor-product-m/" + props.match.params.vendorId + "/query/";
            }
            const searchProducts = (data) => {
                console.log(data.length);
                return data;
            }
            await fetch(apiUrl + urlString + query, RequestOptions)
                .then(response => response.json())
                .then(data => {
                    setEditedRowData(data);
                    if (searchProducts(data).length == 0) { setSearchNotFound(true); setisLoading(false); }
                    setisLoading(false);
                });
        }
    }
    const downloadCsvFile = () => {
        setisLoading(true);
        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId == "GHS5sVHoRShSE2KmLtvVCGue8X82" ? "export/admin/productexport/" : "export/" + props.match.params.vendorId + "/productexport/";
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
                    a.href = url
                    a.download = filename;
                    a.click();
                });
                setisLoading(false);
            });
    }
    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <center><h2 style={{ marginTop: -9, marginBottom: 0, fontStyle: 'italic', color: 'white' }}>Products</h2></center>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <ProductsPerPage size={size} setSize={setSize} />
                <div>
                    <FilteredInStock checkText="ALL" filterInStock={filterInStock} setisLoading={setisLoading} setFilterInStock={setFilterInStock} />
                    <FilteredInStock checkText="IN STOCK" filterInStock={filterInStock} setisLoading={setisLoading} setFilterInStock={setFilterInStock} />
                    <FilteredInStock checkText="OUT OF STOCK" filterInStock={filterInStock} setisLoading={setisLoading} setFilterInStock={setFilterInStock} />
                </div>
                <div>
                    <SearchProducts setSearchQuery={setSearchQuery} searchquery={searchquery}
                        handleSearch={handleSearch} />
                </div>
            </div>
            <Grid container justifyContent="flex-end" component={Paper}>
                <Button variant='contained' color="success" onClick={() => downloadCsvFile()}
                >Download</Button>
            </Grid>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles />
                    {editedRowData.length > 0 && !(isLoading) ?
                        <TableBody>
                            {editedRowData.map((row, index) => (
                                <Fragment>
                                    {editContactId === row.id ?
                                        <>
                                            {!(isRowLoading) ?
                                                <EditableRow row={row} vendorId={props.match.params.vendorId} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />
                                                : <TableRow><TableCell>Updating...</TableCell></TableRow>}</>
                                        :
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
