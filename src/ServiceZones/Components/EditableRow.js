import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const EditableRow = ({
    row,
    addFormData,
    handleEditFormChange,
    handleFormSubmit,
    handleDelete
}) => {
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15
    }
    return (
        <TableRow key={row.id} style={{ backgroundColor: 'white' }}>
            <TableCell >{row.id}</TableCell>


            <TableCell align="center">
                <input
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    value={addFormData.city}
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell align="center">
                <input
                    type="text"
                    placeholder="Enter State"
                    name="state"
                    value={addFormData.state}
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell align="center">
                <input
                    type="text"
                    placeholder="Enter Zone Name"
                    name="zoneName"
                    value={addFormData.zoneName}
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleDelete(event, row.id)}>Delete</Button></TableCell>
        </TableRow>
    );
};

export default EditableRow;
