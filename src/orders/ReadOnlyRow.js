import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    index,
    addFormData,
    handleEditClick
}) => {
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <TableRow key={row.vendorProduct.product.title}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell>{detail(row.vendorProduct.product.title)}</TableCell>
            <TableCell align="center">{row.quantity}</TableCell>
            <TableCell align="center">{row.vendorProduct.product.price}</TableCell>
            <TableCell align="center">{row.vendorProduct.salePrice}</TableCell>
            <TableCell align="center">{row.total}</TableCell>
            <TableCell align="center">{row.deliveredQuantity}</TableCell>
            <TableCell align="center">{row.refund}</TableCell>
            <TableCell align="center">{row.returnQuantity}</TableCell>
            <TableCell align="center">{row.returnRefund}</TableCell>
            <TableCell align="center">{row.productQuality}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row, index)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
