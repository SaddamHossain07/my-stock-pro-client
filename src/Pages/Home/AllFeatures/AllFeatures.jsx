
const AllFeatures = () => {
    return (
        <div className="p-8 w-full">
            <h2 className="text-4xl text-gray-600 font-bold">Our Features</h2>
            <div className="mt-8 flex flex-col md:flex-row gap-16">
                <div className="w-full md:w-1/2">
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Free shipping</h3>
                            <h3>69%</h3>
                        </div>
                        <progress className="progress progress-secondary" value="70" max="100"></progress>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Free Returns</h3>
                            <h3>65%</h3>
                        </div>
                        <progress className="progress progress-secondary" value="65" max="100"></progress>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Customer service</h3>
                            <h3>89%</h3>
                        </div>
                        <progress className="progress progress-secondary" value="89" max="100"></progress>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Secured payments</h3>
                            <h3>88%</h3>
                        </div>
                        <progress className="progress progress-secondary" value="88" max="100"></progress>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Variety of assortment</h3>
                            <h3>75%</h3>
                        </div>
                        <progress className="progress progress-secondary" value="75" max="100"></progress>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Product quality</h3>
                            <h3>95%</h3>
                        </div>
                        <progress className="progress progress-secondary" value="95" max="100"></progress>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AllFeatures;