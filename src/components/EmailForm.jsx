import emailjs from 'emailjs-com'
import { useState } from 'react';

const EmailForm = () => {

    const [toEmail, setToEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const sendEmail = e => {
        e.preventDefault()

        const serviecID = rvice_9ub6anb
        const templateID = template_17ygi6a
        const userID =

            emailjs.send(serviecID, templateID, {
                toEmail: toEmail, subject, message
            }, userID)
                .then(res => {
                    console.log('Email sent', res)
                }).catch(error => console.log(error))
    }

    return (
        <form >
            <input type="text" />
        </form>
    );
};

export default EmailForm;