import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
const DropDownForPoStatus = (props) => {
    const { poStatus, handleChangePoStatus } = props;
    return (

        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label"> PO STATUS</InputLabel>
            <Select
                style={{ height: 50, color: 'white' }}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-disabled"
                value={poStatus}
                onChange={(event) => {
                    handleChangePoStatus(event.target.value);
                }}
                label="Get Products"
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="onhold">On Hold</MenuItem>
            </Select>
        </FormControl>
    );
};

export default DropDownForPoStatus;
