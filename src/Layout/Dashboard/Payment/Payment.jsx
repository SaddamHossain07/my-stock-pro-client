import { Helmet } from 'react-helmet';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key)

const Payment = () => {
    const location = useLocation();
    const packageValue = new URLSearchParams(location.search).get('package');

    return (
        <>
            <Helmet>
                <title>myStock Pro | Payment</title>
            </Helmet>
            <div>
                <DashboardTitle role={'Manager'} subPage={'Payment'}></DashboardTitle>
                <h3>package : {packageValue}</h3>
                <div className='bg-white mt-4 p-16'>
                    <div className='w-8/12 mx-auto bg-slate-200 shadow-xl rounded-xl'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm packageValue={packageValue} />
                        </Elements>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;