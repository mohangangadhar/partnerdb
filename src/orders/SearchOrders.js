import React from 'react';
import { TextField } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const SearchOrders = (props) => {
    const { searchquery, setSearchQuery, handleSearch } = props;
    return (
        <TextField
            id="searchquery"
            label="Search"
            value={searchquery == 0 ? "" : searchquery}
            onChange={(event) => {
                setSearchQuery(event.target.value);

                handleSearch(event, event.target.value);


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

export default SearchOrders;
