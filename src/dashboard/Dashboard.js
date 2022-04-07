import React, { Fragment, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, fetchSupportReport, fetchPoData } from '../Actions';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgressInTable, dashboardSummary, poSummaryData, supportSummaryData } from '../constants/Constants';
import TableTitles from "../components/TableTitles/TableTitles";
import DetailTableTitles from './DetailTableTitles';
function DashBoard() {
    const [bigData, setBigData] = useState([]);
    const [orderdata, setOrderData] = useState([]);
    const [status, setStatus] = useState("Prachin");
    const [orderStatus, setOrderStatus] = useState("new");
    const [statusOrders, setStatusOrders] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isSummaryLoading, setisSummaryLoading] = useState(false);
    const [isPoSummaryLoading, setisPoSummaryLoading] = useState(false);
    const [isSupportSummaryLoading, setisSupportSummaryLoading] = useState(false);
    const [supportSummary, setSupportSummary] = useState({
        new: 0,
        completed: 0,
        inProgress: 0,
        open: 0
    });
    const [newCount, setNewCount] = useState({
        regular: 0,
        express: 0
    });
    const [preparedCount, setPreparedCount] = useState({
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
        exptotal: 0,
        seasonal: 0,
        seasonaltotal: 0
    });
    const [preparedOrdersData, setPreparedOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0,
        seasonal: 0,
        seasonaltotal: 0
    });
    const [processingOrdersData, setProcessingOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0,
        seasonal: 0,
        seasonaltotal: 0
    });
    const [pendingOrdersData, setPendingOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0,
        seasonal: 0,
        seasonaltotal: 0
    });
    const [completeOrdersData, setCompleteOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0,
        seasonal: 0,
        seasonaltotal: 0
    });

    const [cancelOrdersData, setCancelOrdersData] = useState({
        regular: 0,
        express: 0,
        regtotal: 0,
        exptotal: 0,
        seasonal: 0,
        seasonaltotal: 0
    });
    const [vendorRevenueSummary, setVendorRevenueSummary] = useState({
        new: 0,
        prepared: 0,
        processing: 0,
        complete: 0,
        pending: 0,
    });
    const [poSummary, setPoSummary] = useState({
        yettodeliver: {
            count: 0,
            poTotal: 0
        },
        pending: {
            count: 0,
            poTotal: 0
        },
        pastdue: {
            count: 0,
            poTotal: 0
        },
        onhold: {
            count: 0,
            poTotal: 0
        },
        cancelled: {
            count: 0,
            poTotal: 0
        }
    });
    const order = useSelector(state => state.dashboardreducer);
    const poReport = useSelector(state => state.poreducer);
    const supportReport = useSelector(state => state.supportreducer);
    const dispatch = useDispatch();


    const regularOrdersSum = () => (newCount.regular.length >= 1 && newCount.regular[0].noOfOrders) + (preparedCount.regular.length >= 1 && preparedCount.regular[0].noOfOrders) + (processingCount.regular.length >= 1 && processingCount.regular[0].noOfOrders)
        + (completeCount.regular.length >= 1 && completeCount.regular[0].noOfOrders) + (pendingCount.regular.length && pendingCount.regular[0].noOfOrders);

    const expressOrdersSum = () => (newCount.express.length >= 1 && newCount.express[0].noOfOrders) + (preparedCount.express.length >= 1 && preparedCount.express[0].noOfOrders) + (processingCount.express.length >= 1 && processingCount.express[0].noOfOrders)
        + (completeCount.express.length >= 1 && completeCount.express[0].noOfOrders) + (pendingCount.express.length && pendingCount.express[0].noOfOrders);

    const regularRevenueSum = () => (newCount.regular.length >= 1 && newCount.regular[0].total) + (preparedCount.regular.length >= 1 && preparedCount.regular[0].total) + (processingCount.regular.length >= 1 && processingCount.regular[0].total)
        + (completeCount.regular.length >= 1 && completeCount.regular[0].total) + (pendingCount.regular.length && pendingCount.regular[0].total);

    const expressRevenueSum = () => (newCount.express.length >= 1 && newCount.express[0].total) + (preparedCount.express.length >= 1 && preparedCount.express[0].total) + (processingCount.express.length >= 1 && processingCount.express[0].total)
        + (completeCount.express.length >= 1 && completeCount.express[0].total) + (pendingCount.express.length && pendingCount.express[0].total);


    const changeStatus = async (vendorName) => {
        setisLoading(true);
        let data = order.apiData;
        let statusChangeData = data.filter(data => data.vendorName == vendorName);

        setOrderData(data.filter(data => data.vendorName == vendorName));
        setNewCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "new" && data.express == "REGULAR" && data.seasonal == 0),
            express: statusChangeData.filter(data => data.deliveryStatus == "new" && data.express == "EXPRESS" && data.seasonal == 0)
        }));
        setPreparedCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "prepared" && data.express == "REGULAR" && data.seasonal == 0),
            express: statusChangeData.filter(data => data.deliveryStatus == "prepared" && data.express == "EXPRESS" && data.seasonal == 0)
        }));
        setProcessingCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "accepted" && data.express == "REGULAR" && data.seasonal == 0),
            express: statusChangeData.filter(data => data.deliveryStatus == "accepted" && data.express == "EXPRESS" && data.seasonal == 0)
        }));
        setPendingCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "pending" && data.express == "REGULAR" && data.seasonal == 0),
            express: statusChangeData.filter(data => data.deliveryStatus == "pending" && data.express == "EXPRESS" && data.seasonal == 0)
        }));
        setCompleteCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "complete" && data.express == "REGULAR" && data.seasonal == 0),
            express: statusChangeData.filter(data => data.deliveryStatus == "complete" && data.express == "EXPRESS" && data.seasonal == 0)
        }));
        setCancelCount((prev) => ({
            ...prev,
            regular: statusChangeData.filter(data => data.deliveryStatus == "cancelled" && data.express == "REGULAR" && data.seasonal == 0),
            express: statusChangeData.filter(data => data.deliveryStatus == "cancelled" && data.express == "EXPRESS" && data.seasonal == 0)
        }));

        setisLoading(false);
    }

    const getData = async () => {
        let data = order.apiData;
        setisSummaryLoading(true);
        changeStatus("Prachin", data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].deliveryStatus == "new") {

                if (data[i].express == "REGULAR" && data[i].seasonal == 0) {

                    setNewOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS" && data[i].seasonal == 0) {

                    setNewOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
                else if (data[i].seasonal == 1) {

                    setNewOrdersData((prevState) => ({
                        ...prevState,
                        seasonal: prevState.seasonal + data[i].noOfOrders,
                        seasonaltotal: prevState.seasonaltotal + data[i].total
                    }
                    ));
                }
            }
            if (data[i].deliveryStatus == "prepared") {
                console.log(data[i]);
                if (data[i].express == "REGULAR" && data[i].seasonal == 0) {

                    setPreparedOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS" && data[i].seasonal == 0) {

                    setPreparedOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
                else if (data[i].seasonal == 1) {

                    setPreparedOrdersData((prevState) => ({
                        ...prevState,
                        seasonal: prevState.seasonal + data[i].noOfOrders,
                        seasonaltotal: prevState.seasonaltotal + data[i].total
                    }
                    ));
                }
            }
            if (data[i].deliveryStatus == "accepted") {

                if (data[i].express == "REGULAR" && data[i].seasonal == 0) {

                    setProcessingOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS" && data[i].seasonal == 0) {

                    setProcessingOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
                else if (data[i].seasonal == 1) {

                    setProcessingOrdersData((prevState) => ({
                        ...prevState,
                        seasonal: prevState.seasonal + data[i].noOfOrders,
                        seasonaltotal: prevState.seasonaltotal + data[i].total
                    }
                    ));
                }
            }


            if (data[i].deliveryStatus == "cancelled") {
                if (data[i].express == "REGULAR" && data[i].seasonal == 0) {

                    setCancelOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS" && data[i].seasonal == 0) {

                    setCancelOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
                else if (data[i].seasonal == 1) {

                    setCancelOrdersData((prevState) => ({
                        ...prevState,
                        seasonal: prevState.seasonal + data[i].noOfOrders,
                        seasonaltotal: prevState.seasonaltotal + data[i].total
                    }
                    ));
                }
            }

            if (data[i].deliveryStatus == "pending") {
                if (data[i].express == "REGULAR" && data[i].seasonal == 0) {

                    setPendingOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS" && data[i].seasonal == 0) {

                    setPendingOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
                else if (data[i].seasonal == 1) {

                    setPendingOrdersData((prevState) => ({
                        ...prevState,
                        seasonal: prevState.seasonal + data[i].noOfOrders,
                        seasonaltotal: prevState.seasonaltotal + data[i].total
                    }
                    ));
                }
            }

            if (data[i].deliveryStatus == "complete") {
                if (data[i].express == "REGULAR" && data[i].seasonal == 0) {

                    setCompleteOrdersData((prevState) => ({
                        ...prevState,
                        regular: prevState.regular + data[i].noOfOrders,
                        regtotal: prevState.regtotal + data[i].total
                    }
                    ));
                }
                else if (data[i].express == "EXPRESS" && data[i].seasonal == 0) {

                    setCompleteOrdersData((prevState) => ({
                        ...prevState,
                        express: prevState.express + data[i].noOfOrders,
                        exptotal: prevState.exptotal + data[i].total
                    }
                    ));
                }
                else if (data[i].seasonal == 1) {

                    setCompleteOrdersData((prevState) => ({
                        ...prevState,
                        seasonal: prevState.seasonal + data[i].noOfOrders,
                        seasonaltotal: prevState.seasonaltotal + data[i].total
                    }
                    ));
                }
            }

        }
        setisSummaryLoading(false);
    }
    const getSupportData = () => {
        let supportData = supportReport.apiData;
        setisSupportSummaryLoading(true);
        for (let i = 0; i < supportData.length; i++) {
            if (supportData[i].status == null) {
                setSupportSummary((prevData) => ({
                    ...prevData,
                    new: supportData[i].total
                }))
            }
            if (supportData[i].status == "Completed") {
                setSupportSummary((prevData) => ({
                    ...prevData,
                    completed: supportData[i].total
                }))
            }
            if (supportData[i].status == "In Progress") {
                setSupportSummary((prevData) => ({
                    ...prevData,
                    inProgress: supportData[i].total
                }))
            }
            if (supportData[i].status == "Open") {
                setSupportSummary((prevData) => ({
                    ...prevData,
                    open: supportData[i].total
                }))
            }
        }

        setisSupportSummaryLoading(false);
    }

    const getPoData = () => {
        let poData = poReport.poData;
        setisPoSummaryLoading(true);

        for (let i = 0; i < poData.length; i++) {
            if (poData[i].paymentStatus == "yet to deliver") {
                setPoSummary((prevData) => ({
                    ...prevData,
                    yettodeliver: {
                        ...prevData,
                        count: poData[i].count,
                        poTotal: poData[i].poTotal
                    }
                }))
            }
            if (poData[i].paymentStatus == "pending") {
                setPoSummary((prevData) => ({
                    ...prevData,
                    pending: {
                        ...prevData,
                        count: poData[i].count,
                        poTotal: poData[i].poTotal
                    }
                }))
            }
            if (poData[i].paymentStatus == "past due") {
                setPoSummary((prevData) => ({
                    ...prevData,
                    pastdue: {
                        ...prevData,
                        count: poData[i].count,
                        poTotal: poData[i].poTotal
                    }
                }))
            }
            if (poData[i].paymentStatus == "on hold") {
                setPoSummary((prevData) => ({
                    ...prevData,
                    onhold: {
                        ...prevData,
                        count: poData[i].count,
                        poTotal: poData[i].poTotal
                    }
                }))
            }
            if (poData[i].paymentStatus == "cancelled") {
                setPoSummary((prevData) => ({
                    ...prevData,
                    cancelled: {
                        ...prevData,
                        count: poData[i].count,
                        poTotal: poData[i].poTotal
                    }
                }))
            }
        }
        // console.log(poSummary);
        setisPoSummaryLoading(false);
    }
    useEffect(async () => {
        setisSummaryLoading(true);
        dispatch(fetchTodos);
        dispatch(fetchPoData);
        dispatch(fetchSupportReport);
    }, []);
    useEffect(() => {
        getData();

    }, [order.apiData.length > 5])
    useEffect(() => {
        getSupportData();
    }, [supportReport.apiData.length > 1])
    useEffect(() => {
        getPoData();
    }, [poReport.poData.length > 2])
    return (
        <div>
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>DashBoard</h2></center>
            <h3 style={{ marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Orders Summary:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">

                    <TableTitles data={dashboardSummary} />

                    <TableBody>
                        {order.apiData.length > 1 && !(isSummaryLoading) ?
                            <>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Regular</TableCell>
                                    <TableCell align="center">{newOrdersData.regular != 0 ? newOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{processingOrdersData.regular != 0 ? processingOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{preparedOrdersData.regular != 0 ? preparedOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.regular != 0 ? completeOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.regular != 0 ? pendingOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.regular != 0 ? cancelOrdersData.regular : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.regular + preparedOrdersData.regular + processingOrdersData.regular + completeOrdersData.regular + pendingOrdersData.regular
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newOrdersData.express != 0 ? newOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{processingOrdersData.express != 0 ? processingOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{preparedOrdersData.express != 0 ? preparedOrdersData.express : 0}</TableCell>

                                    <TableCell align="center">{completeOrdersData.express != 0 ? completeOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.express != 0 ? pendingOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.express != 0 ? cancelOrdersData.express : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.express + preparedOrdersData.express + processingOrdersData.express + completeOrdersData.express + pendingOrdersData.express
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Seasonal</TableCell>
                                    <TableCell align="center">{newOrdersData.seasonal != 0 ? newOrdersData.seasonal : 0}</TableCell>
                                    <TableCell align="center">{processingOrdersData.seasonal != 0 ? processingOrdersData.seasonal : 0}</TableCell>
                                    <TableCell align="center">{preparedOrdersData.seasonal != 0 ? preparedOrdersData.seasonal : 0}</TableCell>

                                    <TableCell align="center">{completeOrdersData.seasonal != 0 ? completeOrdersData.seasonal : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.seasonal != 0 ? pendingOrdersData.seasonal : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.seasonal != 0 ? cancelOrdersData.seasonal : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.seasonal + preparedOrdersData.seasonal + processingOrdersData.seasonal + completeOrdersData.seasonal + pendingOrdersData.seasonal
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

                    <TableTitles data={dashboardSummary} />

                    <TableBody>
                        {order.apiData.length > 1 && !(isSummaryLoading) ?
                            <>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Regular</TableCell>
                                    <TableCell align="center">{newOrdersData.regtotal != 0 ? newOrdersData.regtotal : 0}</TableCell>

                                    <TableCell align="center">{processingOrdersData.regtotal != 0 ? processingOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{preparedOrdersData.regtotal != 0 ? preparedOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.regtotal != 0 ? completeOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.regtotal != 0 ? pendingOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.regtotal != 0 ? cancelOrdersData.regtotal : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.regtotal + preparedOrdersData.regtotal + processingOrdersData.regtotal + completeOrdersData.regtotal + pendingOrdersData.regtotal
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newOrdersData.exptotal != 0 ? newOrdersData.exptotal : 0}</TableCell>

                                    <TableCell align="center">{processingOrdersData.exptotal != 0 ? processingOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{preparedOrdersData.exptotal != 0 ? preparedOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.exptotal != 0 ? completeOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.exptotal != 0 ? pendingOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.exptotal != 0 ? cancelOrdersData.exptotal : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.exptotal + preparedOrdersData.exptotal + processingOrdersData.exptotal + completeOrdersData.exptotal + pendingOrdersData.exptotal
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Seasonal</TableCell>
                                    <TableCell align="center">{newOrdersData.seasonaltotal != 0 ? newOrdersData.seasonaltotal : 0}</TableCell>

                                    <TableCell align="center">{processingOrdersData.seasonaltotal != 0 ? processingOrdersData.seasonaltotal : 0}</TableCell>
                                    <TableCell align="center">{preparedOrdersData.seasonaltotal != 0 ? preparedOrdersData.seasonaltotal : 0}</TableCell>
                                    <TableCell align="center">{completeOrdersData.seasonaltotal != 0 ? completeOrdersData.seasonaltotal : 0}</TableCell>
                                    <TableCell align="center">{pendingOrdersData.seasonaltotal != 0 ? pendingOrdersData.seasonaltotal : 0}</TableCell>
                                    <TableCell align="center">{cancelOrdersData.seasonaltotal != 0 ? cancelOrdersData.seasonaltotal : 0}</TableCell>
                                    <TableCell align="center">{
                                        newOrdersData.seasonaltotal + preparedOrdersData.seasonaltotal + processingOrdersData.seasonaltotal + completeOrdersData.seasonaltotal + pendingOrdersData.seasonaltotal
                                    }</TableCell>
                                </TableRow>
                            </>
                            : CircularProgressInTable}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Support Summary:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles data={supportSummaryData} />
                    <TableBody>
                        {supportReport.apiData.length > 1 && !(isSupportSummaryLoading) ?
                            <>
                                <TableRow >
                                    <TableCell align="center">{supportSummary.new}</TableCell>
                                    <TableCell align="center">{supportSummary.open}</TableCell>
                                    <TableCell align="center">{supportSummary.inProgress}</TableCell>
                                    <TableCell align="center">{supportSummary.completed}</TableCell>
                                    <TableCell align="center">{
                                        supportSummary.new + supportSummary.completed + supportSummary.inProgress + supportSummary.open
                                    }</TableCell>
                                </TableRow>
                            </>
                            : CircularProgressInTable}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, marginTop: 4, fontStyle: 'italic', color: 'white' }}>Po Summary:</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableTitles data={poSummaryData} />
                    <TableBody>
                        {poReport.poData.length > 1 && !(isPoSummaryLoading) ?
                            <>

                                <TableRow >
                                    <TableCell align="center">{poSummary.yettodeliver.count}</TableCell>
                                    <TableCell align="center">{poSummary.pastdue.count}</TableCell>
                                    <TableCell align="center">{poSummary.pending.count}</TableCell>
                                    <TableCell align="center">{poSummary.onhold.count}</TableCell>
                                    <TableCell align="center">{poSummary.cancelled.count}</TableCell>
                                    <TableCell align="center">{
                                        poSummary.yettodeliver.count + poSummary.pastdue.count + poSummary.pending.count + poSummary.onhold.count
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center">{poSummary.yettodeliver.poTotal}</TableCell>
                                    <TableCell align="center">{poSummary.pastdue.poTotal}</TableCell>
                                    <TableCell align="center">{poSummary.pending.poTotal}</TableCell>
                                    <TableCell align="center">{poSummary.onhold.poTotal}</TableCell>
                                    <TableCell align="center">{poSummary.cancelled.poTotal}</TableCell>
                                    <TableCell align="center">{
                                        poSummary.yettodeliver.poTotal + poSummary.pastdue.poTotal + poSummary.pending.poTotal + poSummary.onhold.poTotal
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
                                    <TableCell align="center">{preparedCount.regular.length >= 1 ? preparedCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{completeCount.regular.length >= 1 ? completeCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.regular.length >= 1 ? pendingCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.regular.length >= 1 ? cancelCount.regular[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{
                                        regularOrdersSum()
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newCount.express.length >= 1 ? newCount.express[0].noOfOrders : 0}</TableCell>

                                    <TableCell align="center">{processingCount.express.length >= 1 ? processingCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{preparedCount.express.length >= 1 ? preparedCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{completeCount.express.length >= 1 ? completeCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.express.length >= 1 ? pendingCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.express.length >= 1 ? cancelCount.express[0].noOfOrders : 0}</TableCell>
                                    <TableCell align="center">{
                                        expressOrdersSum()
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
                                    <TableCell align="center">{preparedCount.regular.length >= 1 ? preparedCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{completeCount.regular.length >= 1 ? completeCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.regular.length >= 1 ? pendingCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.regular.length >= 1 ? cancelCount.regular[0].total : 0}</TableCell>
                                    <TableCell align="center">{
                                        regularRevenueSum()
                                    }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'blue' }}>Express</TableCell>
                                    <TableCell align="center">{newCount.express.length >= 1 ? newCount.express[0].total : 0}</TableCell>

                                    <TableCell align="center">{processingCount.express.length >= 1 ? processingCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{preparedCount.express.length >= 1 ? preparedCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{completeCount.express.length >= 1 ? completeCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{pendingCount.express.length >= 1 ? pendingCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{cancelCount.express.length >= 1 ? cancelCount.express[0].total : 0}</TableCell>
                                    <TableCell align="center">{
                                        expressRevenueSum()
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
