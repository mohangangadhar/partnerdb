
import React, { useState, useEffect, Fragment } from 'react';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import { NotificationManager } from "react-notifications";
import Button from '@mui/material/Button';


import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import { APIURL, GetRequestOptions } from '../../constants/Constants';


const EcommerceZones = () => {

  const [isLoading, setisLoading] = useState(false);

  const [editContactId, setEditContactId] = useState(null);
  const [isApiLoading, setisApiLoading] = useState(false);

  const [addFormData, setAddFormData] = useState({
    city: "",
    state: "",
    zoneName: ""
  });
  const [postFormData, setPostFormData] = useState({
    city: "",
    state: "",
    zoneName: ""
  });
  const [editedRowData, setEditedRowData] = useState([]);
  const currentUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/ecommerce-zone/`;
  useEffect(async () => {

    await fetch(APIURL + "ecommerce-zone", GetRequestOptions)
      .then(response => response.json())
      .then(data => {
        setEditedRowData(data);

      }).catch(err => console.log(err));
  }, [isLoading]);
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  const handlePostFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...postFormData };
    newFormData[fieldName] = fieldValue;

    setPostFormData(newFormData);
  };
  const handleEditClick = (event, row) => {
    event.preventDefault();

    setAddFormData({
      city: row.city,
      state: row.city,
      zoneName: row.zoneName
    });
    setEditContactId(row.id);
  }
  const uploadBackEnd = async (row, xyz) => {
    let urlString = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/ecommerce-zone/${row.id}`;
    let zoneData = {
      city: xyz.city,
      state: xyz.state,
      zoneName: xyz.zoneName
    };
    console.log(zoneData);
    setisApiLoading(true);

    const requestOptionsForUpdate = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zoneData)
    };
    await fetch(urlString, requestOptionsForUpdate)
      .then(response => response.json())
      .then(data => {
        NotificationManager.success('UPDATED', 'SUCCESS', 1000);
        setisApiLoading(false);
      }
      ).catch((err) => alert('something wrong' + err));
  }
  const handleFormSubmit = async (event, row, data) => {
    event.preventDefault();
    setAddFormData("");
    let ind;
    let xyz = row;
    xyz = { ...xyz };
    xyz.city = data.city;
    xyz.state = data.state;
    xyz.zoneName = data.zoneName;
    for (let i = 0; i < editedRowData.length; i++) {
      if (row.id == editedRowData[i].id) {
        ind = i;
        break;
      }
    }
    editedRowData[ind] = xyz;
    setEditContactId(null);
    uploadBackEnd(row, data);
  }
  const handleDelete = async (event, id) => {

    event.preventDefault();
    setisApiLoading(true);

    const requestOptionsForDelete = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },

    };
    await fetch(currentUrl + id, requestOptionsForDelete)
      .then(response => {

        setisApiLoading(false);
        NotificationManager.success('DELETED', 'SUCCESS', 1000);
        setisLoading(!isLoading);
      }
      ).catch((err) => alert('something wrong' + err));
  }
  const handlePostSubmit = async (event, data) => {

    event.preventDefault();
    setisApiLoading(true);

    const requestOptionsForUpdate = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    await fetch(currentUrl, requestOptionsForUpdate)
      .then(response => response.json())
      .then(data => {
        setisApiLoading(false);
        editedRowData.push(data);
        NotificationManager.success('ADDED A RECORD', 'SUCCESS', 1000);
        setPostFormData({
          city: "",
          state: "",
          zoneName: ""
        });

      }
      ).catch((err) => alert('something wrong' + err));
  }
  return <div>
    {isApiLoading && <b style={{ position: 'fixed', left: '-20', color: 'white', display: 'flex', justifyContent: 'flex-start', width: '40%', backgroundColor: 'red' }}>Updating...Do not go to any other Page</b>}

    <Table className="table" aria-label="spanning table">
      <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
        <TableRow>
          <TableCell style={{ color: 'wheat' }}>Id</TableCell>
          <TableCell style={{ color: 'wheat' }}>City</TableCell>
          <TableCell style={{ color: 'wheat' }}>State</TableCell>
          <TableCell style={{ color: 'wheat' }}>Zone Name</TableCell>
          <TableCell align="center" style={{ color: 'wheat' }}>Edit</TableCell>
          <TableCell align="center" style={{ color: 'wheat' }}>Delete</TableCell>
        </TableRow>
      </TableHead>
      {editedRowData.length > 0 ?
        <TableBody>
          <TableRow style={{ backgroundColor: 'white' }}>
            <TableCell >0</TableCell>

            <TableCell align="center">
              <input
                type="text"
                placeholder="Enter City"
                name="city"
                value={postFormData.city}
                onChange={handlePostFormChange}
              ></input>
            </TableCell>
            <TableCell align="center">
              <input
                type="text"
                placeholder="Enter State"
                name="state"
                value={postFormData.state}
                onChange={handlePostFormChange}
              ></input>
            </TableCell>
            <TableCell align="center">
              <input
                type="text"
                placeholder="Enter Zone Name"
                name="zoneName"
                value={postFormData.zoneName}
                onChange={handlePostFormChange}
              ></input>
            </TableCell>
            <TableCell colSpan={2} align="center"><Button variant="contained" on color="success"
              onClick={(event) => handlePostSubmit(event, postFormData)}>ADD</Button></TableCell>
          </TableRow>
          {editedRowData.map((row, index) => (
            <Fragment>
              {editContactId === row.id ?

                <EditableRow row={row} handleDelete={handleDelete} addFormData={addFormData} handleEditFormChange={handleEditFormChange} handleFormSubmit={handleFormSubmit} />

                :
                <ReadOnlyRow row={row} handleDelete={handleDelete} handleEditClick={handleEditClick} />}
            </Fragment>

          ))}
        </TableBody>
        :
        <div>
          <center>
            <h2>Loading....</h2>
          </center>
        </div>
      }
    </Table>


  </div >;
};

export default EcommerceZones;
