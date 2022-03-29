import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const EditableRow = ({
    row,
    addFormData,
    handleEditFormChange,
    handleFormSubmit
}) => {
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15
    }
    return (
        <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>
            <TableCell >{row.poId}</TableCell>
            <TableCell >{row.skuUom}</TableCell>
            <TableCell align="center" >{row.staginArea}</TableCell>
            <TableCell align="center" >{row.skuCount}</TableCell>
            <TableCell align="center" >{row.productName}</TableCell>
            <TableCell align="center">{row.orderIdCount}</TableCell>
            <TableCell align="center">{row.totalQtyReq}</TableCell>
            <TableCell align="center">{row.primarySupplier}</TableCell>
            <TableCell align="center">{row.suggestedQty}</TableCell>
            <TableCell align="center">{row.orderedQty}</TableCell>
            <TableCell align="center">{row.orderedUom}</TableCell>
            <TableCell align="center">
                <textarea placeholder="Received Quantity" name="receivedQty" value={addFormData.receivedQty} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Wastage Quantity" name="wastageQty" value={addFormData.wastageQty} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Missed Quantity" name="missedQty" value={addFormData.missedQty} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Quality Rating" name="qualityRating" value={addFormData.qualityRating} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Total to Pay" name="totalPay" value={addFormData.totalPay} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Comments" name="comments" value={addFormData.comments} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">{row.createdAt}</TableCell>
            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;
