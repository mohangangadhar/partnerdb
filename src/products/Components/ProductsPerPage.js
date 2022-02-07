import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
const ProductsPerPage = (props) => {
    const { size, setSize } = props;
    return (

        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">{size} Products per Page</InputLabel>
            <Select
                style={{ height: 50, color: 'white' }}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-disabled"
                value={size}
                onChange={(event) => {
                    setSize(event.target.value);

                }}
                label="Get Products"
            >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="50">50</MenuItem>
            </Select>
        </FormControl>
    );
};

export default ProductsPerPage;
