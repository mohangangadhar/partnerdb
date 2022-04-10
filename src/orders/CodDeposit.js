import React, { useState, useEffect } from 'react'
import { APIURL } from '../constants/Constants';
import { NotificationManager } from "react-notifications";
import WalletInfo from '../Wallet/WalletInfo';
const CodDeposit = ({ mobileNumber }) => {
    const [data, setData] = useState("");
    const searchOrder = async () => {
        setData("");
        console.log(mobileNumber);
        await fetch(APIURL + 'wallet/' + mobileNumber)
            .then(res => res.json())
            .then((data) => {
                data.id != null ? NotificationManager.success('Found Wallet!', 'Successful!', 1000) :
                    NotificationManager.success('Not Found Wallet!', "", 1000);
                setData(data);
            })
            .catch((error) => {
                NotificationManager.error('Unable to retreive your record', 'Failed!');

            })
    }
    console.count();
    useEffect(() => {
        searchOrder();
    }, [])
    return (
        <div>
            {(data.name !== null && data !== "") &&
                <WalletInfo data={data} />}

        </div>

    )
}

export default CodDeposit