import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    index,
    handleEditClick,
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
            <TableCell align="center">
                {row.primarySupplier}</TableCell>
            <TableCell align="center">
                {row.orderedQuantity == 0 ? Math.round((row.skuQuantity * row.skuCount * (1 + row.buffer)) * 100) / 100
                    : row.orderedQuantity}</TableCell>
            <TableCell align="center">
                {row.orderedUom}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row, index)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
