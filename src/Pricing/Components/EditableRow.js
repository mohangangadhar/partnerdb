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
            <TableCell align="center"><input
                type="text"
                placeholder="Enter category"
                name="category"
                value={addFormData.category}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter product"
                name="product"
                value={addFormData.product}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Enter Unit"
                name="unit"
                value={addFormData.unit}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>

            <TableCell align="center"><input
                type="text"
                placeholder="BB Price"
                name="bb"
                value={addFormData.bb}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Vijetha Price"
                name="vijetha"
                value={addFormData.vijetha}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Daman Price"
                name="daman"
                value={addFormData.daman}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Dhriti Price"
                name="dhriti"
                value={addFormData.dhriti}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="jF Price"
                name="jeevamrut"
                value={addFormData.jeevamrut}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Landing Cost"
                name="landingCost"
                value={addFormData.landingCost}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Proposed Cost"
                name="proposedCost"
                value={addFormData.proposedCost}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center">{row.lastUpdated}</TableCell>
            <TableCell align="center"><input
                type="text"
                placeholder="Comments"
                name="comments"
                value={addFormData.comments}
                onChange={(event) => handleEditFormChange(event)}
            ></input></TableCell>
            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleFormSubmit(event, row, addFormData)}>Save</Button></TableCell>
        </TableRow >
    );
};

export default EditableRow;
