import React from 'react'
import emailjs from 'emailjs-com';
const dummy = () => {
    let name = "Bhavani";
    let email = "bhavaniprasadsastra@gmail.com";
    let subject = "Hiii";
    let message = "Message";
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_6su3zlp', 'template_7jfisde', e.target, 'user_LJaGxh5HdqkXRo3ivnoRW')
            .then((result) => {
                console.log(result);
            }).catch(error => {
                console.log(error.text);
            });
    };
    return (
        <div style={{ justifyContent: 'center' }}>

            <form className="contact-form" onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="name" value={name} />
                <label>Email</label>
                <input type="email" name="email" value={email} />
                <label>Subject</label>
                <input type="text" name="subject" value={subject} />
                <label>Message</label>
                <textarea name="message" value={message} />
                <input type="submit" value="Send" />
            </form>

        </div>
    )
}

export default dummy