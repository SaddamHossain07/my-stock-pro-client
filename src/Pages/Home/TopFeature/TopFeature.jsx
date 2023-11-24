import { FaShippingFast, FaChevronRight } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";

const TopFeature = () => {
    return (
        <div className="flex justify-around py-10">
            <div className="flex flex-col items-center justify-center">
                <FaShippingFast className="text-4xl" />
                <h3 className="font-bold pt-4 pb-2">Free shipping</h3>
                <p>Free shipping any orders</p>
                <button className="btn btn-md mt-6 px-6 rounded-none bg-gray-800 text-white">
                    READ MORE<FaChevronRight className="text-2xl" />
                </button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <GiReturnArrow className="text-4xl" />
                <h3 className="font-bold pt-4 pb-2">Free returns</h3>
                <p>30-days free return</p>
                <button className="btn btn-md mt-6 px-6 rounded-none bg-gray-800 text-white">
                    READ MORE<FaChevronRight className="text-2xl" />
                </button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <FaSackDollar className="text-4xl" />
                <h3 className="font-bold pt-4 pb-2">Secured payments</h3>
                <p>We accept all cards</p>
                <button className="btn btn-md mt-6 px-6 rounded-none bg-gray-800 text-white">
                    READ MORE<FaChevronRight className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default TopFeature;