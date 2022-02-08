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
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15
    }
    return (
        <TableRow key={row.product.id}>
            <TableCell>
                <Link to={{
                    pathname: '/app/' + vendorId + '/product/' + row.id,
                    id: row.product.id
                }}>{row.id}</Link>
            </TableCell>
            <TableCell align="left">{row.vendorId}</TableCell>
            <TableCell align="left">{detail(row.product.title)}</TableCell>
            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name="express" value={addFormData.express} onChange={handleEditFormChange}>
                    <option style={styleOptions} value="YES">YES</option>
                    <option style={styleOptions} value="NO">NO</option>
                </select>
            </TableCell>
            <TableCell align="center">
                <input
                    type="text"
                    placeholder="Enter Units"
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
            {/* <TableCell align="center"><Button variant="text" color="success">Active</Button></TableCell> */}
            <TableCell align="center"><Button variant="contained" on color="success" onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;
