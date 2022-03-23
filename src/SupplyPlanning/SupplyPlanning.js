import React, { useEffect, useState } from 'react'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from "uuid";
import { NotificationManager } from "react-notifications";

import { APIURL, GetRequestOptions } from '../constants/Constants';

import TableTitles from './Components/TableTitles';
import ReadOnlyRow from './Components/ReadOnlyRow';
import EditableRow from './Components/EditableRow';
import MultipleSelect from './Components/MutlipleSelect';
import GetDate from '../components/GetDate';

const SupplyPlanning = () => {
    const [rows, setRows] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setisLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [editContactId, setEditContactId] = useState(-1);
    const [isApiLoading, setisApiLoading] = useState(false);
    const [rowAdd, setRowAdd] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [personName, setPersonName] = React.useState([]);
    const [toggle, setToggle] = useState(false);
    const [addFormData, setAddFormData] = useState({
        primarySupplier: "",
        orderedQuantity: 0,
        orderedUom: ""
    })
    const modifyInputData = (arr) => {
        const result = [...arr.reduce((r, o) => {
            const key = o.vendorName + '-' + o.article + '-' + o.skuQuantity + '-' + o.skuUom;

            const item = r.get(key) || Object.assign({}, o, {
                orderId: 0,
                skuCount: 0,
                orderedQuantity: 0,
                orderedUom: "",
            });

            item.orderId += 1;
            item.skuCount += o.countOfProductsPurchased;
            item.orderedQuantity = 0;
            item.orderedUom = "";

            return r.set(key, item);
        }, new Map).values()];
        return result;
    }
    const receivedData = async () => {
        setSearchNotFound(false);
        setRows("");
        setisLoading(true);
        setEditContactId(null);
        let urlString = `ecommerce-vendor/financereports`;
        await fetch(APIURL + urlString, GetRequestOptions)
            .then(response => response.json())
            .then(data => {

                setRows(modifyInputData(data));

                setisLoading(false);
            }).catch(err => setisLoading(false));
    }
    const getPrimarySuppliers = async () => {
        await fetch(APIURL + "primary-supplier", GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setSuppliers(data);
            })

    }
    useEffect(() => {
        receivedData();
        getPrimarySuppliers();
    }, [toggle]);
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };
    const handleEditClick = (event, row, index) => {
        event.preventDefault();

        setAddFormData({
            primarySupplier: row.primarySupplier == null ? "" : row.primarySupplier,
            orderedQuantity: row.orderedQuantity,
            orderedUom: row.orderedUom
        });
        setEditContactId(index);
    }
    const handleFormSubmit = (event, data, tempFormData, index) => {
        event.preventDefault();
        console.log(tempFormData);
        setAddFormData("");

        let xyz = { ...data };

        xyz.primarySupplier = tempFormData.primarySupplier;
        xyz.orderedQuantity = tempFormData.orderedQuantity;
        xyz.orderedUom = tempFormData.orderedUom;
        rows[index] = xyz;
        setEditContactId(null);

    }

    const addRow = (row, index) => {
        const data = [...rows];
        data.splice(index + 1, 0, row);
        setRows(data);
    }
    const finalSave = async () => {
        if (personName.length == 0) {
            alert("Select Suppliers To Save");
            return;
        }
        let finalList = [];
        let poId = uuidv4();

        for (let i = 0; i < personName.length; i++) {
            finalList.push(rows.filter(row => row.primarySupplier === personName[i]));
        };

        let checkList = finalList[0];
        for (let i = 0; i < finalList.length - 1; i++) {
            checkList = checkList.concat(finalList[i + 1]);
        }
        finalList = [];
        const tempSuggestedQty = (row) => Math.round((row.skuQuantity * row.skuCount * (1 + row.buffer)) * 100) / 100;
        checkList.map((row) =>

            finalList.push({
                "skuUom": row.skuUom,
                "staginArea": row.staginArea,
                "skuCount": row.skuCount,
                "orderIdCount": row.orderId,
                "totalQtyReq": row.skuQuantity * row.skuCount,
                "suggestedQty": tempSuggestedQty(row),
                "primarySupplier": row.primarySupplier,
                "orderedQty": row.orderedQuantity == 0 ? tempSuggestedQty(row) : row.orderedQuantity,
                "orderedUom": row.orderedUom,
                "poNumber": "Po-v" + poId,
                "poId": poId,
                "createdAt": GetDate()
            })
        );
        console.log(finalList);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalList)
        };
        await fetch(APIURL + "suppy-planning-snapshot/saveall", requestOptions).
            then(response => response.json()).
            then(data => {
                NotificationManager.success('Saved Data', 'Success', 1000);
                setToggle(!toggle)
            }).catch(err => console.log(err));

    }
    return (
        <div>
            {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ marginTop: -9, marginBottom: 0, fontStyle: 'italic', color: 'white' }}>Supply Planning</h2>
                {suppliers.length > 1 && <MultipleSelect suppliers={suppliers} personName={personName} setPersonName={setPersonName} />}
                <Button style={{ maxHeight: '50px', minWidth: '100px' }} variant="contained" color="success" onClick={finalSave}>Save</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles />
                    {rows.length > 0 && !(isLoading) && !(rowAdd) ?
                        <TableBody>
                            {rows.map((row, index) => (
                                <>
                                    {editContactId === index ? (
                                        <EditableRow suppliers={suppliers} addRow={addRow} row={row} index={index} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />) :
                                        <ReadOnlyRow addRow={addRow} row={row} index={index} addFormData={addFormData} handleEditClick={handleEditClick} />
                                    }
                                </>

                            ))}
                        </TableBody> :
                        <div>
                            <center>
                                <CircularProgress />
                            </center>
                        </div>}
                </Table>
            </TableContainer>

        </div>
    )
}
export default SupplyPlanning;