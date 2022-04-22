import React from 'react'
import { styleOptions } from '../../constants/Constants'

const FilterByStatus = ({ handleChangeStatus }) => {
    return (
        <div>
            <select style={{
                padding: 5,
            }} name="status" onChange={(e) => handleChangeStatus(e.target.value)}>
                <option style={styleOptions} value="" >Support Status:</option>
                <option style={styleOptions} value="all" >All</option>
                <option style={styleOptions} value="Open">Open</option>
                <option style={styleOptions} value="Completed">Completed</option>
                <option style={styleOptions} value="In Progress">In Progress</option>

            </select>
        </div>
    )
}

export default FilterByStatus