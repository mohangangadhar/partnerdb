import React, { useState, useEffect } from 'react'
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { APIURL, GetRequestOptions, detail } from "../constants/Constants";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NotificationManager } from "react-notifications";
import { Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";
import { CodeSharp } from '@material-ui/icons';
//service : 1 => reg and exp&seasonal; 2: reg&seasonal;3 : only Express;4:seasonal;
//vendorfulfills=2;ours:1
const ServiceConfig = () => {

    const [formData, setFormData] = useState({
        pincode: "",
        areaName: "",
        serviceId: 0,
        fulfillmentId: 0,
        status: 1,
    });
    const [zoneLoading, setZoneLoading] = useState(false);
    const [zoneList, setZoneList] = useState([]);
    const [pincodeList, setPincodeList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [selectZoneId, setSelectZoneId] = useState(null);
    const [selectPincodeId, setSelectPincodeId] = useState(null);
    const [selectVendorId, setSelectVendorId] = useState(null);
    const [selectZoneIdForVendor, setSelectZoneIdForVendor] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [zonesByPincode, setZonesByPincode] = useState([]);
    const getPincodeList = async () => {
        await fetch(APIURL + "ecommerce-pincode", GetRequestOptions).
            then(response => response.json()).
            then(data => {
                setPincodeList(data);
            });
    }
    const getVendorList = async () => {
        await fetch(APIURL + "ecommerce-vendor", GetRequestOptions).
            then(response => response.json()).
            then(data => {
                setVendorList(data);
            });
    }
    useEffect(async () => {
        console.log(detail('{"en": "Prachin "}'));
        setZoneLoading(true);
        await fetch(APIURL + "ecommerce-zone", GetRequestOptions).
            then(response => response.json()).
            then(data => {
                setZoneList(data);
            });
        await getPincodeList();
        await getVendorList();
        setZoneLoading(false);
    }, [])
    const handleChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;

        setFormData(newFormData);
        console.log(formData);
    };
    const checkAvailability = async (url, requestOptions) => {
        let id;
        await fetch(APIURL + url, requestOptions).
            then(response => response.json()).
            then(data => {
                id = data.id;
            });
        return id;
    }
    const handleAssign = async (ev) => {
        ev.preventDefault();
        if (selectPincodeId != null && selectZoneId != null) {
            let reqBody = {
                "zone": selectZoneId,
                "pincode": selectPincodeId
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            if (await checkAvailability("ecommerce-zone-pincode-m/check-availability", requestOptions) !== null) {
                NotificationManager.success('Already Configured', 'Successful!', 1000);
            }
            else {
                await fetch(APIURL + "ecommerce-zone-pincode-m/add-update", requestOptions).then(
                    response => response.json()
                ).then(data => {
                    NotificationManager.success('Configured Zone to Pincode', 'Successfully!', 1000);
                }).catch(err => console.log(err));
            }
        }
        else {
            alert("Please select zone and pincode to assign");
        }

    }
    const handleAssignVendor = async (ev) => {
        ev.preventDefault();
        if (selectVendorId != null && selectZoneIdForVendor != null) {

            let reqBody = {
                "zoneId": selectZoneIdForVendor,
                "vendorId": selectVendorId
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            if (await checkAvailability("ecommerce-vendor-zone-m/check-availability", requestOptions) !== null) {
                NotificationManager.success('Already Configured', 'Successful!', 1000);
            }
            else {
                await fetch(APIURL + "ecommerce-vendor-zone-m/add-update", requestOptions).
                    then(response => response.json()).
                    then(data => {
                        NotificationManager.success('Assignement of Zone to Vendor', 'Successful!', 1000);
                    }).catch(err => console.log(err));
            }

        }
        else {
            alert("Please select zone and Vendor to assign");
        }

    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (formData.fulfillmentId == "" || formData.serviceId == "" || formData.pincode == "" || formData.status == "") {
            alert("Please add all field");
        }
        else {
            // console.log(formData);
            let currentdate = new Date();
            var datetime =
                currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
                + " " + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            let pincodeData = {
                "pincode": formData.pincode,
                "serviceId": formData.serviceId,
                "areaName": formData.areaName,
                "fulfillmentId": formData.fulfillmentId,
                "createdAt": datetime,
                "status": formData.status
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pincodeData)
            };

            await fetch(APIURL + "ecommerce-pincode/add-update", requestOptions).then(response => response.json()).
                then(data => {
                    NotificationManager.success('You Added a Pincode!', 'Successful!', 1000);
                    getPincodeList();
                }).catch(err => console.log(err));
        }
    }
    const handleCheckZones = async (ev) => {
        await fetch(APIURL + `ecommerce-zone-pincode-m/pincode/${ev}`, GetRequestOptions).then(response => response.json()).
            then(data => {
                setZonesByPincode(data);
                console.log(data);
            }).catch(err => console.log(err));
    }
    const handleDeletePincodeZone = async () => {
        if (selectPincodeId == null || selectZoneId == null) {
            alert("Select All Fields");
        }
        else {
            let reqBody = {
                "zone": selectZoneId,
                "pincode": selectPincodeId
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            await fetch(APIURL + "ecommerce-zone-pincode-m/check-availability", requestOptions).
                then(response => response.json()).
                then(data => {
                    if (data.id == null) {
                        NotificationManager.success('No Such Data', 'Exists', 1000);
                    }
                    else {
                        const deleteOptions = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' }
                        }
                        fetch(APIURL + `ecommerce-zone-pincode-m/${data.id}`, deleteOptions).then(response =>
                            response.json()).then(data => {
                                NotificationManager.success('Deleted', 'Exists', 1000);
                            })
                            .catch(err => NotificationManager.success('Deleted', 'Deleted', 1000));
                    }
                });
        }
    }
    const handleDeleteVendorZone = async () => {
        if (selectVendorId == null || selectZoneIdForVendor == null) {
            alert("Select All Fields");
        }
        else {
            let reqBody = {
                "zoneId": selectZoneIdForVendor,
                "vendorId": selectVendorId
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };

            await fetch(APIURL + "ecommerce-vendor-zone-m/check-availability", requestOptions).
                then(response => response.json()).
                then(data => {
                    if (data.id == null) {
                        NotificationManager.success('No Such Data', 'Exists', 1000);
                    }
                    else {
                        const deleteOptions = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' }
                        }
                        fetch(APIURL + `ecommerce-vendor-zone-m/${data.id}`, deleteOptions).then(response =>
                            response.json()).then(data => {
                                NotificationManager.success('Deleted', 'Exists', 1000);
                            })
                            .catch(err => NotificationManager.success('Deleted', 'Deleted', 1000));
                    }
                });
        }
    }
    return (
        <div>
            <TableContainer>
                <div style={{ backgroundColor: 'white' }}>
                    <TableRow>
                        <TableCell rowSpan={2}>
                            <FormLabel style={{ color: 'blue' }}> Add Pincode</FormLabel>
                        </TableCell>
                        <TableCell >
                            <TextField
                                id="pincode"
                                name="pincode"
                                label="Enter Pincode"
                                value={formData.pincode}
                                onChange={(ev) => handleChange(ev)}
                                variant='outlined'
                            />
                        </TableCell>
                        <TableCell >
                            <TextField
                                id="areaName"
                                name="areaName"
                                label="Enter AreaName"
                                value={formData.areaName}
                                onChange={(ev) => handleChange(ev)}
                                variant='outlined'
                            />
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-required-label">Service Id</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    style={{ height: 50 }}
                                    id="demo-simple-select-disabled"
                                    name="serviceId"
                                    value={formData.serviceId}
                                    onChange={(event) =>
                                        setFormData(prevState => ({
                                            ...prevState,
                                            serviceId: event.target.value
                                        }))
                                    }
                                    label="Enter ServiceId"
                                >

                                    <MenuItem value={1}>
                                        1:Regular + Express + Seasonal
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        2:Regular + Express
                                    </MenuItem>

                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell rowSpan={2} style={{ borderBottom: "none" }}>
                            <Button variant='contained' color="success" onClick={(ev) => {
                                handleSubmit(ev);
                            }}>Submit</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-required-label">Fulfillment</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    style={{ height: 50 }}
                                    id="demo-simple-select-disabled"
                                    name="serviceId"
                                    value={formData.fulfillmentId}
                                    onChange={(event) =>
                                        setFormData(prevState => ({
                                            ...prevState,
                                            fulfillmentId: event.target.value
                                        }))
                                    }
                                >

                                    <MenuItem value={1}>
                                        1:Jeevamrut
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        2:Vendor
                                    </MenuItem>

                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-required-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    style={{ height: 50 }}
                                    id="demo-simple-select-disabled"
                                    name="serviceId"
                                    value={formData.status}
                                    onChange={(event) =>
                                        setFormData(prevState => ({
                                            ...prevState,
                                            status: event.target.value
                                        }))
                                    }

                                >

                                    <MenuItem value={1}>
                                        Active
                                    </MenuItem>
                                    <MenuItem value={0}>
                                        Not Active
                                    </MenuItem>

                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                </div>
                <TableRow>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormLabel style={{ color: 'wheat' }}> Assign Pincode :</FormLabel>
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
                                    handleCheckZones(event.target.value);
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
                                        {zone.id}:{zone.zoneName}
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
                    <TableCell style={{ borderBottom: "none" }}>
                        <Button variant='contained' color="success" onClick={(ev) => {
                            handleDeletePincodeZone(ev);
                        }}>Delete</Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormLabel style={{ color: 'wheat' }}> Assign Zone to Vendor :</FormLabel>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Zone</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                style={{ height: 50, color: 'white' }}
                                id="demo-simple-select-disabled"
                                value={selectZoneIdForVendor}
                                onChange={(event) => {
                                    setSelectZoneIdForVendor(event.target.value)
                                }}
                                label="Select Zone"
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
                            <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Vendor</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                style={{ height: 50, color: 'white' }}
                                id="demo-simple-select-disabled"
                                value={selectVendorId}
                                onChange={(event) => {
                                    setSelectVendorId(event.target.value);
                                }}
                                label="Enter Status"
                            >
                                {vendorList.length > 2 && vendorList.map((vendor, index) => (
                                    <MenuItem value={vendor.id}>
                                        {detail(vendor.name)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <Button variant='contained' color="success" onClick={(ev) => {
                            handleAssignVendor(ev);
                        }}>Assign</Button>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                        <Button variant='contained' color="success" onClick={(ev) => {
                            handleDeleteVendorZone(ev);
                        }}>Delete</Button>
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