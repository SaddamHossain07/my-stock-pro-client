
const Banner = () => {
    return (
        <div className="carousel w-full max-h-[600px] relative mt-16">
            <img src="https://i.ibb.co/H4fd69h/baner.jpg" className="w-full" />
            <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                <div className='text-white space-y-4 w-full md:w-3/4 lg:w-1/2 md:space-y-8 p-6 md:pl-12'>
                    <h2 className='text-3xl md:text-6xl font-bold'>myStock Pro</h2>
                    <p className="md:font-semibold">You are getting all important services of business including Inventory management, purchase order management, Supplier report & cash-flow management system.</p>
                    <p className="font-bold text-xl">Make your choice now from $99.00</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;