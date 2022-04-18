import React from 'react'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

const Dropdown = ({data, handleGetPincodeData, label, type}) => {
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
                }} name={type} onChange={(event) => handleGetPincodeData(event)}>
                    <option style={styleOptions} selected disabled value={label}>{type}</option>
                    <option style={styleOptions} value="all">All</option>
                    <>
                        {data.map((data) => (
                            <option style={styleOptions} value={type == "pincode" ? data.pincode : type === "Product" ?  data.name: data.dispatchWeek}>
                                {type == "pincode" ? data.pincode : type === "Product" ? JSON.parse(data.name).en  : data.dispatchWeek}
                            </option>
                        ))}
                    </>
                </select>
            </TableCell>
        </div>
    )
}

export default Dropdown