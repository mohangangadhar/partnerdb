import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    index,
    addFormData,
    handleEditFormChange,
    handleFormSubmit,
    addRow
}) => {

    return (
        <TableRow key={index}>
            <TableCell align="center">
                <button onClick={() => addRow(row, index)}>+</button></TableCell>
            <TableCell align="center">
                {index}</TableCell>
            <TableCell align="center">
                {row.vendorName}</TableCell>
            <TableCell align="center">
                {row.article}</TableCell>
            <TableCell align="center">
                {row.skuQuantity}</TableCell>
            <TableCell align="center">
                {row.skuUom}</TableCell>
            <TableCell align="center">
                {row.staginArea}</TableCell>
            <TableCell align="center">
                {row.skuCount}</TableCell>
            <TableCell align="center">
                {row.orderId}</TableCell>
            <TableCell align="center">
                {row.skuQuantity * row.skuCount}</TableCell>
            <TableCell align="center">
                {Math.round((row.skuQuantity * row.skuCount * (1 + row.buffer)) * 100) / 100}</TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter Primary Supplier"
                name="primarySupplier"
                value={addFormData.primarySupplier}
                onChange={(event) => handleEditFormChange(event, index)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter orderedQuantity"
                name="orderedQuantity"
                value={addFormData.orderedQuantity}
                onChange={(event) => handleEditFormChange(event, index)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter orderedUom"
                name="orderedUom"
                value={addFormData.orderedUom}
                onChange={(event) => handleEditFormChange(event, index)}
            ></input></TableCell>
            <TableCell align="center"><Button variant="contained" on color="success" onClick={(event) => handleFormSubmit(event, row, addFormData, index)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
