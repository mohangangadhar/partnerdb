import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
const DropDownForStatus = (props) => {
    const { status, handleChangeStatus, label } = props;
    return (

        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label"> {label}</InputLabel>
            <Select
                style={{ height: 50, color: 'white' }}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-disabled"
                value={status}
                onChange={(event) => {
                    handleChangeStatus(event.target.value);
                }}
                label="payment Status"
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Complete">Complete</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>

            </Select>
        </FormControl>
    );
};

export default DropDownForStatus;
