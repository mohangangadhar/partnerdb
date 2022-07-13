import React from 'react'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const DropdownForStatus = ({ status, setDeliveryStatus, setStatus, label, type }) => {
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15,

    };
    return (
        <div>
            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name={type} onChange={(event) => {
                    setStatus(event.target.value);
                }
                }>
                    <option style={styleOptions} selected disabled value={label}>{label}</option>
                    <option style={styleOptions} value="all">All</option>
                    <option style={styleOptions} value="new">New</option>
                    <option style={styleOptions} value="accepted">Processing</option>
                    <option style={styleOptions} value="prepared">Out for Delivery</option>
                    <option style={styleOptions} value="pending">Pending</option>
                    <option style={styleOptions} value="delivered">Delivered</option>
                    <option style={styleOptions} value="complete">Completed</option>
                    <option style={styleOptions} value="cancelled">Cancelled</option>
                    <option style={styleOptions} value="failed">Failed</option>
                </select>
            </TableCell>
        </div>
    )
}

export default DropdownForStatus