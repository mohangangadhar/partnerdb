import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from '@mui/material/CircularProgress';
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
const LoadUserNameData = ({ errFound, userSearchData, isLoading }) => {
    return (
        <>
            {userSearchData.length > 0 && !(isLoading) ?
                <TableBody>
                    {userSearchData.map((data, index) => (
                        <TableRow key={data.id}>
                            <TableCell>
                                {data.id}

                            </TableCell>
                            <TableCell >{data.name}</TableCell>
                            <TableCell align="left">{data.email}</TableCell>
                            <TableCell align="center">{data.mobileNumber}</TableCell>
                            <TableCell align="center">{data.mobileVerified === 1 ? "Yes" : "No"}</TableCell>
                            <TableCell align="center">{data.pincode}</TableCell>
                            <TableCell align="center">{new Date(Date.parse(data.createdAt + " UTC")).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
                :
                <center>
                    {errFound ? <h1 style={{ color: 'black' }}>User Not Found</h1> : <CircularProgress />}
                </center>
            }
        </>
    );
}


export default LoadUserNameData;
