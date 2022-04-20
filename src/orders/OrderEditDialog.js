import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';

import { TextField, Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { APIURL } from '../constants/Constants';

import { NotificationManager } from "react-notifications";


function OrderEditDialog(props) {
    const { onClose, open, dialogData, total, setisLoading, getData } = props;
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [userid, setUserId] = useState(0);
    const [updating, setUpdating] = useState(false);
    const [addressId, setAddresId] = useState(0);
    const [isSelected, setIsSelected] = useState(false);
    const [comment, setComment] = useState("");
    const [mobile, setMobile] = useState("");
    const [active, setActive] = useState(false);
    const handleClose = () => {
        onClose();
    };
    const handleCancel = () => {
        onClose();
    };
    useEffect(() => {
        setisLoading(false);
        setUpdating(false);
        setLoadingAddress(false);
    }, [])
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    const handleUserChange = async (editeduserid) => {
        // console.log(editeduserid);
        setUpdating(false);
        setUserId(editeduserid);
        setIsSelected(false);
        if (editeduserid == "") {
            setLoadingAddress(false);
            return;
        }
        setLoadingAddress(true);
        await fetch(APIURL + `ecommerce-address/user/${editeduserid}`, requestOptions).
            then(response => response.json()).then(data => {
                // console.log(data);
                setAddress(data);
                setLoadingAddress(false);
            });
        await fetch(APIURL + `user/${editeduserid}`).
            then(response => response.json()).then(data => {
                setMobile(data.mobileNumber);
                // console.log(data.mobileNumber)
            });
    }

    const selectAddressId = (ev, id) => {
        ev.preventDefault();
        setIsSelected(true);
        setAddresId(id);
    }
    const submitWallet = async () => {

        let walletid = 0;
        await fetch(APIURL + '/wallet/' + mobile)
            .then(res => res.json())
            .then((data) => {
                walletid = data.id;
            });

        var meta = {
            type: "earnings",
            source: "order",
            source_id: "",
            description: comment,
            source_amount: 70,
            source_payment_type: "Online",
            source_title: "",
        };

        var source = {
            walletId: walletid,
            amount: total.toString(),
            type: "withdraw",
            accepted: 1,
            meta: JSON.stringify(meta),
        }
        await fetch(`https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/wallet/${walletid}/transaction`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(source),
        })
            .then(data => {
                setisLoading(true);
                setUpdating(false);
                handleClose();
                getData();
                NotificationManager.success('You changes have been updated!', 'Successful!', 1000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setUpdating(false);
                NotificationManager.error('Error occurred while making your changes, contact support!', 'Error!');
            });
    }
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setUpdating(true);
        let reqBody = {
            user: userid,
            id: dialogData.orderId
        }
        let requestOptionsForPut = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody)
        };
        await fetch(APIURL + `order-m/${addressId}`, requestOptionsForPut).
            then(response => response.json()).then(data => {
                submitWallet();
            }).catch(err => {
                console.log(err);
                setUpdating(false);
            });
    }
    return (
        <Dialog open={open}
            maxWidth>
            <DialogTitle>{!updating ? "Update The Order" : <h3 style={{ color: 'red' }}>Updating...</h3>}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleCancel}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <Box
                noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                }}
            >

                <TextField label="Enter UserId" value={userid}
                    onChange={(ev) => handleUserChange(ev.target.value)}
                    variant="filled" color="success" margin="normal" />
                {!isSelected ?
                    <div>
                        {loadingAddress ?
                            <h1>Loading...</h1> :
                            <>
                                {address.length > 0 && address.map((address, key) => (
                                    <ul key={key}>
                                        <button onClick={(ev) => selectAddressId(ev, address.id)}>
                                            <li>{address.title}  {address.formattedAddress}  {address.pincode}</li>
                                        </button>
                                    </ul>
                                ))

                                }
                            </>
                        }
                    </div> :
                    <>
                        {address.map((address, key) => (
                            <>
                                {address.id == addressId &&
                                    <h2>{address.title}  {address.formattedAddress}  {address.pincode}</h2>
                                }
                            </>
                        ))}
                    </>
                }

                <TextField label="Comment" value={comment}
                    onChange={(ev) => setComment(ev.target.value)}
                    variant="filled" color="success" margin="normal" />
            </Box>
            <Button disabled={updating ? true : false} variant='contained' color="primary" onClick={(ev) => handleSubmit(ev)} >Submit</Button>
        </Dialog>
    );
}
export default OrderEditDialog;