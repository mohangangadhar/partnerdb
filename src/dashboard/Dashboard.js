import React, { Fragment, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { VENDORNAMES } from "../constants/Constants";
function DashBoard() {
    const [bigData, setBigData] = useState([]);
    const [orderdata, setOrderData] = useState([]);
    const [status, setStatus] = useState("Prachin");
    const [orderStatus, setOrderStatus] = useState("new");
    const [statusOrders, setStatusOrders] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [newCount, setNewCount] = useState("");
    const [processingCount, setProcessingCount] = useState("");
    const [pendingCount, setPendingCount] = useState("");
    const [completeCount, setCompleteCount] = useState("");
    const [cancelCount, setCancelCount] = useState("");
    const [total, setTotal] = useState(0);
    const [prachinData, setPrachinData] = useState({});
    const [karshakaData, setKarshakaData] = useState([]);
    const [timiosData, setTimiosData] = useState([]);
    const [backtorootsData, setBackToRootsData] = useState([]);
    const [organicindiaData, setOrganicIndiaData] = useState([]);
    const [jeevamrutfoodsData, setJeevamrutFoodsData] = useState([]);
    const [amruthaaharaData, setAmruthaaharaData] = useState([]);
    const [statusTotal, setStatusTotal] = useState(0);
    const [revenueTotal, setRevenueTotal] = useState(0);
    const RequestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/vendor/report`;


    const getData = async (id, name) => {
        let url = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/vendor/${id}/report`;
        await fetch(url, RequestOptions)
            .then(response => response.json())
            .then(data => {
                switch (name) {
                    case "Prachin":
                        setPrachinData(data);
                        break;
                    case "Jeevamrut Foods":
                        setJeevamrutFoodsData(data);
                        break;
                    case "Organic India":
                        setOrganicIndiaData(data);
                        break;
                    case "Back To Roots":
                        setBackToRootsData(data);
                        break;
                    case "Amruthaahaara":
                        setAmruthaaharaData(data);
                        break;
                    case "Karshaka":
                        setKarshakaData(data);
                        break;
                    case "Timios":
                        setTimiosData(data);
                        break;
                }
            });
    }
    useEffect(async () => {
        const vendors = ["Prachin", "Timios", "Karshaka", "Amruthaahaara", "Back To Roots", "Organic India", "Jeevamrut Foods"];
        setisLoading(true);
        for (let i = 0; i < vendors.length; i++) {
            if (VENDORNAMES.get(vendors[i]) != undefined) {
                getData(VENDORNAMES.get(vendors[i]), vendors[i]);

            }
        }
        setisLoading(false);
    }, []);
    const vendorOrderStyle = {
        color: 'white',
        marginBottom: -2,
        textAlign: 'left'
    }
    const vendorTitleStyle =
        { color: 'white', fontStyle: 'italic', textDecoration: 'underline' };
    const vendorRow = {
        borderColor: 'black',
        borderWidth: '20'
    };
    useEffect(async () => {
        console.log("st");
        await fetch(apiUrl, RequestOptions)
            .then(response => response.json())
            .then(data => {
                let statusChangeData = data.filter(data => data.vendorName == status);
                setBigData(data);
                setOrderData(data.filter(data => data.vendorName == status));
                setNewCount(statusChangeData.filter(data => data.deliveryStatus == "new"));
                setProcessingCount(statusChangeData.filter(data => data.deliveryStatus == "accepted"));
                setPendingCount(statusChangeData.filter(data => data.deliveryStatus == "pending"));
                setCompleteCount(statusChangeData.filter(data => data.deliveryStatus == "complete"));
                setCancelCount(statusChangeData.filter(data => data.deliveryStatus == "cancelled"));
                let finTotal = 0;
                let finrevenueTotal = 0;
                for (let i = 0; i < statusChangeData.length; i++) {
                    if (statusChangeData[i].deliveryStatus == "cancelled"
                        || statusChangeData[i].deliveryStatus == "failed") {
                        continue;
                    }
                    finTotal += statusChangeData[i].noOfOrders;
                    finrevenueTotal += statusChangeData[i].total;
                }
                setTotal(finTotal);
                setRevenueTotal(finrevenueTotal);
                setisLoading(false);

            }
            );
    }, [status]);

    return (
        <div>
            <center><h2 style={{ marginTop: -9, fontStyle: 'italic', color: 'white' }}>DashBoard</h2></center>
            <h3 style={{ marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Orders :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Vendor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-disabled"
                                        value={status}
                                        onChange={(event) => {
                                            setisLoading(true);
                                            setStatus(event.target.value);
                                        }}
                                        label="Enter Status"
                                    >
                                        <MenuItem value="Prachin">
                                            Prachin
                                        </MenuItem>
                                        <MenuItem value="Timios">Timios</MenuItem>
                                        <MenuItem value="Jeevamrut Foods">Jeevamrut Foods</MenuItem>
                                        <MenuItem value="Organic India">Organic India</MenuItem>
                                        <MenuItem value="Back To Roots">Back To Roots</MenuItem>
                                        <MenuItem value="Amruthaahaara">Amruthaahaara</MenuItem>
                                        <MenuItem value="Karshaka">Karshaka</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderdata.length > 1 && !(isLoading) ?
                            <TableRow >
                                <TableCell>{status}</TableCell>
                                <TableCell align="center">{newCount.length >= 1 ? newCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{processingCount.length >= 1 ? processingCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{completeCount.length >= 1 ? completeCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{pendingCount.length >= 1 ? pendingCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{cancelCount.length >= 1 ? cancelCount[0].noOfOrders : 0}</TableCell>
                                <TableCell align="center">{

                                    total
                                }</TableCell>
                            </TableRow>
                            : <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, fontStyle: 'italic', color: 'white' }}>Revenue :</h3>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'wheat' }}>Vendor Name</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Select Vendor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-disabled"
                                        value={status}
                                        onChange={(event) => {
                                            setisLoading(true);
                                            setStatus(event.target.value);
                                        }}
                                        label="Enter Status"
                                    >
                                        <MenuItem value="Prachin">
                                            Prachin
                                        </MenuItem>
                                        <MenuItem value="Timios">Timios</MenuItem>
                                        <MenuItem value="Jeevamrut Foods">Jeevamrut Foods</MenuItem>
                                        <MenuItem value="Organic India">Organic India</MenuItem>
                                        <MenuItem value="Back To Roots">Back To Roots</MenuItem>
                                        <MenuItem value="Amruthaahaara">Amruthaahaara</MenuItem>
                                        <MenuItem value="Karshaka">Karshaka</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderdata.length > 1 && !(isLoading) ?
                            <TableRow >
                                <TableCell>{status}</TableCell>
                                <TableCell align="center">{newCount.length >= 1 ? newCount[0].total : 0}</TableCell>
                                <TableCell align="center">{processingCount.length >= 1 ? processingCount[0].total : 0}</TableCell>
                                <TableCell align="center">{completeCount.length >= 1 ? completeCount[0].total : 0}</TableCell>
                                <TableCell align="center">{pendingCount.length >= 1 ? pendingCount[0].total : 0}</TableCell>
                                <TableCell align="center">{cancelCount.length >= 1 ? cancelCount[0].total : 0}</TableCell>
                                <TableCell align="center">{
                                    revenueTotal
                                }</TableCell>
                            </TableRow>
                            : <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 style={{ marginBottom: -1, backgroundColor: '#CD5C5C', fontStyle: 'italic', color: 'white' }}>Orders :</h3>
            {!(isLoading) ?
                <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#222847' }}>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Prachin</h2>
                            {prachinData.length > 2 && prachinData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.noOfOrders}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Karshaka</h2>
                            {karshakaData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.noOfOrders}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Timios</h2>
                            {timiosData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.noOfOrders}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Jeevamrut Foods</h2>
                            {jeevamrutfoodsData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.noOfOrders}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Organic India</h2>
                            {organicindiaData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.noOfOrders}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#222847' }}>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Back To Roots</h2>
                            {backtorootsData.length > 2 && backtorootsData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.noOfOrders}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Amruthaahara</h2>
                            {amruthaaharaData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.noOfOrders}</p>
                                </div>
                            )
                            )
                            }
                        </div>

                    </div></> : <b>...</b>
            }
            {!(isLoading) ?
                <>
                    <h3 style={{ marginBottom: -1, backgroundColor: '#CD5C5C', fontStyle: 'italic', color: 'white' }}>Revenue :</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5, justifyContent: 'space-around', backgroundColor: 'rgb(51 52 60)' }}>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Prachin</h2>
                            {prachinData.length > 2 && prachinData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.total}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Karshaka</h2>
                            {karshakaData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.total}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Timios</h2>
                            {timiosData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.total}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Jeevamrut Foods</h2>
                            {jeevamrutfoodsData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.total}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Organic India</h2>
                            {organicindiaData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.total}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'rgb(51 52 60)' }}>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Back To Roots</h2>
                            {backtorootsData.length > 2 && backtorootsData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.total}</p>
                                </div>
                            )
                            )
                            }
                        </div>
                        <hr></hr>
                        <div style={vendorRow}>
                            <h2 style={vendorTitleStyle}>Amruthaahara</h2>
                            {amruthaaharaData.map((row, index) => (
                                <div key={index} style={vendorOrderStyle}>
                                    <p>{row.deliveryStatus.toUpperCase()} : {row.total}</p>
                                </div>
                            )
                            )
                            }
                        </div>

                    </div></> : <b>...</b>
            }
            {/* {orderdata.length > 2 && !(isLoading) ?
                <AdminData data={orderdata} /> : <b>...</b>} */}
        </div >
    )
}

export default DashBoard
