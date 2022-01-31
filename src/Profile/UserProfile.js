import React, { useState, useEffect, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Box, Container, Divider, Typography, Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";

const UserProfile = () => {
    const [userName, setUserName] = useState("");
    const [identity, setIdentity] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("male");
    return (
        <div>
            <Container fixed={true}>

                <Table >
                    <TableContainer>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}> Edit User Details:
                                </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}>User Id: 8920
                                </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <TextField
                                    id="userName"
                                    fullWidth
                                    value="prachin"
                                    disabled
                                    onChange={(event) => { setUserName(event.target.value) }}
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
                            <TableCell style={{ borderBottom: "none" }} colSpan={3}>
                                <TextField
                                    id="address"
                                    fullWidth
                                    label="Enter Address"
                                    multiline
                                    onChange={(event) => { setAddress(event.target.value) }}
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
                        <TableRow >
                            <TableCell style={{ borderBottom: 'none' }}>
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Upload Identity[Aadhaar/PAN]:</h3>
                            </TableCell>
                            <TableCell style={{ borderBottom: 'none' }}>
                                <Fragment>
                                    <input
                                        color="primary"
                                        accept="image/*"
                                        type="file"
                                        id="icon-button-file"
                                        style={{ display: 'none', }}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            size="large"
                                            color="primary"
                                        >
                                            <PhotoCamera />
                                        </Button>
                                    </label>
                                </Fragment>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: 'none' }}>

                                <FormControl style={{ color: 'white' }}>
                                    <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: 'white' }}>Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />

                                    </RadioGroup>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ borderBottom: 'none' }}>
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Role: ADMIN</h3>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ borderBottom: 'none' }}>
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Permissions: EDIT</h3>
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
        </div >
    )
};

export default UserProfile;
