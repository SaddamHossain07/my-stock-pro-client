import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import DashboardTitle from "../../components/DashboardTitle/DashboardTitle";
import SalesCard from "../../components/SalesCard/SalesCard";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

const ManageSales = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()
    console.log(user?.email)
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${user.email}`)
            return res.data
        }
    })
    // console.log(products)

    return (
        <div>
            <DashboardTitle role={'Manager'} subPage={'Sales Management'}></DashboardTitle>
            <div className="w-full bg-white p-3 mt-3 flex justify-between items-center">
                <h3 className="text-xl font-bold">Total Product : {products.length}</h3>

                <form className="w-1/4">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round-full" strokeLinejoin="round-full" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block bg-slate-100 w-full py-2 px-6 ps-12 text-sm text-gray-900 border border-gray-300 rounded-full  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search product...." required />
                        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                    </div>
                </form>
                <Link to='/dashboard/checkout'>
                    <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  p-4 rounded-none"><MdOutlineShoppingCartCheckout />Proceed to Check-out</button>
                </Link>
            </div>
            <div className="overflow-x-auto overflow-y-auto mt-4">
                <table className="table rounded-none bg-white">
                    {/* head */}
                    <thead className="bg-slate-50">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Saling Price</th>
                            <th>Add for Check-out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((item, index) => <SalesCard
                                key={item._id}
                                index={index}
                                item={item}
                            ></SalesCard>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSales;