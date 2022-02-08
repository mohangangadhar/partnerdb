import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
const DetailTableTitles = (props) => {
    const { status, bigData, setStatus, changeStatus } = props;
    return (
        <TableRow>
            <TableCell align="center" style={{ color: 'wheat' }}>Vendor Name</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Order Type</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
            <TableCell>
                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Vendor</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        style={{ height: 50, color: 'white' }}
                        id="demo-simple-select-disabled"
                        value={status}
                        onChange={(event) => {
                            setStatus(event.target.value);
                            changeStatus(event.target.value);
                        }}
                        label="Enter Status"
                    >
                        <MenuItem value="Prachin">
                            Prachin
                        </MenuItem>
                        <MenuItem value="Timios">Timios</MenuItem>
                        <MenuItem value="Jeevamrut Foods">Jeevamrut Foods</MenuItem>
                        <MenuItem value="Organic India">Organic India</MenuItem>
                        <MenuItem value="Back To Roots">Back To Roots</MenuItem>
                        <MenuItem value="Amruthaahaara">Amruthaahaara</MenuItem>
                        <MenuItem value="Karshaka">Karshaka</MenuItem>
                        <MenuItem value="Devanna Organic">Devanna Organic</MenuItem>
                        <MenuItem value="Dhriti Organics">Dhriti Organics</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
        </TableRow>
    );
};

export default DetailTableTitles;
