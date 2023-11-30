import { FaCheck } from "react-icons/fa";

const Summary = () => {
    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 py-16 px-8 max-w-7xl flex justify-center items-center">
            <div className="grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between">
                <div className="text-white">
                    <div className="flex gap-6 items-center">
                        <FaCheck className="text-3xl md:text-4xl lg:text-6xl font-bold" />
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold">382</h3>
                    </div>
                    <h3 className="text-2xl font-bold mt-3">Happy Customers</h3>
                </div>
                <div className="text-white">
                    <div className="flex gap-6 items-center">
                        <FaCheck className="text-3xl md:text-4xl lg:text-6xl font-bold" />
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold">2343</h3>
                    </div>
                    <h3 className="text-2xl font-bold mt-3">Sales Per Month</h3>
                </div>
                <div className="text-white">
                    <div className="flex gap-6 items-center">
                        <FaCheck className="text-3xl md:text-4xl lg:text-6xl font-bold" />
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold">564</h3>
                    </div>
                    <h3 className="text-2xl font-bold mt-3">Regular Customers</h3>
                </div>
                <div className="text-white">
                    <div className="flex gap-6 items-center">
                        <FaCheck className="text-3xl md:text-4xl lg:text-6xl font-bold" />
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold">134</h3>
                    </div>
                    <h3 className="text-2xl font-bold mt-3">Delivery Points</h3>
                </div>
            </div>

        </div>
    );
};

export default Summary;