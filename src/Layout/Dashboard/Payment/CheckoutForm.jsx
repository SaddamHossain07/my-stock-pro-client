import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ packageValue }) => {
    const [error, setError] = useState()
    const [clientSecret, setClientSecret] = useState('')
    const { user } = UseAuth()
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    // console.log('in form page', packageValue, parseInt(packageValue))
    // const price = parseInt(packageValue)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: parseInt(packageValue) })
            .then(res => {
                console.log('from paymentIntent res:', res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, packageValue])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })

        if (confirmError) {
            console.log('confirm Error :', confirmError)
        }
        else {
            axiosSecure.post('/payments', { email: user.email, price: parseInt(packageValue) })
                .then(res => {
                    console.log('payment successful', res.data)
                    if (res.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Subscription is successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(`/dashboard/productManagement/${user.email}`)
                    }
                })
                .catch(error => console.log(error.message))
        }
    };



    return (
        <form className="p-12" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="bg-purple-600 text-white mt-6 btn px-6" type="submit" disabled={!stripe || !clientSecret}>
                Pay Now
            </button>
            <p className="text-red-700">{error}</p>
        </form>
    );
};

export default CheckoutForm;