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
        <Table style={{ border: '2px', backgroundColor: 'grey' }}>
            <TableRow >
                <TableCell align="center">
                    <TextField
                        id="skuUom"
                        label="SkuUom"
                        multiline
                        name="skuUom"
                        value={poData.skuUom}
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
                        id="stagingArea"
                        label="Staging Area"

                        name="staginArea"
                        value={poData.staginArea}
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
                        id="skuCount"
                        label="skuCount"

                        name="skuCount"
                        value={poData.skuCount}
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
                        id="stagingArea"
                        label="Order Id Count"

                        name="orderIdCount"
                        value={poData.orderIdCount}
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
            </TableRow>
            <TableRow >
                <TableCell align="center">
                    <TextField
                        id="suggestedQty"
                        label="suggestedQty"

                        name="suggestedQty"
                        value={poData.suggestedQty}
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
                        id="primarySupplier"
                        label="primarySupplier"

                        name="primarySupplier"
                        value={poData.primarySupplier}
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

                <TableCell align="center">
                    <TextField
                        id="receivedQty"
                        label="receivedQty"

                        name="receivedQty"
                        value={poData.receivedQty}
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
                        id="wastageQty"
                        label="wastageQty"

                        name="wastageQty"
                        value={poData.wastageQty}
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
                        id="qualityRating"
                        label="qualityRating"

                        name="qualityRating"
                        value={poData.qualityRating}
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
        </Table>
    );
};

export default AddPoData;
