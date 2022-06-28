import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
const DropDownForSuppliers = (props) => {
    const { supplier, suppliers, handleChangeSupplier } = props;
    return (

        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label"> Primary Supplier</InputLabel>
            <Select
                style={{ height: 50, color: 'white' }}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-disabled"
                value={supplier}
                onChange={(event) => {
                    handleChangeSupplier(event.target.value);
                }}
                label="Primary Supplier"
            >

                {suppliers && suppliers.map((sup, index) => (

                    <MenuItem key={index} value={sup.name}>{sup.name}</MenuItem>

                ))}
            </Select>
            <input type='text' placeholder='Add New supplier here' onChange={(e) => { handleChangeSupplier(e.target.value); }} />
        </FormControl>
    );
};

export default DropDownForSuppliers;
