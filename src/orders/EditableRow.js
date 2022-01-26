import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TextField } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const EditableRow = ({
    row,
    index,
    addFormData,
    handleEditFormChange,
    handleFormSubmit
}) => {
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <TableRow key={row.vendorProduct.product.title}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell>{detail(row.vendorProduct.product.title)}</TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter a name..."
                name="quantity"
                value={addFormData.quantity}
                onChange={handleEditFormChange}
            ></input></TableCell>
            <TableCell align="center">{row.vendorProduct.product.price}</TableCell>
            <TableCell align="center">{row.total}</TableCell>
            <TableCell align="center"><Button variant="contained" on color="success" onClick={(event) => handleFormSubmit(event, row, index)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;



