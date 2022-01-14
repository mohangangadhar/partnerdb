<<<<<<< HEAD
import React, {Component} from "react";
=======
import React, { useState, useEffect } from 'react'
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
<<<<<<< HEAD
import {Link} from 'react-router-dom';
import {Box, Button, Grid, Typography} from "@material-ui/core";

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            offset: 0,
            perPage: 10,
            currentPage: 0,
            totalPages: 0,
            startDate: "",
            endDate: "",
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    // For Pagination
    handlePageClick = (event, value) => {
        value = value - 1 < 0 ? 0 : value - 1

        this.setState({offset: value}, () => {
            this.receivedData()
        });
    };

    receivedData() {

        //const apiUrl = `https://www.alfanzo.com:443/`
        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "pageNumber": this.state.offset,
                "pageSize": this.state.perPage,
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": this.state.startDate,
                "endDate": this.state.endDate
=======
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import Picker from "../components/Picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
function ProductList(props) {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const handlePageClick = (event, value) => {
        value = value - 1 < 0 ? 0 : value - 1
        setOffSet(value);
        receivedData();
    };
    const receivedData = () => {
        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageNumber": offSet,
                "pageSize": perPage,
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": startDate,
                "endDate": endDate
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
            })
        };

        fetch(apiUrl + 'product/', requestOptions)
            .then(response => response.json())
<<<<<<< HEAD
            .then(data =>
                this.setState({rows: data.content, totalPages: data.totalPages})
            );

    }

    async componentDidMount() {
        this.receivedData()
    }

    handleButtonClick() {
        this.receivedData()
    }

    render() {
        console.log(this.state);
        const detail = (val) => {
            let jsonVal = JSON.parse(val)
            return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
        }
        return (
            <div>
                <Typography component="h2" variant="h6" style={{color: 'wheat',}} align={"left"} gutterBottom>
                    Products
                </Typography>
                <Box m={1}/>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="spanning table">
                        <TableHead style={{backgroundColor: 'indianred', color: 'white',}}>
                            <TableRow>
                                {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                                <TableCell style={{color: 'wheat'}}>Product Id</TableCell>
                                <TableCell align="left" style={{color: 'wheat'}}>Title</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Price</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>sellsCount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    {/*<TableCell align="left">{index + 1}</TableCell>*/}
                                    <TableCell>
                                        <Link to={{
                                            pathname: '/app/'+this.props.match.params.vendorId+'/product/'+row.id,
                                            id: row.id
                                        }}>{row.id}</Link>
                                    </TableCell>
                                    <TableCell align="left">{detail(row.title)}</TableCell>
                                    <TableCell align="center">{row.price}</TableCell>
                                    <TableCell align="center">{row.sellsCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box m={2}/>
                <Grid container justifyContent={"center"}>
                    <Pagination variant={"text"} color={"primary"}
                                count={this.state.totalPages}
                                onChange={this.handlePageClick}/>
                </Grid>
                <Box m={2}/>
            </div>
        );
    }
}

export default ProductList;
=======
            .then(data => {
                setRows(data.content);
                setTotalPages(data.totalPages);
            });
        console.log(rows, totalPages);
    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(async () => {
        // if (!user) {
        //     console.log(user);
        //     history.replace("/");
        // }
        receivedData()
    }, []);


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
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                {/*<TableCell align="left">{index + 1}</TableCell>*/}
                                <TableCell>
                                    <Link to={{
                                        pathname: '/app/' + props.match.params.vendorId + '/product/' + row.id,
                                        id: row.id
                                    }}>{row.id}</Link>
                                </TableCell>
                                <TableCell align="left">{detail(row.title)}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.sellsCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={handlePageClick} />
            </Grid>
            <Box m={2} />
        </div>
    )
}

export default ProductList
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
