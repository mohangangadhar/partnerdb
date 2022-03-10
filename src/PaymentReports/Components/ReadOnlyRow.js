import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    index,
    handleEditClick
}) => {
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <TableRow key={index}>
            <TableCell align="center">
                {row.orderType == 0 ? "Regular" : "Express"}</TableCell>
            <TableCell align="center">
                {detail(row.vendorName)}</TableCell>
            <TableCell align="center">
                {row.orderDateTime}</TableCell>
            <TableCell align="center">
                {row.orderId}</TableCell>
            <TableCell align="center">
                {row.customerId}</TableCell>
            <TableCell align="center">
                {row.customerName}</TableCell>
            <TableCell align="center">
                {row.orderStatus}</TableCell>
            <TableCell align="center">
                {row.productId}</TableCell>
            <TableCell align="center">
                {detail(row.productName)}</TableCell>
            <TableCell align="center">
                {row.orderedQuantity}</TableCell>
            <TableCell align="center">
                {row.unitPrice}</TableCell>
            <TableCell align="center">
                {row.orderedValue}</TableCell>
            <TableCell align="center">
                {row.shippingCost}</TableCell>
            <TableCell align="center">
                {row.deliveredQuantity}</TableCell>
            <TableCell align="center">
                {row.productQuality}</TableCell>
            <TableCell align="center">
                {row.refundValue}</TableCell>
            <TableCell align="center">
                {row.finalOrderValue}</TableCell>
            <TableCell align="center">
                {row.gstRate}</TableCell>
            <TableCell align="center">
                {row.finalTaxableValue}</TableCell>
            <TableCell align="center">
                {row.sellerInvoiceValue}</TableCell>
            <TableCell align="center">
                {row.sellerInvoice}</TableCell>
            <TableCell align="center">
                {row.paymentDate}</TableCell>
            <TableCell align="center">
                {row.paymentRefNumber}</TableCell>
            <TableCell align="center">
                {row.poNumber}</TableCell>
            <TableCell align="center">
                {row.invoiceNumber}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row, index)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
