import React, { useState, useEffect } from 'react'
import './wallet.css'
import { NotificationManager } from "react-notifications";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { Box, CircularProgress, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { SearchOutlined } from "@material-ui/icons";
import TableBody from "@material-ui/core/TableBody";
import WalletInfo from "./WalletInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { APIURL, GetRequestOptions } from '../constants/Constants';
function Wallet() {
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState([]);
    const [errFound, setErrFound] = useState(false);
    // let mobile = "+91"
    // const updateInputValue = (event) => {
    //     setInputValue(mobile + event.target.value.trim());
    // }
    const [user] = useAuthState(auth);
    const history = useHistory();
    useEffect(async () => {
        // if (!user) {
        //     console.log(user);
        //     history.replace("/");
        // }
    }, []);
    const searchOrder = async () => {
        setData("");
        setUserName("");
        // let verifyNumber = inputValue.trim();
        await fetch("https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/" + '/wallet/user/' + inputValue)
            .then(res => res.json())
            .then((data) => {
                data.id != null ? NotificationManager.success('Found it!', 'Successful!', 1000) :
                    NotificationManager.success('Not Found it!', "", 1000);
                setData(data);
                setUserData([]);
                setInputValue("");
            })
            .catch((error) => {
                NotificationManager.error('Unable to retreive your record', 'Failed!');
                // this.setState({
                //     loading: false
                // })
            })
    }
    const searchUserName = async (evt) => {
        evt.preventDefault();
        setErrFound(false);
        setUserData([]);
        setData("");
        await fetch(APIURL + "user/query/" + userName, GetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                if (data.length == 0) { setErrFound(true); }

            });
    }
    const searchWallet = async (userId) => {
        setData("");
        setUserName("");

        await fetch("https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/" + '/wallet/user/' + userId)
            .then(res => res.json())
            .then((data) => {
                data.id != null ? NotificationManager.success('Found it!', 'Successful!', 1000) :
                    NotificationManager.success('Not Found it!', "", 1000);
                setData(data);
                setUserData([]);
                setInputValue("");
            })
            .catch((error) => {
                NotificationManager.error('Unable to retreive your record', 'Failed!');

            })
    }
    return (
        <TableContainer component={Paper} >
            <Table className="table" aria-label="spanning table">
                <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                    <TableRow>
                        <TableCell align="center" style={{ color: 'wheat' }}>
                            <TextField
                                label="Enter User Name"
                                id="standard-bare"
                                variant="outlined"
                                value={userName}
                                onChange={(evt) => setUserName(evt.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <SearchOutlined
                                                onClick={(evt) => searchUserName(evt)}
                                            />
                                        </IconButton>),
                                }}
                            />

                        </TableCell>
                        <TableCell align="center" style={{ color: 'wheat' }}>
                            <TextField
                                label="Enter UserId"
                                id="standard-bare"
                                variant="outlined"
                                value={inputValue}
                                onChange={(evt) => setInputValue(evt.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <SearchOutlined
                                                onClick={() => searchOrder()}
                                            />
                                        </IconButton>),
                                }}
                            />
                        </TableCell>

                    </TableRow>
                </TableHead>
            </Table>
            <Box m={2} />
            <>
                {userData.length > 0 && !errFound ?
                    <ul className="userlist">
                        {userData.map((userdata, index) => (
                            <li><button onClick={() => {

                                searchWallet(userdata.id);
                            }
                            }
                            >{userdata.name}</button></li>
                        ))}
                    </ul>
                    :
                    <>
                        {errFound &&
                            <p>Not Found</p>
                        }
                    </>
                }
            </>
            {(data.name !== null && data !== "") ?
                <WalletInfo data={data} searchOrder={searchOrder} /> :
                <div>
                    {userData.length == 0 && inputValue.length == 0 && <center><h3>Enter User Name or Id</h3></center>}


                </div>}
            <Box m={2} />
        </TableContainer>
    )
}

export default Wallet
