import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import TableTitles from '../components/TableTitles/TableTitles';
import { APIURL, deliveredOrdersData, GetRequestOptions } from '../constants/Constants';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { CircularProgress } from '@material-ui/core';
const DeliveredOrderReports = () => {
    let { startdate, enddate, status } = useParams();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getData = async () => {
        setIsLoading(true);
        const date = new Date(enddate);
        date.setDate(date.getDate() + 1);
        var todayDate = date.toISOString().slice(0, 10);
        await fetch(APIURL + `order/delivered-date/status/${status}?startDate=${startdate}&endDate=${todayDate}`, GetRequestOptions).
            then(res => res.json()).
            then(data => {
                setOrders(data);
                console.log(data);
                setIsLoading(false);
            }).catch(err => console.log(err));
        setIsLoading(false);
    }
    useEffect(async () => {
        await getData();
    }, [])
    return (
        <div>
            <h2 style={{ fontStyle: 'italic', color: 'white' }}>Orders B/w {startdate} & {enddate}</h2>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles data={deliveredOrdersData} />
                    {orders.length > 0 ?
                        <TableBody>
                            <>
                                {orders.map((order, index) =>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Link to={{
                                                pathname: '/app/' + 'order/order/' + order.id,
                                                id: order.id
                                            }}> {order.id}</Link></TableCell>
                                        <TableCell align="center" >{order.user.name}</TableCell>
                                        <TableCell align="center" >{order.finalTotal}</TableCell>
                                        <TableCell align="center" >{order.deliveryStatus}</TableCell>
                                    </TableRow>
                                )}
                            </>

                        </TableBody>
                        :
                        <CircularProgress />}
                </Table>
            </TableContainer>
        </div>
    )
}

export default DeliveredOrderReports