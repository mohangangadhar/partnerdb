import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
import Picker from "../components/Picker";
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
            <TableCell align="center" >{row.expenseId}</TableCell>
            <TableCell >{row.memberName}</TableCell>
            <TableCell align="center" >{row.amount}</TableCell>

            <TableCell align="center">{row.category}</TableCell>
            <TableCell align="center">{row.subCategory}</TableCell>
            <TableCell align="center">
                <input placeholder="payment status" name="paymentStatus" value={addFormData.paymentStatus} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell align="center">
                <input placeholder="Reimburesment status" name="reimbursementStatus" value={addFormData.reimbursementStatus} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell align="center">{row.raisedBy}</TableCell>
            <TableCell align="center">{row.raisedDate}</TableCell>
            <TableCell align="center">
                <Picker color="white" date={addFormData.eventDate} dateChange={handleEditFormChange} label="eventDate" />
            </TableCell>
            <TableCell align="center">
                <input placeholder="Vendor Name" name="vendorName" value={addFormData.vendorName} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell align="center">
                <input placeholder="cleared by" name="clearedBy" value={addFormData.clearedBy} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell align="center">
                <Picker color="white" date={addFormData.clearedDate} dateChange={handleEditFormChange} label="clearedDate" />
            </TableCell>
            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;
