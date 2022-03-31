import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import { Box, Container, Divider, Typography, Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";

const AddPoData = ({
    poData,
    handlePoDataChange,
    handleAddPoData,
    setToggle
}) => {
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15
    }
    return (
        <div>
            <TableRow >

                <TableCell align="center">
                    <TextField
                        id="totalQtyReq"
                        label="Total Quantity Req"

                        name="totalQtyReq"
                        value={poData.totalQtyReq}
                        onChange={handlePoDataChange}
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

                <TableCell align="center">
                    <TextField
                        id="orderedQty"
                        label="orderedQty"

                        name="orderedQty"
                        value={poData.orderedQty}
                        onChange={handlePoDataChange}
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

                <TableCell align="center"> <TextField
                    id="orderedUom"
                    label="orderedUom"

                    name="orderedUom"
                    value={poData.orderedUom}
                    onChange={handlePoDataChange}
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
                <TableCell align="center">
                    <TextField
                        id="productName"
                        label="productName"
                        name="productName"
                        value={poData.productName}
                        onChange={handlePoDataChange}
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
                <TableCell align="center">
                    <TextField
                        id="vendorName"
                        label="vendorName"

                        name="vendorName"
                        value={poData.vendorName}
                        onChange={handlePoDataChange}
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
                <TableCell align="center">
                    <TextField
                        id="totalPay"
                        label="Price per Uom"

                        name="totalPay"
                        value={poData.totalPay}
                        onChange={handlePoDataChange}
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
                <div>
                    <TableCell><Button variant="contained"
                        onClick={(event) => handleAddPoData(event, poData)}>Add</Button></TableCell>
                    <TableCell><Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }}
                        onClick={(event) => setToggle(true)}>Cancel</Button></TableCell>
                </div>
            </TableRow>
        </div>
    );
};

export default AddPoData;
