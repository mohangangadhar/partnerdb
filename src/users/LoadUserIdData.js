import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from '@mui/material/CircularProgress';
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
const LoadUserIdData = ({ errFound, userSearchData, isLoading }) => {
    return (
        <TableBody>
            {userSearchData.id !== null && !(isLoading) ?
                <TableHead>

                    <TableRow key={userSearchData.id}>
                        <TableCell>
                            {userSearchData.id}

                        </TableCell>
                        <TableCell >{userSearchData.name}</TableCell>
                        <TableCell align="left">{userSearchData.email}</TableCell>
                        <TableCell align="center">{userSearchData.mobileNumber}</TableCell>
                        <TableCell align="center">{userSearchData.mobileVerified === 1 ? "Yes" : "No"}</TableCell>
                        <TableCell align="center">{userSearchData.pincode}</TableCell>
                        <TableCell align="center">{new Date(Date.parse(userSearchData.createdAt + " UTC")).toLocaleString()}</TableCell>
                    </TableRow>


                </TableHead>
                :
                <center>
                    {errFound ? <h1 style={{ color: 'black' }}>User Not Found</h1> : <CircularProgress />}
                </center>
            }
        </TableBody>
    );
}


export default LoadUserIdData;
