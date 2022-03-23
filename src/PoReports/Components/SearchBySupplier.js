import React from 'react'

const SearchBySupplier = ({ suppliers, handleChangeSupplier }) => {
    const styleOptions = {
        padding: 10,
        marginBottom: 5,
        fontSize: 15
    }
    return (
        <div>
            <select style={{
                padding: 5,
            }} name="primarySupplier" onChange={(event) => handleChangeSupplier(event, event.target.value)}>
                <option value="" disabled selected>Select Primary Supplier</option>
                <option value="all">ALL</option>
                <>
                    {suppliers.map((data, index) => (
                        <option style={styleOptions} value={data.shortCode}>{data.description}</option>
                    ))}
                </>
            </select>
        </div>
    )
}

export default SearchBySupplier