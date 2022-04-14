import React from 'react'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const Dropdown = ({ data, handleGetPincodeData, selectedPincode }) => {
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15
    };
    return (
        <div>
            <TableCell align="center">
                <select style={{
                    padding: 5,
                }} name="pincode" onChange={(event) => handleGetPincodeData(event)}>
                    <option style={styleOptions} selected disabled value="select pincode">Pincode:</option>
                    <option style={styleOptions} value="all">All</option>
                    <>
                        {data.map((data) => (
                            <option style={styleOptions} value={data.pincode}>{data.pincode}</option>
                        ))}
                    </>
                </select>
            </TableCell>
        </div>
    )
}

export default Dropdown