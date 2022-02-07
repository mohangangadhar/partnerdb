import React from 'react';
import Button from '@mui/material/Button';
const FilteredInStock = (props) => {
    const { filterInStock, setisLoading, setFilterInStock, checkText } = props;
    console.log(checkText);
    return (
        <Button style={{ marginRight: 10, marginBottom: -50, color: 'white' }} variant={filterInStock == checkText ? 'contained' : "outlined"} color="success" onClick={(ev) => {
            ev.preventDefault();
            if (filterInStock == checkText) { return; }
            else {
                setisLoading(true);
                setFilterInStock(checkText);
            }

        }}
        >{checkText}</Button>
    );
};

export default FilteredInStock;
