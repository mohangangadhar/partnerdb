import React from 'react'
import { styleOptions } from '../constants/Constants'

const CityFilter = ({ handleChangeStatus }) => {
    return (
        <div>
            <select style={{
                padding: 5,
            }} name="status" onChange={(e) => handleChangeStatus(e.target.value)}>
                <option style={styleOptions} value="HYDERABAD" >HYDERABAD</option>
                <option style={styleOptions} value="MUMBAI">MUMBAI</option>
                <option style={styleOptions} value="DEVGAGH">DEVGAGH</option>
                <option style={styleOptions} value="PUNE">PUNE</option>
                <option style={styleOptions} value="NAGPUR">NAGPUR</option>
                <option style={styleOptions} value="BANGALORE">BANGALORE</option>

            </select>
        </div>
    )
}

export default CityFilter