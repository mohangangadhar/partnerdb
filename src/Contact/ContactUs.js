import React, { useState, useEffect, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TableRow from '@material-ui/core/TableRow';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Container, Divider, Typography, Button, FormControlLabel, FormGroup, FormLabel, TextField, IconButton, Icon } from "@material-ui/core";

const ContactUs = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [query, setQuery] = useState("");
    return (
        <div>
            <Container fixed={true}>

                <Table >
                    <TableContainer>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <FormLabel style={{ color: 'wheat' }}>Contact Us:
                                </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ borderBottom: "none" }}>
                                <TextField
                                    id="email"
                                    fullWidth
                                    label="Email"
                                    onChange={(event) => { setEmail(event.target.value) }}
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
                                    id="phone"
                                    fullWidth
                                    label="Phone No"
                                    onChange={(event) => { setPhone(event.target.value) }}
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
                            <TableCell style={{ borderBottom: "none" }} >
                                <TextField
                                    id="query"
                                    fullWidth
                                    label="Enter Query..."
                                    minRows={3}
                                    multiline
                                    onChange={(event) => { setQuery(event.target.value) }}
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
                <div style={{ display: 'flex', flexDirection: 'row', color: 'white' }}>
                    <h3>Contact Us :</h3>

                    <a href="mailto:jeevamrut@gmail.com">
                        <Button
                            variant="outlined"
                            component="span"
                            size="large"
                            style={{ color: 'white', margin: 8 }}
                        >
                            <EmailIcon />
                        </Button></a>
                    <a href="https://wa.me/919573123971">
                        <Button
                            variant="outlined"
                            component="span"
                            size="large"
                            style={{ color: 'white', margin: 8 }}
                        >
                            <WhatsAppIcon />
                        </Button></a>

                </div>
            </Container>
        </div >
    )
};

export default ContactUs;
