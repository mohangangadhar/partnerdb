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

class OrderList extends Component {

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
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.downloadCsvFile = this.downloadCsvFile.bind(this);
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
        if (this.props.match.params.hasOwnProperty("vendorId")) {
            urlString = this.props.match.params.vendorId === "order"
                ? "order/"
                : "vendor/" + this.props.match.params.vendorId + "/order/"
        }

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

        fetch(apiUrl + urlString, requestOptions)
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

    downloadCsvFile() {

        let urlString;
        if (this.props.match.params.hasOwnProperty("vendorId")) {
            urlString = this.props.match.params.vendorId === "order"
                ? "export/"
                : "export/" + this.props.match.params.vendorId + "/order/"
        }

        // const apiUrl = `https://www.alfanzo.com:443/`
        const apiUrl = `https://localhost:443/`
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "pageNumber": 0, // Offset is default to 0
                "pageSize": 150, // Currently number of records set to 150
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": this.state.startDate,
                "endDate": this.state.endDate
            })
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

    render() {
        return (
            <div>
                <Typography component="h2" variant="h6" style={{color: 'wheat',}} align={"left"} gutterBottom>
                    Orders
                </Typography>
                <Grid container justifyContent="flex-end" component={Paper}>
                    <Picker dateChange={this.setStartDate} label={"Start Date"}/>
                    <Picker dateChange={this.setEndDate} label={"End Date"}/>
                    <Button variant={"contained"} color={"primary"} size={"small"} style={{marginRight: "5px"}}
                            onClick={this.handleButtonClick}>Show</Button>
                    <ArrowDownwardOutlinedIcon fontSize={"large"} style={{marginRight: "5px"}}
                                               onClick={this.downloadCsvFile}/>
                </Grid>
                <Box m={1}/>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="spanning table">
                        <TableHead style={{backgroundColor: 'indianred', color: 'white',}}>
                            <TableRow>
                                {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                                <TableCell style={{color: 'wheat'}}>Order No</TableCell>
                                <TableCell style={{color: 'wheat'}}>User Id</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Date</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Total</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    {/*<TableCell align="left">{index + 1}</TableCell>*/}
                                    <TableCell>
                                        <Link to={{
                                            pathname: '/app/'+this.props.match.params.vendorId+'/order/'+row.id,
                                            id: row.id
                                        }}>{row.id}</Link>
                                    </TableCell>
                                    <TableCell >{row.userId}</TableCell>
                                    <TableCell align="center">{row.createdAt}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell align="center">{row.deliveryStatus}</TableCell>
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

export default OrderList;