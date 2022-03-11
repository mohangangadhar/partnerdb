import React, { useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import Loader from "../components/Loader/Loader";
import { Button, FormControlLabel, FormGroup, FormLabel, TextField } from "@material-ui/core";
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { APIURL, GetRequestOptions } from "../constants/Constants";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './service.css'
import { getDate } from "date-fns";
import ServiceConfig from "./ServiceConfig";
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span style={{ color: 'white' }}>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                style={{ padding: '10px', border: '2px solid' }}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}
function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="serviceTable" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
            {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
        </div >
    )
}

const ServiceZones = () => {
    const [apiData, setApiData] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(false);
    const [toggle, setToggle] = useState(false);
    const [formData, setFormData] = useState({
        pincode: "",
        serviceId: 0,
        fulfillmentId: 0,
        status: 1,
    });
    React.useEffect(async () => {
        setisLoading(true);
        await fetch(APIURL + "ecommerce-vendor/pincodezones", GetRequestOptions).
            then(response => response.json()).
            then(data => {
                setApiData(data);
                setisLoading(false);
            }).catch(err => setisLoading(false));
    }, [])
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'Service Zones',
                columns: [
                    {
                        Header: 'Pincode',
                        accessor: 'pincode',
                    },
                    {
                        Header: 'Zone Name',
                        accessor: 'zonename',
                    },
                    {
                        Header: 'id',
                        accessor: 'id',
                    },
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Service Id',
                        accessor: 'serviceid',
                    },
                    {
                        Header: 'Fulfillment Id',
                        accessor: 'fulfillmentid',
                    },
                ],
            },
        ],
        []
    )
    let realData = [];
    const data = apiData.map(data => {
        realData.push({
            "pincode": data.pincode,
            "zonename": data.zoneName,
            "id": data.id,
            "name": detail(data.name),
            "serviceid": data.serviceId,
            "fulfillmentid": data.fulfillmentId
        })
    });

    return (
        <div>
            <TableContainer>
                <TableRow>


                    <TableCell style={{ borderBottom: "none" }} colSpan={2}>
                        <Button variant={!toggle ? 'contained' : 'outlined'} color="success" style={{ color: 'blue' }} onClick={(ev) => {
                            // handleSubmit(ev);
                            setToggle(false);
                        }}
                        >Service Zones</Button>
                    </TableCell>
                    <TableCell>
                        <Button variant={toggle ? 'contained' : 'outlined'} color="success" style={{ color: 'blue' }} onClick={(ev) => {
                            // handleSubmit(ev);
                            setToggle(true);
                        }}
                        >Configuration</Button>
                    </TableCell>
                </TableRow>
            </TableContainer>
            {toggle ? <ServiceConfig /> :
                <>
                    {isLoading ? <Loader /> :
                        <Table columns={columns} data={realData} />}
                </>
            }
        </div>
    )
}

export default ServiceZones;