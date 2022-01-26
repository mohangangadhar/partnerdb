import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, Container, Divider, Typography, Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";
import { Item } from "../components/Item";
import { Grid, Stack } from "@mui/material";
const SellerProfile = () => {
    return (
        <div>
            <Container maxWidth="md" fixed={true}>

                <Table>
                    <TableContainer>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}> Edit Profile :
                                </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <TextField
                                    id="first Name"
                                    fullWidth
                                    label="Enter First Name"

                                    onChange={() => { }}
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
                                    id="lastname"
                                    fullWidth
                                    label="Enter Last Name"

                                    onChange={() => { }}
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
                                    id="Shop Name"
                                    label="Shop Name"


                                    onChange={() => { }}
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
                                <Button variant='contained' color="success" onClick={() => {

                                }}
                                >Submit</Button>
                            </TableCell>
                        </TableRow>
                    </TableContainer>
                </Table>
            </Container>
        </div>
    )
};

export default SellerProfile;
