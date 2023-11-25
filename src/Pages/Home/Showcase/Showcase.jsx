import { FaChevronRight } from "react-icons/fa";

const Showcase = () => {
    return (
        <div className="bg-slate-200 w-full p-4 lg:p-16">
            <div className="flex flex-col lg:flex-row justify-between gap-12">
                <div className="w-full lg:w-1/2 h-[340px] relative">
                    <img src="https://i.ibb.co/1RFfssk/artem-beliaikin-GLg0z5z8-EQU-unsplash.jpg" className="w-full h-full" />
                    <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-4 md:space-y-12 pl-6 md:pl-12 flex flex-col justify-between'>
                            <h2 className='text-3xl md:text-4xl font-bold'>Create Your Own Shop</h2>
                            <div>
                                <p className="font-semibold">With our fabric, you can create amazing suits, <br /> which would emphasize your style.</p>
                                <p className="text-xl font-semibold pt-3">from $29.00</p>
                            </div>
                            <button className="btn w-1/2 border-0 rounded-none bg-gradient-to-r from-purple-500 to-pink-500 text-white items-center">
                                Create shop<FaChevronRight className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 h-[340px] relative mt-4 lg:mt-0">
                    <img src="https://i.ibb.co/tQ2Hhvq/waldemar-Gbve-IG8-YKMk-unsplash.jpg" className="w-full h-full" />
                    <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-4 md:space-y-12 pl-6 md:pl-12 flex flex-col justify-between'>
                            <h2 className='text-3xl md:text-4xl font-bold'>Wide Range Of Products</h2>
                            <div>
                                <p className="font-semibold">In our store, you would find all the kinds of <br /> textile and fabric in the best quality.</p>
                                <p className="text-xl font-semibold pt-3">from $29.00</p>
                            </div>
                            <button className="btn w-1/2 border-0 rounded-none bg-gradient-to-r from-purple-500 to-pink-500 text-white items-center">
                                Shop category<FaChevronRight className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full justify-center">
                <img className="h-[360px] w-full" src="https://i.ibb.co/N217Tsm/daryl-han-BRx-JXTUlh7-M-unsplash.jpg" alt="" />
                <img className="h-[360px] w-full" src="https://i.ibb.co/syn2CGp/daryl-han-D4-Ici-Od-MDf-Y-unsplash-1.jpg" alt="" />
                <img className="h-[360px] w-full" src="https://i.ibb.co/3pK3dQT/daryl-han-se2-Wf-R2z-HBk-unsplash.jpg" alt="" />
                <img className="h-[360px] w-full" src="https://i.ibb.co/HGCRT5h/markus-winkler-PQm-XUxmf-R44-unsplash.jpg" alt="" />
            </div>

        </div>
    );
};

export default Showcase;