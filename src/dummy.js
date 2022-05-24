import React from 'react'

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
            //         'Authorization': 'Basic ' + ('rzp_live_IU4OXE829Ye0R2:p3T00tCsAjfS8dUrQXLMVHJp'),
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(options)
            // });
            var response = instance.paymentLink.create(options, {
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            });
            // const data = await response.json();
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div style={{ justifyContent: 'center' }}>
            <button onClick={handlePaymentLink}>Pay</button>
        </div>
    )
}

export default dummy