import { NavLink, Outlet } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import Logo from "../../components/Logo";
import { FaCalendar, FaHome, FaList, FaPen, FaShoppingCart } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";

const Dashboard = () => {
    const { user } = UseAuth()
    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white w-full h-screen pt-2 pb-4 px-3 flex">
                <div className="w-[250px] px-3">
                    <div className="h-14">
                        <Logo></Logo>
                    </div>
                    <div className="pt-3 pb-4 border-b-gray-100 border-b">
                        <div className="py-6 px-3 mr-16 flex justify-center items-center font-semibold border rounded-2xl shadow-md">
                            <FaPen className="mr-2"></FaPen> Add Product
                        </div>
                    </div>


                    <div className=" max-h-[calc(100vh-170px)] px-1 overflow-y-scroll">
                        <ul className="menu text-md font-semibold">
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/userHome'>
                                    <FaHome className='mr-3'></FaHome>
                                    User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/userHome'>
                                    <FaCalendar className='mr-3'></FaCalendar>
                                    Reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/cart'>
                                    <FaShoppingCart className='mr-3'></FaShoppingCart>
                                    My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/review'>
                                    <MdFormatListBulletedAdd className='mr-3' />
                                    Add a review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/paymentHistory'>
                                    <FaList className='mr-3'></FaList>
                                    Payment History
                                </NavLink>
                            </li>

                            <div className="divider"></div>

                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/userHome'>
                                    <FaHome className='mr-3'></FaHome>
                                    User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/userHome'>
                                    <FaCalendar className='mr-3'></FaCalendar>
                                    Reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/cart'>
                                    <FaShoppingCart className='mr-3'></FaShoppingCart>
                                    My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/review'>
                                    <MdFormatListBulletedAdd className='mr-3' />
                                    Add a review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/paymentHistory'>
                                    <FaList className='mr-3'></FaList>
                                    Payment History
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-14 w-full flex items-center justify-between">
                        <form className="w-1/3">
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round-full" strokeLinejoin="round-full" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block bg-slate-100 w-full py-4 px-6 ps-12 text-sm text-gray-900 border border-gray-300 rounded-full  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search product...." required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center">
                            <div className="hidden md:flex items-center gap-4 ml-auto">
                                <p className="font-semibold">{user?.displayName}</p>
                                <img className="w-12 h-12 rounded-full z-10" src={user?.photoURL} alt="" />
                                <button className="h-12 bg-purple-500 hover:bg-purple-600 text-white font-bold pl-8 pr-6 rounded-r-full -ml-9 z-5">Sign Out</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-200 rounded-xl mt-2 h-[calc(100vh-85px)] p-3">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;