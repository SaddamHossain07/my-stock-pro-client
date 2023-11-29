import { NavLink, Outlet } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import Logo from "../../components/Logo";
import { FaCalendar, FaHome, FaList, FaPen, FaShoppingCart } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import UserInfo from "../../components/UserInfo/UserInfo";
import useAdmin from "../../Hooks/useAdmin/useAdmin";

const Dashboard = () => {
    const { user } = UseAuth()
    const [isAdmin] = useAdmin()

    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white w-full h-screen pt-2 pb-4 px-3 flex">
                <div className="w-[250px] px-3">
                    <div className="h-14">
                        <Logo></Logo>
                    </div>
                    <div className="hidden lg:flex pt-3 pb-4 border-b-gray-100 border-b">
                        <div className="py-6 px-3 mr-16 flex justify-center items-center font-semibold border rounded-2xl shadow-md">
                            <FaPen className="mr-2"></FaPen> Add Product
                        </div>
                    </div>
                    <div className=" max-h-[calc(100vh-170px)] px-1 overflow-y-scroll">
                        <ul className="menu text-md font-semibold">
                            {
                                isAdmin ? <>
                                    <li>
                                        <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/users'>
                                            <FaHome className='mr-3'></FaHome>
                                            All Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/userHome'>
                                            <FaHome className='mr-3'></FaHome>
                                            User Home
                                        </NavLink>
                                    </li>
                                </>
                                    : <>
                                        <li>
                                            <NavLink to={`/dashboard/productManagement/${user?.email}`} className='hover:bg-slate-200 rounded-r-full'>
                                                <FaHome className='mr-3'></FaHome>
                                                Product
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='hover:bg-slate-200 rounded-r-full' to={`/dashboard/manageSales`}>
                                                <FaCalendar className='mr-3'></FaCalendar>
                                                Sales
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/checkout'>
                                                <FaShoppingCart className='mr-3'></FaShoppingCart>
                                                Check-out
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/subscription'>
                                                <MdSubscriptions className='mr-3' />
                                                Subscription
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='hover:bg-slate-200 rounded-r-full' to='/dashboard/salesSummary'>
                                                <FaList className='mr-3'></FaList>
                                                Summary
                                            </NavLink>
                                        </li>
                                    </>
                            }


                            <div className="divider"></div>



                        </ul>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-14 w-full flex items-center justify-between">
                        <form className="w-1/2">
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round-full" strokeLinejoin="round-full" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block bg-slate-100 w-full py-4 px-6 ps-12 text-sm text-gray-900 border border-gray-300 rounded-full  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search product...." required />
                                {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>
                        </form>
                        <UserInfo></UserInfo>
                    </div>

                    <div className="bg-slate-200 rounded-xl mt-2 h-[calc(100vh-85px)] relative overflow-y-scroll shadow-md">
                        <div className="p-3">
                            <Outlet></Outlet>
                        </div>

                        {/* <footer className="footer absolute h-12 items-center px-4 bg-slate-300 bottom-0 left-0 w-full border-t border-gray-300 text-xs flex justify-between">
                            <div>
                                <img className="w-10" src={logo} alt="" />
                            </div>
                            <aside className="items-center">
                                <p>Copyright © 2023 - All right reserved</p>
                            </aside>
                            <nav className="grid-flow-col gap-4 justify-self-end text-purple-600">
                                <a><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                                </a>
                                <a><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                                <a><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                            </nav>
                        </footer> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;