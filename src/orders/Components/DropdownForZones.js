import React from 'react'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const DropdownForZones = ({ data, handleGetZoneData, label, type }) => {
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
                }} name={type} onChange={(event) => handleGetZoneData(event.target.value, 0)}>
                    <option style={styleOptions} selected disabled value={label}>{label}</option>
                    <option style={styleOptions} value="all">All</option>
                    <>
                        {data.map((data) => (
                            <option style={styleOptions} value={data.id}>{data.zoneName}</option>
                        ))}
                    </>
                </select>
            </TableCell>
        </div>
    )
}

export default DropdownForZones