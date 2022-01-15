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
import { Box, Button, Grid, Typography } from "@material-ui/core";
import Picker from "../components/Picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
function ProductList(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const receivedData = (val) => {
        let urlString;
        if (props.match.params.hasOwnProperty("vendorId")) {
            urlString = props.match.params.vendorId === ":vendorId"
                ? "product/"
                : "vendor-product-m/" + props.match.params.vendorId + "/query?size=10&page=" + val;
        }

        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
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
                console.log(data.content);
                setRows(data.content);
                setTotalPages(data.totalPages);
            });

    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        receivedData(offSet);
    }, [offSet]);
    const handleButtonClick = () => {
        receivedData()
    }
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <div>
            <Typography component="h2" variant="h6" style={{ color: 'wheat', }} align={"left"} gutterBottom>
                Products
            </Typography>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                            <TableCell style={{ color: 'wheat' }}>Product Id</TableCell>
                            <TableCell align="left" style={{ color: 'wheat' }}>Title</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Price</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>sellsCount</TableCell>
                        </TableRow>
                    </TableHead>
                    {rows.length > 2 ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.product.id}>
                                    {/*<TableCell align="left">{index + 1}</TableCell>*/}
                                    <TableCell>
                                        <Link to={{
                                            pathname: '/app/' + props.match.params.vendorId + '/product/' + row.id,
                                            id: row.product.id
                                        }}>{row.id}</Link>
                                    </TableCell>
                                    <TableCell align="left">{detail(row.product.title)}</TableCell>
                                    <TableCell align="center">{row.product.price}</TableCell>
                                    <TableCell align="center">{row.product.sellsCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> :
                        <center>
                            <CircularProgress />
                        </center>
                    }
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={(event, value) => setOffSet(value - 1)} />
            </Grid>
            <Box m={2} />
        </div>
    )
}

export default ProductList
