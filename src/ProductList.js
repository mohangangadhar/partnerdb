import React, {Component} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import {Link} from 'react-router-dom';
import {Box, Button, Grid, Typography} from "@material-ui/core";
import Picker from "./Picker";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

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
//        this.downloadCsvFile = this.downloadCsvFile.bind(this);
    }

    // For Pagination
    handlePageClick = (event, value) => {
        value = value - 1 < 0 ? 0 : value - 1

        this.setState({offset: value}, () => {
            this.receivedData()
        });
    };

    receivedData() {
        let urlString;
        // if (this.props.match.params.hasOwnProperty("vendorId")) {
        //     urlString = this.props.match.params.vendorId === "product"
        //         ? "product/"
        //         : "vendor/" + this.props.match.params.vendorId + "/order/"
        // }

        const apiUrl = `https://www.alfanzo.com:443/`
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
            })
        };

        fetch(apiUrl + 'product/', requestOptions)
            .then(response => response.json())
            .then(data =>
                this.setState({rows: data.content, totalPages: data.totalPages})
            );

    }

    async componentDidMount() {
        this.receivedData()
    }

    setStartDate(e) {
        this.setState({startDate: e.target.value})
    }

    setEndDate(e) {
        this.setState({endDate: e.target.value})
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