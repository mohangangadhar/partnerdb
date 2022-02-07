import React from 'react';
import { TextField } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const SearchProducts = (props) => {
    const { searchquery, setSearchQuery, handleSearch } = props;
    return (
        <TextField
            id="searchquery"
            label="Search"
            value={searchquery}
            onChange={(event) => {
                setSearchQuery((event.target.value).toLowerCase());

                handleSearch(event, (event.target.value).toLowerCase());


            }}
            InputProps={{
                style: {
                    color: "white",
                },
                endAdornment: <InputAdornment position="end" style={{ color: "white" }}>
                    <SearchIcon />
                </InputAdornment>
            }}
            InputLabelProps={{
                style: { color: '#fff' },
            }}
            variant='outlined'

        />
    );
};

export default SearchProducts;
