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
import Picker from "../components/Picker";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

class UserList extends Component {

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

        // "id": 105,
        //     "name": "Ssubramanyam RAJU",
        //     "email": "ssubramanyamraju@gmail.com",
        //     "username": null,
        //     "password": "$2y$10$s86A4Rz3T6O.o4KkCFYXeOgML1hkqyXMIl0EQtNZinQXxQlxbFlby",
        //     "mobileNumber": "+919908622192",
        //     "mobileVerified": 0,
        //     "isVerified": 0,
        //     "active": 1,
        //     "language": "en",
        //     "notification": null,
        //     "meta": null,
        //     "rememberToken": null,
        //     "createdAt": "2021-10-21 04:33:21",
        //     "updatedAt": "2021-10-21 04:33:21"


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
        let urlString;
        // if (this.props.match.params.hasOwnProperty("vendorId")) {
        //     urlString = this.props.match.params.vendorId === "order"
        //         ? "user/"
        //         : "vendor/" + this.props.match.params.vendorId + "/user/"
        // }

//        const apiUrl = `https://www.alfanzo.com:443/`
        const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-138-113-26.us-east-2.compute.amazonaws.com:8080/`
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

        fetch(apiUrl + 'user/', requestOptions)
            .then(response => response.json())
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
        return (
            <div>
                <Typography component="h2" variant="h6" style={{color: 'wheat',}} align={"left"} gutterBottom>
                    Users
                </Typography>
                <Box m={1}/>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="spanning table">
                        <TableHead style={{backgroundColor: 'indianred', color: 'white',}}>
                            <TableRow>
                                {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                                <TableCell style={{color: 'wheat'}}>User Id</TableCell>
                                <TableCell style={{color: 'wheat'}}>Name</TableCell>
                                <TableCell align="left" style={{color: 'wheat'}}>Email</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Mobile</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Verified</TableCell>
                                <TableCell align="center" style={{color: 'wheat'}}>Created</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {/*<Link to={{*/}
                                        {/*    pathname: '/app/'+this.props.match.params.vendorId+'/order/'+row.id,*/}
                                        {/*    id: row.id*/}
                                        {/*}}>*/}
                                            {row.id}
                                        {/*</Link>*/}
                                    </TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="center">{row.mobileNumber}</TableCell>
                                    <TableCell align="center">{row.mobileVerified === 1 ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">{row.createdAt}</TableCell>
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

export default UserList;