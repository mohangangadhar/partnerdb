import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';

import { TextField, Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



import { NotificationManager } from "react-notifications";
import { APIURL } from '../../constants/Constants';


function UserEditDialog(props) {
  const { onClose, open, setisLoading, getData, userData } = props;
  const [updating, setUpdating] = useState(false);
  const [altMobileNumber, setAltMobileNumber] = useState("");
  const [active, setActive] = useState(false);
  const handleClose = () => {
    setUpdating(false);

    setAltMobileNumber("");

    onClose();
  };
  const handleCancel = () => {
    onClose();
  };



  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setUpdating(true);
    let reqBody = {
      altMobileNumber: altMobileNumber
    }
    let requestOptionsForPut = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody)
    };
    await fetch(APIURL + `user/${userData.id}`, requestOptionsForPut).
      then(response => response.json()).then(data => {
        NotificationManager.success('You changes have been updated!', 'Successful!', 1000);
        handleClose();
        getData();
      }).catch(err => {
        console.log(err);
        setUpdating(false);
      });
  }
  return (
    <Dialog open={open}
      maxWidth>
      <DialogTitle>{!updating ? "Add Alt Number" : <h3 style={{ color: 'red' }}>Updating...</h3>}
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
      />

      {userData.id && <b>[{userData.id}] : {userData.name}</b>}
      <TextField value={altMobileNumber}
        onChange={(ev) => setAltMobileNumber(ev.target.value)}
        variant="filled" color="success" margin="normal" />
      <Box sx={{ height: '10px' }} />
      <Button disabled={updating ? true : false} variant='contained' color="primary" onClick={(ev) => handleSubmit(ev)} >Submit</Button>
    </Dialog>
  );
}
export default UserEditDialog;