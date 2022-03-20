import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    index,

}) => {
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <TableRow key={index}>
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
                ----</TableCell>
            <TableCell align="center">
                ---</TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
