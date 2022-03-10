import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const TableTitles = () => {
    return (
        <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
            <TableRow>
                <TableCell style={{ color: 'wheat' }}>Order Type</TableCell>
                <TableCell style={{ color: 'wheat' }}>Vendor Name</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Order Date</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Order Id</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Customer Id</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Customer Name</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Order Status</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Product Id</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Product Name</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Ordered Quantity</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Unit Price</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Ordered Value</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Shipping Cost</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Delivered Quantity</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Product Quality</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Refund Value</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Final Ordered Value</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Gst (%)</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Final Taxable Value</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Seller Invoice Value</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Payment Status</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Payment Date</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Payment Reference No</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>PO Number</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Invoice No</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableTitles;
