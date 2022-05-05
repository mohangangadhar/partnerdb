import React from 'react';
import { TextField } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@material-ui/core/IconButton";
import { SearchOutlined } from "@material-ui/icons";
const SearchOrdersByUserName = (props) => {
    const { searchquery, setSearchQuery, handleSearch, label } = props;
    return (
        <TextField

            id="searchquery"
            label={label}
            value={searchquery == 0 ? "" : searchquery}
            onChange={(event) => {
                setSearchQuery(event.target.value);

            }}
            InputProps={{
                style: {
                    color: "white",
                },
                endAdornment: (
                    <IconButton style={{ color: '#fff' }}>
                        <SearchOutlined
                            onClick={(event) => handleSearch(event)}
                        />
                    </IconButton>),
            }}

            InputLabelProps={{
                style: { color: '#fff' },
            }}
            variant='outlined'

        />
    );
};

export default SearchOrdersByUserName;
