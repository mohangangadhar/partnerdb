import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TextField } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const EditableRow = ({
    row,
    vendorId,
    addFormData,
    handleEditFormChange,
    handleFormSubmit
}) => {
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <TableRow key={row.product.id}>
            <TableCell>
                <Link to={{
                    pathname: '/app/' + vendorId + '/product/' + row.id,
                    id: row.product.id
                }}>{row.id}</Link>
            </TableCell>
            <TableCell align="left">{detail(row.product.title)}</TableCell>
            <TableCell align="center">
                <input
                    type="text"
                    placeholder="Enter a name..."
                    name="price"
                    value={addFormData.price}
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell align="center">
                <input
                    type="text"
                    placeholder="Enter a name..."
                    name="stockQuantity"
                    value={addFormData.stockQuantity}
                    onChange={handleEditFormChange}
                ></input></TableCell>
            <Button variant="contained" on color="success" onClick={(event) => handleFormSubmit(event, row)}>Save</Button>
        </TableRow>
    );
};

export default EditableRow;
