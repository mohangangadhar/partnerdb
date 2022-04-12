import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const EditablePoReportInfo = ({
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
            <TableCell align="center" >{row.poReportId}</TableCell>
            <TableCell align="center" >{row.primarySupplier}</TableCell>
            <TableCell align="center">{row.poCreatedDate}</TableCell>
            <TableCell align="center">
                <input type="text" placeholder="Active?" name="active" value={addFormData.active} onChange={handleEditFormChange} />
            </TableCell>

            <TableCell align="center">{row.poTotal}</TableCell>
            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name="poStatus" value={addFormData.poStatus} onChange={handleEditFormChange}>
                    <option style={styleOptions} disabled>PO Status:</option>
                    <option style={styleOptions} value="new">New</option>
                    <option style={styleOptions} value="delivered">Delivered</option>
                    <option style={styleOptions} value="rejected">Rejected</option>
                    <option style={styleOptions} value="cancelled">Cancelled</option>
                    <option style={styleOptions} value="onhold">On Hold</option>
                </select>
            </TableCell>

            <TableCell align="center">
                <input type="text" placeholder="Received Date" name="poReceivedDate" value={addFormData.poReceivedDate} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell align="center">
                <input type="text" placeholder="actualTotal" name="actualTotal" value={addFormData.actualTotal} onChange={handleEditFormChange} />
            </TableCell>
            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name="paymentStatus" value={addFormData.paymentStatus} onChange={handleEditFormChange}>
                    <option style={styleOptions} value="" >Payment Status:</option>
                    <option style={styleOptions} value="complete">Complete</option>
                    <option style={styleOptions} value="yet to deliver">Yet to Deliver</option>
                    <option style={styleOptions} value="pending">Pending</option>
                    <option style={styleOptions} value="past due">Past Due</option>
                    <option style={styleOptions} value="on hold">On Hold</option>
                    <option style={styleOptions} value="cancelled">Cancelled</option>
                </select>
            </TableCell>



            <TableCell align="center" >{row.createdAt}</TableCell>


            <TableCell align="center">
                <input type="text" placeholder="poType" name="poType" value={addFormData.poType} onChange={handleEditFormChange} />
            </TableCell>


            <TableCell align="center">
                <input type="text" placeholder="comments" name="comments" value={addFormData.comments} onChange={handleEditFormChange} />
            </TableCell>

            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditablePoReportInfo;
