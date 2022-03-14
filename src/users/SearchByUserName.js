import React from 'react';
import { TextField } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const SearchByUserName = (props) => {
    const { searchUserName, setSearchUserName, handleSearchByUserName } = props;
    return (
        <TextField
            id="searchquery"
            label="Search By UserName"
            value={searchUserName}
            onChange={(event) => {
                setSearchUserName((event.target.value).toLowerCase());

                handleSearchByUserName(event, (event.target.value).toLowerCase());


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

export default SearchByUserName;
