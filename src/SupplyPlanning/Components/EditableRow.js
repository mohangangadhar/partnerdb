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
    addRow,
    suppliers
}) => {
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15
    };
    return (
        <TableRow key={index}>
            <TableCell align="center">
                <button onClick={() => addRow(row, index)}>+</button></TableCell>
            <TableCell align="center">
                {index}</TableCell>
            <TableCell align="center">
                {row.vendorName}</TableCell>
            <TableCell align="center">
                {row.productName}</TableCell>
            <TableCell align="center">
                {row.skuUom}</TableCell>
            <TableCell align="center">
                {row.staginArea}</TableCell>
            <TableCell align="center">
                {row.skuCount}</TableCell>
            <TableCell align="center">
                {row.orderIdCount}</TableCell>
            <TableCell align="center">
                {row.totalQtyReq}</TableCell>
            <TableCell align="center">
                {row.suggestedQty}</TableCell>
            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name="primarySupplier" value={addFormData.primarySupplier} onChange={(event) => handleEditFormChange(event, index)}>
                    {!addFormData.primarySupplier !== null && <option style={styleOptions} value="">Primary Supplier:</option>}
                    <>
                        {suppliers.map((data, index) => (
                            <option style={styleOptions} value={data.shortCode}>{data.description}</option>
                        ))}
                    </>
                </select>
            </TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter orderedQuantity"
                name="orderedQty"
                value={addFormData.orderedQty}
                onChange={(event) => handleEditFormChange(event, index)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter orderedUom"
                name="orderedUom"
                value={addFormData.orderedUom}
                onChange={(event) => handleEditFormChange(event, index)}
            ></input></TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleFormSubmit(event, row, addFormData, index)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
