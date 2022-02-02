import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    vendorId,
    handleEditClick
}) => {
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    return (
        <TableRow key={row.product.id}>
            <TableCell>
                <Link to={{
                    pathname: '/app/' + vendorId + '/product/' + row.id,
                    id: row.product.id
                }}>{row.id}</Link>
            </TableCell>
            <TableCell align="left">{detail(row.product.title)}</TableCell>
            <TableCell>{row.product.express == 0 ? "NO" : "Yes"}</TableCell>
            <TableCell align="center">{row.product.price}</TableCell>
            <TableCell align="center">{row.product.stockQuantity}</TableCell>
            {/* <TableCell align="center"><Button variant="text" color="success">Active</Button></TableCell> */}
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
