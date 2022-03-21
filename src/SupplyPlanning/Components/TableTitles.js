import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const TableTitles = () => {
    return (
        <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
            <TableRow>
                <TableCell style={{ color: 'wheat' }}>
                    Add
                </TableCell>
                <TableCell style={{ color: 'wheat' }}>id</TableCell>
                <TableCell style={{ color: 'wheat' }}>Vendor Name</TableCell>
                <TableCell style={{ color: 'wheat' }}>Article</TableCell>
                <TableCell style={{ color: 'wheat' }}>Sku Quantity</TableCell>
                <TableCell style={{ color: 'wheat' }}>SKU UOM</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Stagin Area</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>SKU COUNT</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Order Id Count</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Total Quantity Req</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Suggested Quantity</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Primary Supplier</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Ordered Quantity</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Ordered Uom</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableTitles;
