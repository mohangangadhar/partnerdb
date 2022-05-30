import React from 'react'
import axios from "axios";
const Razorpay = require("razorpay");
const dummy = () => {


    const handlePaymentLink = async () => {
        var instance = new Razorpay({ key_id: "rzp_live_IU4OXE829Ye0R2", key_secret: "p3T00tCsAjfS8dUrQXLMVHJp" });
        var options = {
            amount: 500,
            currency: "INR",
            description: "For mangoes",
            customer: {
                name: "Gaurav Kumar",
                email: "bhavanibharath2@gmail.com.com",
                contact: 919944588103
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            notes: {
                policy_name: "Mangoes"
            },
            callback_url: "https://example-callback-url.com/",
            callback_method: "get"
        };
        try {
            // const response = await fetch("https://api.razorpay.com/v1/payment_links", {
            //     method: 'post',
            //     mode: 'no-cors',
            //     headers: {
            //         'Authorization': 'Basic ' + window.btoa('rzp_live_IU4OXE829Ye0R2:p3T00tCsAjfS8dUrQXLMVHJp'),
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(options)
            // });
            var response = instance.paymentLink.create(options, {
                'method': 'post',
                'mode': 'no-cors',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            const data = await response.json();
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    const sendPaymentLink = async () => {
        var data = JSON.stringify({
            "amount": 1000,
            "currency": "INR",
            "accept_partial": true,
            "first_min_partial_amount": 100,
            "expire_by": 1691097057,
            "reference_id": "TSsd1989",
            "description": "Payment for policy no #23456",
            "customer": {
                "name": "",
                "contact": "+919944588103",
                "email": "bhavaniprasadsmart@gmail.com"
            },
            "notify": {
                "sms": true,
                "email": true
            },
            "reminder_enable": true,
            "notes": {
                "policy_name": "Jeevan Bima"
            },
            "callback_url": "https://example-callback-url.com/",
            "callback_method": "get"
        });

        var config = {
            method: 'post',
            mode: 'no-cors',
            url: 'https://api.razorpay.com/v1/payment_links',
            headers: {
                'Authorization': "Basic " + btoa('rzp_live_IU4OXE829Ye0R2:p3T00tCsAjfS8dUrQXLMVHJp'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div style={{ justifyContent: 'center' }}>
            <button onClick={handlePaymentLink}>Pay</button>
            <button onClick={sendPaymentLink}>Send</button>
        </div>
    )
}

export default dummy