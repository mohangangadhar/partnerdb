import React, { useState, useEffect } from 'react'
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { APIURL, GetRequestOptions } from "../constants/Constants";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NotificationManager } from "react-notifications";
import { Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";
const ServiceConfig = () => {

    const [formData, setFormData] = useState({
        pincode: "",
        serviceId: 0,
        fulfillmentId: 0,
        status: 1,
    });
    const [zoneLoading, setZoneLoading] = useState(false);
    const [zoneList, setZoneList] = useState([]);
    const [pincodeList, setPincodeList] = useState([]);
    const [selectZoneId, setSelectZoneId] = useState(null);
    const [selectPincodeId, setSelectPincodeId] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const getPincodeList = async () => {
        await fetch(APIURL + "ecommerce-pincode", GetRequestOptions).
            then(response => response.json()).
            then(data => {
                setPincodeList(data);
            });
    }
    useEffect(async () => {
        await fetch(APIURL + "ecommerce-zone", GetRequestOptions).
            then(response => response.json()).
            then(data => {
                setZoneList(data);
            });
        await getPincodeList();
    }, [])
    const handleChange = (event) => {
        event.preventDefault();
        var currentdate = new Date();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;

        setFormData(newFormData);
    };
    const handleAssign = async (ev) => {
        ev.preventDefault();
        if (selectPincodeId != null && selectZoneId != null) {
            console.log(selectPincodeId + "" + selectZoneId);
            let reqBody = {
                "zone": selectZoneId,
                "pincode": selectPincodeId
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            await fetch(APIURL + "ecommerce-zone-pincode-m", requestOptions).
                then(response => response.json()).
                then(data => {
                    NotificationManager.success('Assignement of Zone to Pincode', 'Successful!', 1000);
                }).catch(err => console.log(err));
        }
        else {
            alert("Please select zone and pincode to assign");
        }

    }
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        let currentdate = new Date();
        var datetime =
            currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
            + " " + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        let productdata = {
            "pincode": formData.pincode,
            "serviceId": formData.serviceId,
            "areaName": "Hyderabad",
            "fulfillmentId": formData.fulfillmentId,
            "createdAt": datetime,
            "status": formData.status
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productdata)
        };

        await fetch(APIURL + "ecommerce-pincode", requestOptions).then(response => response.json()).
            then(data => {
                NotificationManager.success('You Added a Pincode!', 'Successful!', 1000);
                getPincodeList();
            }).catch(err => console.log(err));
    }
    return (
        <div>
            <TableContainer>
                <TableRow>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormLabel style={{ color: 'wheat' }}> Add Pincode :</FormLabel>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="pincode"
                            name="pincode"
                            label="Enter Pincode"
                            value={formData.pincode}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="serviceId"
                            name="serviceId"
                            label="Enter ServiceId"
                            value={formData.serviceId}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="fulfillmentId"
                            name="fulfillmentId"
                            label="Enter fulfillmentId"
                            value={formData.fulfillmentId}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="status"
                            name="status"
                            label="Enter status"
                            value={formData.status}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <Button variant='contained' color="success" onClick={(ev) => {
                            handleSubmit(ev);
                        }}>Submit</Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormLabel style={{ color: 'wheat' }}> Assign Pincode :</FormLabel>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Zone</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                style={{ height: 50, color: 'white' }}
                                id="demo-simple-select-disabled"
                                value={selectZoneId}
                                onChange={(event) => {
                                    setSelectZoneId(event.target.value)
                                }}
                                label="Enter Status"
                            >
                                {zoneList.length > 2 && zoneList.map((zone, index) => (
                                    <MenuItem value={zone.id}>
                                        {zone.zoneName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Pincode</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                style={{ height: 50, color: 'white' }}
                                id="demo-simple-select-disabled"
                                value={selectPincodeId}
                                onChange={(event) => {
                                    setSelectPincodeId(event.target.value);
                                }}
                                label="Enter Status"
                            >
                                {pincodeList.length > 2 && pincodeList.map((zone, index) => (
                                    <MenuItem value={zone.id}>
                                        {zone.pincode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <Button variant='contained' color="success" onClick={(ev) => {
                            handleAssign(ev);
                        }}>Assign</Button>
                    </TableCell>
                </TableRow>
            </TableContainer>
        </div>
    )
}

export default ServiceConfig
// if (data.id > 0) {
//     let reqBody = {
//         "zone": formData.zoneId,
//         "pincode": data.id
//     };
//     const requestOptionsZone = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(reqBody)
//     };
//     fetch(APIURL + "ecommerce-zone-pincode-m", requestOptionsZone).then(response => response.json()).
//         then(res => {
//             console.log(res);
//         })
// }
{/* <TableContainer>
                <TableRow>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormLabel style={{ color: 'wheat' }}> Add Pincode :</FormLabel>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="pincode"
                            name="pincode"
                            label="Enter Pincode"
                            value={formData.pincode}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="serviceId"
                            name="serviceId"
                            label="Enter ServiceId"
                            value={formData.serviceId}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="fulfillmentId"
                            name="fulfillmentId"
                            label="Enter fulfillmentId"
                            value={formData.fulfillmentId}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="status"
                            name="status"
                            label="Enter status"
                            value={formData.status}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <TextField
                            id="zoneId"
                            name="zoneId"
                            label="Assign zoneId"
                            value={formData.zoneId}
                            onChange={(ev) => handleChange(ev)}
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            variant='outlined'
                        />
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <Button variant='contained' color="success" onClick={(ev) => {
                            handleSubmit(ev);
                        }}
                        >Submit</Button>
                    </TableCell>
                </TableRow>
            </TableContainer> */}