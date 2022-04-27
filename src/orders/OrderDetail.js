import React, { Fragment, useEffect, useState, useRef } from 'react'
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loader from '../components/Loader/Loader';
import emailjs from 'emailjs-com';
import { Container, Divider, FormLabel, Button } from "@material-ui/core";
import { TextField } from '@mui/material';
import { Item } from "../components/Item";
import Invoice from '../components/Invoice';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import { NotificationManager } from "react-notifications";
import { APIURL, GetRequestOptions } from '../constants/Constants';
import OrderEditDialog from './OrderEditDialog';
import CodDeposit from './CodDeposit';
import Picker from '../components/Picker';
function OrderDetail(props) {
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState("");
    const [orderProductList, setOrderProductList] = useState([]);
    const [userData, setUserData] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const [editContactId, setEditContactId] = useState(null);
    const [userAddress, setUserAddress] = useState({});
    const formClick = useRef();
    const [open, setOpen] = useState(false);
    const [refundCount, setRefundCount] = useState(0);
    const [totalData, setTotalData] = useState({
        total: 0,
        refundTotal: 0,
        deliveredTotal: 0,
        returnRefundTotal: 0,
        discountTotal: 0
    });
    const [comment, setComment] = useState("");
    const [finalTotal, setFinalTotal] = useState(0);
    const [paymentType, setPaymentType] = useState({
        method: "",
        type: ""
    });
    const [paymentStatus, setPaymentStatus] = useState({
        status: "",
        pendingAmount: "",
        razorpayPaymentId: ""
    });
    const [isApiLoading, setisApiLoading] = useState(false);
    const [dialogData, setDialogData] = useState({
        orderId: 0,
        userId: 0,
    })
    const [addFormData, setAddFormData] = useState({
        deliveredQuantity: 0,
        productQuality: "",
        returnQuantity: 0,
        discountPercentage: 0,
        discountValue: 0
    });
    const [user] = useAuthState(auth);
    const [paymentRefData, setPaymentRefData] = useState({
        paymentReference: "",
        paymentReferenceDate: "",
        actualDeliveryDate: "",
        deliveryPartner: ""
    });
    const [editFeedback, setEditFeedback] = useState("");
    const [paymentDate, setPaymentDate] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const history = useHistory();
    const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDcxMzQxNDQ3NmFjZjMzNmZlZTAzYjk0YTBiNGRkMjJiOWE0NTk3M2U5Y2MyN2M5Y2U1OTdjZjJhMmJhZDIwZTQ4Y2M0OWVjODU0MGVjZTIiLCJpYXQiOjE2NDQzMDYyOTgsIm5iZiI6MTY0NDMwNjI5OCwiZXhwIjoxNjc1ODQyMjk3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.cPLfFwvU-9Ga26YBaGc_dnLKHj1hbDC4ozf8YA6nX-Z72XMN-nOMWN8v-7uchBvIjSWfN-i4_J4k9bQMO0c-o8J1RncvlEu55EUTfTaHd5L8lYovuCiNYp0C5aNlK4uoYg9ms7koMcEt0n4Sd818y9SLWAXOOFJ_aNQHNl69Fpj9fMRs5l2idMonnEK-IMIHbZ-1JQsLo2m5DkjASfFi3sTDywsRJ4Zj78ajN7kvtyOT2yokc4DdDlcYCeFwtHfoNtm7M9yY4uNpiPTtagKDmzBpnB9wRsXcyEO_M8KJVBPLGmB6DzOov5_D0P4Ir61Oae6ZEmyul7upnHqKqBCRPi7w3k-oM1Z8yljgvag7AcVZjNcVdUX4nB8KDt3FQHiBrIf6FN39xZUNivQ_aeBottFLbB6x5-zoYxFB0n4tI7rk5GpuIhHFNEa2-c3Jx5QNKaZ_ohHaPGu8VfTowZ0p9l_Lh6NodHlnTaeMRXDCJgcpTgstEOW-eIOaBjCH7raj3tE6oXSxc47r23Ro1-hGXWsHkcDATDPX5g4HXzLwWUksgkPnQ8ignDAUwrWywcqX_smIpnR2PGVdUXoJNiL9DElpwQs7cwQy4gCsuFdEs_fZOYwYz5OiGhaIxcIKEJsvoGZ-ItuHfWTYVUQqE-sgGPTNpGc7Fa_dqSmbhkK2PNo";
    let userId = auth.currentUser.uid;
    useEffect(() => {
        if (auth.user) {
            userId = auth.currentUser.uid;
        }
    }, []);
    const getData = async () => {
        await fetch(APIURL + 'order/' + props.location.id, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setOrder(data.order);
                setOrderProductList(data.orderProductList);
                setUserData(data.order.user);
                setUserAddress(data.ecommerceOrderAddress);
                setPaymentType({
                    method: data.paymentMethodFB.slug,
                    type: data.paymentMethodFB.type
                });
                setDialogData({
                    userId: data.order.user.id,
                    orderId: data.order.id,
                })
                setComment(data.order.comments);
                setEditFeedback(data.order.feedback);
                setStatus(data.order.deliveryStatus);
                setFinalTotal(data.order.finalTotal);
                setRefundCount(data.order.refundCount == null ? 0 : data.order.refundCount);
                setPaymentRefData({
                    paymentReference: data.order.paymentReference,
                    paymentReferenceDate: data.order.paymentReferenceDate,
                    actualDeliveryDate: data.order.actualDeliveryDate,
                    deliveryPartner: data.order.deliveryPartner
                });
                setPaymentDate(data.order.paymentReferenceDate);
                setDeliveryDate(data.order.actualDeliveryDate);
                setTotalData({
                    total: data.order.total,
                    refundTotal: data.order.refundTotal,
                    deliveredTotal: data.order.deliveredTotal,
                    returnRefundTotal: data.order.returnRefundTotal,
                    discountTotal: data.order.discountTotal
                });

            }
            );
    }
    const getPaymentStatus = async () => {
        await fetch(APIURL + "order/payment-status/" + props.location.id).then(
            response => response.json()
        ).then(data => {
            if (data.status == 500) {
                setPaymentStatus({
                    status: "pending",
                    pendingAmount: "TBC",
                    razorpayPaymentId: "no razorpay id"
                })
            }
            else {
                setPaymentStatus({
                    status: data.status,
                    pendingAmount: data.pendingAmount,
                    razorpayPaymentId: data.razorpayPaymentId
                })
            }

        }).catch(err => console.log(err))
    }
    useEffect(async () => {
        await getData();
        await getPaymentStatus();
        setisLoading(false);
    }, [isLoading]);
    const sendEmail = async (e) => {
        e.preventDefault();
        // setisLoading(true);
        // await handleSubmit();
        // if (status == "failed") {
        //     return;
        // }
        // if(userId=="MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2"){
        //     emailjs.sendForm('service_6su3zlp', 'template_7jfisde', e.target, 'user_LJaGxh5HdqkXRo3ivnoRW')
        //     .then((result) => {
        //         NotificationManager.success('Sent Email', 'Successful!', 1000);
        //     }).catch(error => {
        //         console.log(error.message);
        //     });
        // }

    };
    const handleSubmit = async (val) => {
        let orderdata = {
            "status": val,
        };
        let apiUrl;
        apiUrl = `https://admin.ityme.in/api/admin/orders/${props.location.id}`;

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderdata)
        };
        await fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                setisLoading(false);
                NotificationManager.success('Updated Status', 'Successful!', 1000);
            }
            ).then(history.goBack());

    }
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }

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
            deliveredQuantity: row.deliveredQuantity,
            productQuality: row.productQuality,
            returnQuantity: row.returnQuantity,
            discountPercentage: row.discountPercentage,
            discountValue: row.discountValue
        });
        setEditContactId(row.id);
    }
    //Upload backend individual order
    const uploadBackEnd = async (row, tempFormData) => {
        setisApiLoading(true);
        let urlString = APIURL + `/order-product-m/${row.id}`;
        let orderProductData = {
            "deliveredQuantity": tempFormData.deliveredQuantity,
            "refund": row.refund,
            "productQuality": tempFormData.productQuality,
            "returnRefund": row.returnRefund,
            "returnQuantity": row.returnQuantity == null ? 0 : row.returnQuantity,
            "discountPercentage": row.discountPercentage,
            "discountValue": row.discountValue
        };

        const requestOptionsForUpdate = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderProductData)
        };
        await fetch(urlString, requestOptionsForUpdate)
            .then(response => response.json())
            .then(data => {
                let updateBody = {
                    "id": props.location.id,
                    "status": status,
                    "comments": comment,
                    "refundCount": refundCount,
                    "paymentReference": paymentRefData.paymentReference,
                    "paymentReferenceDate": paymentRefData.paymentReferenceDate,
                    "actualDeliveryDate": paymentRefData.actualDeliveryDate,
                    "deliveryPartner": paymentRefData.deliveryPartner,
                    "feedback": editFeedback
                };
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateBody)
                };

                fetch(APIURL + "order/status", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        getData();
                        NotificationManager.success('Updated Status', 'Successful!', 1000);
                    }
                    );
                setisApiLoading(false);
            }
            ).catch((err) => {
                setisApiLoading(false);
                console.log(err);
            }
            );
    }
    //Form Submit
    const handleFormSubmit = async (event, row, tempFormData) => {
        event.preventDefault();
        console.log(tempFormData);
        setAddFormData("");
        let xyz = row;
        xyz = { ...xyz };
        xyz.deliveredQuantity = tempFormData.deliveredQuantity;

        xyz.refund = row.vendorProduct.salePrice <= 0 || null ? tempFormData.deliveredQuantity * row.vendorProduct.product.price : tempFormData.deliveredQuantity * row.vendorProduct.salePrice;
        xyz.returnQuantity = tempFormData.returnQuantity;
        xyz.returnRefund = row.vendorProduct.salePrice <= 0 || null ? tempFormData.returnQuantity * row.vendorProduct.product.price : tempFormData.returnQuantity * row.vendorProduct.salePrice;
        xyz.productQuality = tempFormData.productQuality == null ? "" : tempFormData.productQuality;
        xyz.discountPercentage = tempFormData.discountPercentage == null ? 0 : tempFormData.discountPercentage;
        xyz.discountValue = tempFormData.discountValue == null ? 0 : tempFormData.discountValue;


        setEditContactId(null);
        uploadBackEnd(xyz, tempFormData);
    }
    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //UPLOAD WALLET
    const uploadWalletBackend = async (refundTotal, type) => {
        setisApiLoading(true);
        // console.log(refundTotal);
        await fetch("https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/" + '/wallet/' + userData.mobileNumber)
            .then(res => res.json())
            .then((data) => {
                let meta = {
                    type: "earnings",
                    source: "order",
                    source_id: "",
                    description: `Refunds(${type}) for Order #${order.id}`,
                    source_amount: 70,
                    source_payment_type: "Online",
                    source_title: ""
                };
                var source = {
                    walletId: data.id,
                    amount: refundTotal,
                    type: "deposit",
                    accepted: "1",
                    currentBalance: data.balance,
                    meta: JSON.stringify(meta),
                }
                fetch(`https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/wallet/${data.id}/transaction`, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(source),
                })
                    .then(data => {
                        console.log('Success:', data.json());
                        NotificationManager.success('Wallet Updated!', 'Successful!', 1000);
                        setisApiLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        NotificationManager.error('Error occurred while making your changes, contact support!', 'Error!');
                    });
            }).catch(err => setisApiLoading(false));
    }
    //Handle Update
    const handleUpdate = async (ev, typeOfRefund) => {
        ev.preventDefault();
        setisApiLoading(true);
        let message = "";
        if (typeOfRefund == "first") {
            message = "Undelivered Items";
        }
        else if (typeOfRefund == "second") {
            message = "Post Delivery";
        }
        else {
            message = "Discount"

        }
        let updateBody = {
            "id": props.location.id,
            "status": status,
            "comments": comment + " | " + message + " refunds done ",
            "refundCount": refundCount + 1,
            "paymentReference": paymentRefData.paymentReference,
            "paymentReferenceDate": paymentRefData.paymentReferenceDate,
            "actualDeliveryDate": paymentRefData.actualDeliveryDate,
            "deliveryPartner": paymentRefData.deliveryPartner,
            "feedback": editFeedback
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateBody)
        };

        await fetch(APIURL + "order/status", requestOptions)
            .then(response => response.json())
            .then(data => {
                let depositAmount = 0;

                let value = 0;
                if (typeOfRefund == "first") {
                    depositAmount = data.refundTotal;


                }
                else if (typeOfRefund == "second") {
                    depositAmount = data.returnRefundTotal;

                }
                else {
                    depositAmount = data.discountTotal;


                }
                uploadWalletBackend(depositAmount, message);
                getData();
                NotificationManager.success('Updated Status', 'Successful!', 1000);
            }
            );

    }
    const handleUpdateComment = async () => {

        let updateBody = {
            "id": props.location.id,
            "status": status,
            "comments": comment,
            "refundCount": refundCount,
            "paymentReference": paymentRefData.paymentReference,
            "paymentReferenceDate": paymentRefData.paymentReferenceDate,
            "actualDeliveryDate": paymentRefData.actualDeliveryDate,
            "deliveryPartner": paymentRefData.deliveryPartner,
            "feedback": editFeedback
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateBody)
        };

        await fetch(APIURL + "order/status", requestOptions)
            .then(response => response.json())
            .then(data => {
                NotificationManager.success('Updated Status', 'Successful!', 1000);
            }
            );
    }
    return (
        <div>
            {isApiLoading ? <Loader /> :
                <>
                    {Object.keys(order).length > 2 && !(isLoading) ?
                        <Container maxWidth="md" fixed={false}>
                            <Table className="table" aria-label="spanning table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>
                                            <Item />
                                        </TableCell>
                                        <TableCell>
                                            <FormLabel style={{ color: 'wheat' }}> Order No : {props.location.id} </FormLabel>
                                        </TableCell>
                                        <TableCell>
                                            <FormLabel style={{ color: 'wheat' }}>Date: {new Date(Date.parse(order.createdAt + " UTC")).toLocaleString()} </FormLabel>
                                        </TableCell>
                                        <TableCell>
                                            <FormLabel style={{ color: 'wheat' }}>Current Status: {order.deliveryStatus} </FormLabel>
                                        </TableCell>
                                        <TableCell>
                                            {userId == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ?
                                                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Enter Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-required-label"
                                                        id="demo-simple-select-disabled"
                                                        value={status}
                                                        onChange={(event) => {
                                                            setStatus(event.target.value);
                                                            // if (event.target.value == "cancelled") {
                                                            //     uploadWalletBackend(totalData.total, "Cancelled");
                                                            // }
                                                            handleSubmit(event.target.value);
                                                        }}
                                                        label="Enter Status"
                                                    >
                                                        <MenuItem value="accepted">
                                                            Accepted
                                                        </MenuItem>
                                                        <MenuItem value="prepared">
                                                            Out For Delivery
                                                        </MenuItem>
                                                        <MenuItem value="complete">Complete</MenuItem>
                                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                                        <MenuItem value="failed">Failed</MenuItem>
                                                        <MenuItem value="pending">Pending</MenuItem>
                                                    </Select>
                                                </FormControl> :
                                                <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
                                                    <InputLabel style={{ color: 'white' }} id="demo-simple-select-required-label">Enter Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-required-label"
                                                        id="demo-simple-select-disabled"
                                                        value={status}
                                                        onChange={(event) => {
                                                            setStatus(event.target.value);
                                                        }}
                                                        label="Enter Status"
                                                    >
                                                        <MenuItem value="left from seller warehouse">
                                                            Left from Warehouse
                                                        </MenuItem>
                                                        <MenuItem value="Order Received">Order Received</MenuItem>
                                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            }
                                        </TableCell>
                                    </TableRow>
                                    {userId == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" &&
                                        <>
                                            <TableRow>
                                                <TableCell>
                                                    <FormLabel style={{ color: 'wheat' }}>[{userData.id}] : {userData.name} </FormLabel>
                                                </TableCell>
                                                <TableCell>
                                                    <FormLabel style={{ color: 'wheat' }}> Mobile : {userData.mobileNumber} </FormLabel>
                                                </TableCell>
                                                <TableCell>
                                                    <FormLabel style={{ color: 'wheat' }}> Email : {userData.email} </FormLabel>
                                                </TableCell>
                                                <TableCell>
                                                    <FormLabel style={{ color: 'wheat' }}> Payment Method: {paymentType.method} , Status : {paymentStatus.status} , Pending Amount : {paymentStatus.pendingAmount} [{paymentStatus.razorpayPaymentId}] </FormLabel>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={(ev) => handleClickOpen(ev)}>
                                                        Associate
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={4}>
                                                    <FormLabel style={{ color: 'wheat' }}> Address : {userAddress.formattedAddress} {userAddress.address1} {userAddress.address2} </FormLabel>
                                                </TableCell>
                                                <TableCell colSpan={2}>
                                                    <FormLabel style={{ color: 'wheat' }}> Delivery Fee : {order.deliveryFee} </FormLabel>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    }
                                </TableHead>
                            </Table>
                        </Container>
                        :
                        <center>
                            <CircularProgress />
                        </center>
                    }
                    <Divider />
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="spanning table">
                            <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                                <TableRow>
                                    <TableCell style={{ color: 'wheat' }}>Sl.No</TableCell>
                                    <TableCell style={{ color: 'wheat' }}>Desc</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Qty</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Unit Cost</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Sale Price</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>UnDelivered Quantity</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Refund</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Return Quantity</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Return Refunds</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Discount(%)</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Discount Value</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Quality</TableCell>
                                    <TableCell align="center" style={{ color: 'wheat' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderProductList.length > 0 ? orderProductList.map((row, index) => (
                                    <Fragment>
                                        {editContactId === row.id ? (
                                            <EditableRow row={row} index={index} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />) :
                                            <ReadOnlyRow row={row} index={index} addFormData={addFormData} handleEditClick={handleEditClick} />}
                                    </Fragment>
                                )) : <TableRow> <TableCell align="center" colSpan={4}>No Data Found</TableCell> </TableRow>}
                                <TableRow>

                                    <TableCell align="left" colSpan={9}>
                                        <ul style={{ textDecoration: 'none' }}>
                                            <li>Total Invoice: {totalData.total}</li>
                                            <li>Undelivered Refund: {totalData.refundTotal}</li>
                                            <li>Total Delivered amount: {totalData.deliveredTotal}</li>
                                            <li>Post delivery refund : {totalData.returnRefundTotal}</li>
                                            <li>Total Discounts : {totalData.discountTotal}</li>
                                            <li>Final Total : {finalTotal == 0 ? totalData.total : finalTotal}</li>
                                        </ul>
                                    </TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Container style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                        <input onClick={(ev) => handleUpdate(ev, "first")} style={{ backgroundColor: '#D5D5D5', padding: '12px', borderRadius: '10px', cursor: 'pointer' }} type="submit" value="Undelivered Refunds" />
                        <input onClick={(ev) => handleUpdate(ev, "second")} style={{ backgroundColor: '#D5D5D5', padding: '12px', borderRadius: '10px', cursor: 'pointer' }} type="submit" value="Post Delivery Refunds" />
                        <input onClick={(ev) => handleUpdate(ev, "discount")} style={{ backgroundColor: '#D5D5D5', padding: '12px', borderRadius: '10px', cursor: 'pointer' }} type="submit" value="Discount Refunds" />
                    </Container>
                    <Container>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <TextField multiline label="Add Comment" value={comment}
                                    onChange={(ev) => setComment(ev.target.value)
                                    }
                                    InputProps={{
                                        style: {
                                            color: "white",
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                />
                            </TableCell>
                            <TableCell colSpan={2}>
                                <TextField multiline label="Add Payment Reference" value={paymentRefData.paymentReference}
                                    onChange={(ev) => setPaymentRefData((prev) => ({
                                        ...prev,
                                        paymentReference: ev.target.value
                                    }
                                    ))
                                    }
                                    InputProps={{
                                        style: {
                                            color: "white",
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                />
                            </TableCell>
                            <TableCell colSpan={2}>
                                {paymentDate == null ? <Picker color="white" date={paymentRefData.paymentReferenceDate} dateChange={(e) => setPaymentRefData((prev) => ({
                                    ...prev,
                                    paymentReferenceDate: e.target.value
                                }
                                ))
                                } label={"Payment Date"} /> : <h3 style={{ color: "white" }}>Payment Date : {paymentRefData.paymentReferenceDate}</h3>}
                            </TableCell>
                            <TableCell colSpan={2}>
                                {deliveryDate == null ? <Picker color="white" date={paymentRefData.actualDeliveryDate} dateChange={(e) => setPaymentRefData((prev) => ({
                                    ...prev,
                                    actualDeliveryDate: e.target.value
                                }
                                ))
                                } label={"Delivered Date"} /> : <h3 style={{ color: "white" }}>Actual Delivered Date : {paymentRefData.actualDeliveryDate}</h3>}
                            </TableCell>
                            <TableCell colSpan={2}>
                                <TextField label="Add Delivery Partner" value={paymentRefData.deliveryPartner}
                                    onChange={(ev) => setPaymentRefData((prev) => ({
                                        ...prev,
                                        deliveryPartner: ev.target.value
                                    }
                                    ))
                                    }
                                    InputProps={{
                                        style: {
                                            color: "white",
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                />
                            </TableCell>


                        </TableRow>
                        <>

                            <TextField label="Add Feedback" value={editFeedback}
                                onChange={(ev) => setEditFeedback(ev.target.value)}
                                style={{ width: '80%' }}
                                InputProps={{
                                    style: {
                                        color: "white",
                                    }
                                }}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <Button variant="contained" color="success" onClick={handleUpdateComment}>Update</Button>

                        </>
                    </Container>
                    {userData.mobileNumber &&
                        <TableContainer component={Paper} >
                            <CodDeposit mobileNumber={userData.mobileNumber} />
                        </TableContainer>
                    }
                    <Container>
                        <OrderEditDialog
                            open={open}
                            getData={getData}
                            onClose={handleClose}
                            dialogData={dialogData}
                            total={totalData.total}
                            setisLoading={setisLoading}
                        />
                    </Container>
                    <Container style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                        <form onSubmit={(ev) => handleUpdate(ev)}>
                            <div style={{ display: 'none' }}>
                                <label>Name</label>
                                <input type="text" name="name" value={userData.name} />
                                <label>Email</label>
                                <input type="email" name="email" value={userData.email} />
                                <label>Subject</label>
                                <input type="text" name="orderNo" value={props.location.id} />
                                <label>Message</label>
                                <textarea name="message" value={status} />
                                <input disabled={totalData.refundTotal == 0 ? "" : "disabled"} style={{ backgroundColor: '#D5D5D5', padding: '12px', borderRadius: '10px', cursor: 'pointer' }} type="submit" value="Update" />
                            </div>

                        </form>
                    </Container >
                    {
                        Object.keys(order).length > 2 && !(isLoading) ?
                            <div>
                                <PDFDownloadLink document={<Invoice order={order} orderProductList={orderProductList}
                                    userData={userData} userId={userId} />} fileName={order.id}>
                                    {({ blob, url, loading, error }) => (loading ? 'Loading...' : <Button variant='contained' color="success">Generate Invoice</Button>)}
                                </PDFDownloadLink>
                            </div> : <b>""</b>
                    }
                </>
            }
        </div >

    )

}

export default OrderDetail
