import React, { useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
const TableTitles = ({ data }) => {
    return (
        <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
            {data &&
                <TableRow>
                    {data.map((rows, index) => (
                        <TableCell align="center" style={{ color: 'wheat' }}>{rows}</TableCell>
                    ))}
                </TableRow>
            }
        </TableHead>
    );
};

export default TableTitles;
