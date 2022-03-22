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
            <TableCell >{row.userId}:{row.name}</TableCell>
            <TableCell align="center" >{row.mobileNumber}</TableCell>
            <TableCell align="center" >{row.email}</TableCell>
            <TableCell align="center" rowSpan={2}>{row.message}</TableCell>
            <TableCell align="center">{row.createdAt}</TableCell>

            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name="status" value={addFormData.status} onChange={handleEditFormChange}>
                    {!addFormData.status !== null && <option style={styleOptions} value="">Status:</option>}
                    <option style={styleOptions} value="Open">Open</option>
                    <option style={styleOptions} value="In Progress">In Progress</option>
                    <option style={styleOptions} value="Completed">Completed</option>
                </select>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="resolution" name="resolution" value={addFormData.resolution} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="category" name="category" value={addFormData.category} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center">
                <textarea placeholder="resolver" name="resolver" value={addFormData.resolver} cols="20" onChange={handleEditFormChange}></textarea>
            </TableCell>
            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;
