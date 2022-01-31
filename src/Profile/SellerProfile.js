import React, { useState, useEffect, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Box, Container, Divider, Typography, Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";

const SellerProfile = () => {
    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [pan, setPan] = useState("");
    const [gst, setGst] = useState("");
    const [coi, setCoi] = useState("");
    return (
        <div>
            <Container fixed={true}>

                <Table >
                    <TableContainer>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}> Edit Store Details:
                                </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <TextField
                                    id="storeName"
                                    fullWidth
                                    label="Enter Store Name"

                                    onChange={(event) => { setStoreName(event.target.value) }}
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
                                    id="storeAddress"
                                    fullWidth
                                    label="Enter Store Address"
                                    multiline
                                    onChange={(event) => { setStoreAddress(event.target.value) }}
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
                                    id="pan"
                                    fullWidth
                                    label="Enter PAN Number"

                                    onChange={(event) => { setPan(event.target.value) }}
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
                            <TableRow >
                                <TableCell style={{ borderBottom: 'none' }}>
                                    <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Upload Your PAN Card:</h3>
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
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: 'none' }}>
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Upload GST Card:</h3>
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
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Upload FSSAI:</h3>
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
                            <TableCell style={{ borderBottom: "none" }}>
                                <TextField
                                    id="pan"
                                    fullWidth
                                    label="Enter COI"

                                    onChange={(event) => { setCoi(event.target.value) }}
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
                        </TableRow >
                        <TableRow>
                            <TableCell style={{ borderBottom: 'none' }}>
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Upload Labor License:</h3>
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
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Upload LOGO:</h3>
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
                                <h3 style={{ color: 'white', fontWeight: 'lighter' }}>Upload WallPaper:</h3>
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
