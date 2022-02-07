import React, { Fragment, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../Actions';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgressInTable } from '../constants/Constants';
import TableTitles from './TableTitles';
import DetailTableTitles from './DetailTableTitles';
function DashBoard() {
    const [bigData, setBigData] = useState([]);
    const [orderdata, setOrderData] = useState([]);
    const [status, setStatus] = useState("Prachin");
    const [orderStatus, setOrderStatus] = useState("new");
    const [statusOrders, setStatusOrders] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isSummaryLoading, setisSummaryLoading] = useState(false);
    const [newCount, setNewCount] = useState({
        regular: 0,
        express: 0
    });
    const [processingCount, setProcessingCount] = useState({
        regular: 0,
        express: 0
    });
    const [pendingCount, setPendingCount] = useState({
        regular: 0,
        express: 0
    });
    const [completeCount, setCompleteCount] = useState({
        regular: 0,
        express: 0
    });
    const [cancelCount, setCancelCount] = useState({
        regular: 0,
        express: 0
    });
    const [total, setTotal] = useState(0);
    const [revenueTotal, setRevenueTotal] = useState(0);
    const [newOrdersData, setNewOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0
    });
    const [processingOrdersData, setProcessingOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0
    });
    const [pendingOrdersData, setPendingOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0
    });
    const [completeOrdersData, setCompleteOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0
    });

    const [cancelOrdersData, setCancelOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0
    });

    const order = useSelector(state => state.dashboardreducer);
    const dispatch = useDispatch();

    const RequestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    const regularOrdersSum = (newCount.regular.length >= 1 && newCount.regular[0].noOfOrders) + (processingCount.regular.length >= 1 && processingCount.regular[0].noOfOrders)
        + (completeCount.regular.length >= 1 && completeCount.regular[0].noOfOrders) + (pendingCount.regular.length && pendingCount.regular[0].noOfOrders);

    const expressOrdersSum = (newCount.express.length >= 1 && newCount.express[0].noOfOrders) + (processingCount.express.length >= 1 && processingCount.express[0].noOfOrders)
        + (completeCount.express.length >= 1 && completeCount.express[0].noOfOrders) + (pendingCount.express.length && pendingCount.express[0].noOfOrders);

    const regularRevenueSum = (newCount.regular.length >= 1 && newCount.regular[0].total) + (processingCount.regular.length >= 1 && processingCount.regular[0].total)
        + (completeCount.regular.length >= 1 && completeCount.regular[0].total) + (pendingCount.regular.length && pendingCount.regular[0].total);

    const expressRevenueSum = (newCount.express.length >= 1 && newCount.express[0].total) + (processingCount.express.length >= 1 && processingCount.express[0].total)
        + (completeCount.express.length >= 1 && completeCount.express[0].total) + (pendingCount.express.length && pendingCount.express[0].total);

    const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/vendor/report`;

    const changeStatus = async (vendorName) => {
        setisLoading(true);
        let data = order.apiData;
        let statusChangeData = data.filter(data => data.vendorName == vendorName);
        setOrderData(data.filter(data => data.vendorName == vendorName));
        setNewCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "new" && data.express == "REGULAR"),
            express: statusChangeData.filter(data => data.deliveryStatus == "new" && data.express == "EXPRESS")
        }));
        setProcessingCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "accepted" && data.express == "REGULAR"),
            express: statusChangeData.filter(data => data.deliveryStatus == "accepted" && data.express == "EXPRESS")
        }));
        setPendingCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "pending" && data.express == "REGULAR"),
            express: statusChangeData.filter(data => data.deliveryStatus == "pending" && data.express == "EXPRESS")
        }));
        setCompleteCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "complete" && data.express == "REGULAR"),
            express: statusChangeData.filter(data => data.deliveryStatus == "complete" && data.express == "EXPRESS")
        }));
        setCancelCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "cancelled" && data.express == "REGULAR"),
            express: statusChangeData.filter(data => data.deliveryStatus == "cancelled" && data.express == "EXPRESS")
        }));
        setisLoading(false);
    }

    const getData = async () => {
        let data = order.apiData;
        setisSummaryLoading(true);
        changeStatus("Prachin", data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].deliveryStatus == "new") {

                if (data[i].express == "REGULAR") {

                    setNewOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS") {

                    setNewOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
            }
            if (data[i].deliveryStatus == "accepted") {

                if (data[i].express == "REGULAR") {

                    setProcessingOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS") {

                    setProcessingOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }

            }


            if (data[i].deliveryStatus == "cancelled") {
                if (data[i].express == "REGULAR") {
                    console.log("reg");
                    setCancelOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS") {
                    console.log("expr");
                    setCancelOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }

            }

            if (data[i].deliveryStatus == "pending") {
                if (data[i].express == "REGULAR") {
                    console.log("reg");
                    setPendingOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS") {
                    console.log("expr");
                    setPendingOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
            }

            if (data[i].deliveryStatus == "complete") {
                if (data[i].express == "REGULAR") {
                    console.log("reg");
                    setCompleteOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS") {
                    console.log("expr");
                    setCompleteOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
            }

        }
        setisSummaryLoading(false);
    }
    useEffect(async () => {
        setisSummaryLoading(true);
        dispatch(fetchTodos);
    }, []);
    useEffect(() => {

        getData();
    }, [order.apiData.length > 5])
    return (
        <div>
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>DashBoard</h2></center>
            <h3 style={{ marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Orders Summary:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableTitles />
                    </TableHead>
                    <TableBody>
                        {order.apiData.length > 1 && !(isSummaryLoading) ?
                            <>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Regular</TableCell>
                                    <TableCell align="center">{newOrdersData.regular != 0 ? newOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{processingOrdersData.regular != 0 ? processingOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.regular != 0 ? completeOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.regular != 0 ? pendingOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.regular != 0 ? cancelOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.regular + processingOrdersData.regular + completeOrdersData.regular + pendingOrdersData.regular
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newOrdersData.express != 0 ? newOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{processingOrdersData.express != 0 ? processingOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.express != 0 ? completeOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.express != 0 ? pendingOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.express != 0 ? cancelOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.express + processingOrdersData.express + completeOrdersData.express + pendingOrdersData.express
                                    }</TableCell>
                                </TableRow>
                            </>
                            : CircularProgressInTable}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Revenue Summary:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableTitles />
                    </TableHead>
                    <TableBody>
                        {order.apiData.length > 1 && !(isSummaryLoading) ?
                            <>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Regular</TableCell>
                                    <TableCell align="center">{newOrdersData.regtotal != 0 ? newOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{processingOrdersData.regtotal != 0 ? processingOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.regtotal != 0 ? completeOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.regtotal != 0 ? pendingOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.regtotal != 0 ? cancelOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.regtotal + processingOrdersData.regtotal + completeOrdersData.regtotal + pendingOrdersData.regtotal
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newOrdersData.exptotal != 0 ? newOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{processingOrdersData.exptotal != 0 ? processingOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.exptotal != 0 ? completeOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.exptotal != 0 ? pendingOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.exptotal != 0 ? cancelOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.exptotal + processingOrdersData.exptotal + completeOrdersData.exptotal + pendingOrdersData.exptotal
                                    }</TableCell>
                                </TableRow>
                            </>
                            : CircularProgressInTable}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Orders :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <DetailTableTitles status={status} setStatus={setStatus} changeStatus={changeStatus} bigData={bigData} />
                    </TableHead>
                    <TableBody>
                        {order.apiData.length > 1 && !(isLoading) ?
                            <>
                                <TableRow >
                                    <TableCell align="center" rowSpan={2}>{status}</TableCell>
                                    <TableCell align="center" style={{ color: 'blue' }}>Regular</TableCell>
                                    <TableCell align="center">{newCount.regular.length >= 1 ? newCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{processingCount.regular.length >= 1 ? processingCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{completeCount.regular.length >= 1 ? completeCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.regular.length >= 1 ? pendingCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.regular.length >= 1 ? cancelCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{
                                        regularOrdersSum
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newCount.express.length >= 1 ? newCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{processingCount.express.length >= 1 ? processingCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{completeCount.express.length >= 1 ? completeCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.express.length >= 1 ? pendingCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.express.length >= 1 ? cancelCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{
                                        expressOrdersSum
                                    }</TableCell>
                                </TableRow>
                            </>
                            : CircularProgressInTable}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3 style={{ marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Revenue :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <DetailTableTitles status={status} setStatus={setStatus} changeStatus={changeStatus} bigData={bigData} />
                    </TableHead>
                    <TableBody>
                        {order.apiData.length > 1 && !(isLoading) ?
                            <>
                                <TableRow >
                                    <TableCell align="center" rowSpan={2}>{status}</TableCell>
                                    <TableCell align="center" style={{ color: 'blue' }}>Regular</TableCell>
                                    <TableCell align="center">{newCount.regular.length >= 1 ? newCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{processingCount.regular.length >= 1 ? processingCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{completeCount.regular.length >= 1 ? completeCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.regular.length >= 1 ? pendingCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.regular.length >= 1 ? cancelCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{
                                        regularRevenueSum
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newCount.express.length >= 1 ? newCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{processingCount.express.length >= 1 ? processingCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{completeCount.express.length >= 1 ? completeCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.express.length >= 1 ? pendingCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.express.length >= 1 ? cancelCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{
                                        expressRevenueSum
                                    }</TableCell>
                                </TableRow>
                            </>
                            : CircularProgressInTable}
                    </TableBody>
                </Table>
            </TableContainer>


        </div >
    )
}

export default DashBoard
