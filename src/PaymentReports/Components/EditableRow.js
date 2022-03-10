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
            <TableCell align="center"><input
                type="text"
                placeholder="Enter Not Delivered Quantity"
                name="sellerInvoice"
                value={addFormData.sellerInvoice}
                onChange={handleEditFormChange}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter Not Delivered Quantity"
                name="paymentDate"
                value={addFormData.paymentDate}
                onChange={handleEditFormChange}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter Not Delivered Quantity"
                name="paymentRefNumber"
                value={addFormData.paymentRefNumber}
                onChange={handleEditFormChange}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter Not Delivered Quantity"
                name="poNumber"
                value={addFormData.poNumber}
                onChange={handleEditFormChange}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter Not Delivered Quantity"
                name="invoiceNumber"
                value={addFormData.invoiceNumber}
                onChange={handleEditFormChange}
            ></input></TableCell>

            <TableCell align="center"><Button variant="contained" on color="success" onClick={(event) => handleFormSubmit(event, row, addFormData, index)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;