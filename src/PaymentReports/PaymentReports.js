import React from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import Loader from "../components/Loader/Loader";
import { APIURL, GetRequestOptions } from "../constants/Constants";
import './paymentreports.css'
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

const PaymentReports = () => {
    const [apiData, setApiData] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(false);
    React.useEffect(async () => {
        setisLoading(true);
        await fetch(APIURL + "ecommerce-vendor/paymentreports", GetRequestOptions).
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
                        Header: 'Order Type',
                        accessor: 'orderType',
                    },
                    {
                        Header: 'Vendor Name',
                        accessor: 'vendorName',
                    },
                    {
                        Header: 'Order Time',
                        accessor: 'orderTime',
                    },
                    {
                        Header: 'Order Id',
                        accessor: 'orderId',
                    },
                    {
                        Header: 'Customer Id',
                        accessor: 'customerId',
                    },
                    {
                        Header: 'Customer Name',
                        accessor: 'customerName',
                    },
                    {
                        Header: 'Order Status',
                        accessor: 'orderStatus',
                    },
                    {
                        Header: 'Product Id',
                        accessor: 'productId',
                    },
                    {
                        Header: 'Product Name',
                        accessor: 'productName',
                    },
                    {
                        Header: 'Ordered Quantity',
                        accessor: 'orderedQuantity',
                    },
                    {
                        Header: 'Unit Price',
                        accessor: 'unitPrice',
                    },
                    {
                        Header: 'Total',
                        accessor: 'orderedValue',
                    },
                    {
                        Header: 'Delivery Fee',
                        accessor: 'shippingCost',
                    },
                    {
                        Header: 'Delivered Quantity',
                        accessor: 'deliveredQuantity',
                    },
                    {
                        Header: 'Product Quality',
                        accessor: 'productQuality',
                    },
                    {
                        Header: 'Refunds',
                        accessor: 'refundValue',
                    },
                    {
                        Header: 'Final Value',
                        accessor: 'finalOrderValue',
                    },
                    {
                        Header: 'GST',
                        accessor: 'gstRate',
                    },
                    {
                        Header: 'Final Taxable Value',
                        accessor: 'finalTaxableValue',
                    },
                    {
                        Header: 'Seller Invoice Value',
                        accessor: 'sellerInvoiceValue',
                    },
                ],
            },
        ],
        []
    )
    let realData = [];
    const data = apiData.map(data => {
        realData.push({
            "orderType": data.orderType == 0 ? "Regular" : "Express",
            "vendorName": detail(data.vendorName),
            "orderTime": data.orderDateTime,
            "orderId": data.orderId,
            "customerId": data.customerId,
            "customerName": data.customerName,
            "orderStatus": data.orderStatus,
            "productId": data.productId,
            "productName": detail(data.productName),
            "orderedQuantity": data.orderedQuantity,
            "unitPrice": data.unitPrice,
            "orderedValue": data.orderedValue,
            "shippingCost": data.shippingCost,
            "deliveredQuantity": data.deliveredQuantity,
            "productQuality": data.productQuality,
            "refundValue": data.refundValue,
            "finalOrderValue": data.finalOrderValue,
            "gstRate": data.gstRate,
            "finalTaxableValue": data.finalTaxableValue,
            "sellerInvoiceValue": data.sellerInvoiceValue
        })
    });


    return (
        <>
            {isLoading ? <Loader /> :
                <Table columns={columns} data={realData} />}
        </>
    )
}

export default PaymentReports;