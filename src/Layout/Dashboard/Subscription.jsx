import { Helmet } from "react-helmet";
import DashboardTitle from "../../components/DashboardTitle/DashboardTitle";
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom";
const Subscription = () => {

    return (
        <>
            <Helmet>
                <title>myStock Pro | Subscription</title>
            </Helmet>
            <div>
                <DashboardTitle role={'Manager'} subPage={'Subscription'}></DashboardTitle>
                <div className="bg-white w-full text-center p-8 mt-3">
                    <div>
                        <p className="text-sm font-semibold text-purple-600">Pricing</p>
                        <h2 className="text-3xl font-bold text-gray-700">Pricing plans for your shop</h2>
                        <p className="text-md mt-4 font-semibold text-gray-500">Choose an affordable plan that’s packed with the best features for increasing your profit, <br /> creating customer loyalty, and driving sales.</p>
                    </div>
                    <div className="grid gap-6 grid-cols-3  justify-center mt-12 px-10">
                        <div className="border overflow-hidden border-purple-200 rounded-xl shadow-xl">

                            <div className="h-20 w-20 mt-6 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-3xl font-bold flex justify-center items-center">
                                $10
                            </div>

                            <div className="w-full bg-gradient-to-r from-purple-200 to-pink-200 px-6 py-4 mt-6">
                                <h2 className="text-xl text-purple-600 font-bold text-start underline">Startup</h2>
                                <ul className="text-start mt-2 text-xs">
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />200 products limit</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />Up to 1,000 subscribers</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />Basic analytics</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />48-hour support response time</li>
                                </ul>
                                <Link to="/dashboard/payment?package=10">
                                    <button className="btn btn-sm px-6 rounded-full text-purple-600 hover:text-white border-0 uppercase font-semibold bg-white hover:bg-purple-600 shadow-lg mt-6 mb-2">Subscribe</button>
                                </Link>
                            </div>


                        </div>
                        <div className="border scale-110 overflow-hidden border-purple-300 rounded-xl shadow-xl">
                            <div className="h-20 w-20 mt-6 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-3xl font-bold flex justify-center items-center">
                                $20
                            </div>
                            <div className="w-full bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-4 mt-6">
                                <h2 className="text-xl text-purple-800 font-bold text-start underline">Exclusive</h2>
                                <ul className="text-start mt-2 text-xs">
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />450 products limit</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />Up to 10,000 subscribers</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />Basic analytics</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />48-hour support response time</li>
                                </ul>
                                <Link to="/dashboard/payment?package=20">
                                    <button className="btn btn-sm px-6 rounded-full text-purple-600 hover:text-white border-0 uppercase font-semibold bg-white hover:bg-purple-600 shadow-lg mt-6 mb-2">Subscribe</button>
                                </Link>
                            </div>


                        </div>
                        <div className="border overflow-hidden border-purple-200 rounded-xl shadow-xl">
                            <div className="h-20 w-20 mt-6 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-3xl font-bold flex justify-center items-center">
                                $50
                            </div>
                            <div className="w-full bg-gradient-to-r from-purple-200 to-pink-200 px-6 py-4 mt-6">
                                <h2 className="text-xl text-purple-600 font-bold text-start underline">Premium</h2>
                                <ul className="text-start mt-2 text-xs">
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />1500 products limit</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />Unlimited subscribers</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />Basic analytics</li>
                                    <li className="flex py-1 items-center"><IoMdCheckmarkCircleOutline className="text-purple-600 mr-2" />24/7 support response</li>
                                </ul>
                                <Link to="/dashboard/payment?package=50">
                                    <button className="btn btn-sm px-6 rounded-full text-purple-600 hover:text-white border-0 uppercase font-semibold bg-white hover:bg-purple-600 shadow-lg mt-6 mb-2">Subscribe</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscription;