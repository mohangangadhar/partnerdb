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
    let price = 0;
    if (row.receivedQty >= 0 && row.receivedQty != null) {
        price = (row.receivedQty - row.wastageQty) * row.totalPay;
    } else {
        price = row.orderedQty * row.totalPay;
    }
    return (
        <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>


            <TableCell align="center" >{row.skuCount}</TableCell>
            <TableCell align="center">
                <input type="text" placeholder="Product Name" name="productName" value={addFormData.productName} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell >{row.skuUom}</TableCell>
            <TableCell align="center">{row.orderIdCount}</TableCell>
            <TableCell align="center">{row.totalQtyReq}</TableCell>
            <TableCell align="center">
                <input type="text" placeholder="Ordered Qty" name="orderedQty" value={addFormData.orderedQty} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name="orderedUom" value={addFormData.orderedUom} onChange={handleEditFormChange}>
                    <option style={styleOptions} disabled>Ordered Uom:</option>
                    <option style={styleOptions} value="Box">Box</option>
                    <option style={styleOptions} value="Bunch">Bunch</option>
                    <option style={styleOptions} value="Case">Case</option>
                    <option style={styleOptions} value="Dozen">Dozen</option>
                    <option style={styleOptions} value="Kg">Kg</option>
                    <option style={styleOptions} value="Pc">Pc</option>
                    <option style={styleOptions} value="Day">Day</option>
                    <option style={styleOptions} value="Hr">Hr</option>
                    <option style={styleOptions} value="Unit">Unit</option>
                </select>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Received Quantity" name="receivedQty" value={addFormData.receivedQty} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Wastage Quantity" name="wastageQty" value={addFormData.wastageQty} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">{row.receivedQty - row.wastageQty}</TableCell>
            <TableCell align="center">
                <textarea placeholder="Quality Rating" name="qualityRating" value={addFormData.qualityRating} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="Total to Pay" name="totalPay" value={addFormData.totalPay} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">{price}</TableCell>
            <TableCell align="center">
                <textarea placeholder="Comments" name="comments" value={addFormData.comments} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>

            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;
