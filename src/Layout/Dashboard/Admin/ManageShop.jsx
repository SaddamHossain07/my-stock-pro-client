import { Helmet } from "react-helmet";
import DashboardTitle from "../../../components/DashboardTitle/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { MdNotificationsActive } from "react-icons/md";

const ManageShop = () => {
    const axiosSecure = useAxiosSecure()

    const { data: shops = [] } = useQuery({
        queryKey: ['shops'],
        queryFn: async () => {
            const res = await axiosSecure.get('/shops')
            return res.data
        }
    })

    return (
        <>
            <Helmet>
                <title>myStock Pro | Manage Shop</title>
            </Helmet>
            <div>
                <DashboardTitle role={'Admin'} subPage={'Manage Shop'}></DashboardTitle>
                <div className="w-full bg-white p-3 mt-3 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Total Shop : {shops.length}</h3>
                    <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  p-4 rounded-none"><MdNotificationsActive />Send Notification</button>
                </div>
                <div className="overflow-x-auto overflow-y-auto mt-4">
                    <table className="table bg-white rounded-none">
                        {/* head */}
                        <thead className="bg-slate-50">
                            <tr>
                                <th>#</th>
                                <th>Shop Logo</th>
                                <th>Shop Name</th>
                                <th>Product Limit</th>
                                <th>Location</th>
                                <th>Send Notice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shops?.map((shop, index) => <tr key={shop._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-24 h-24">
                                                    <img src={shop.shopLogo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{shop.shopName}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold text-center">{shop.limit}</div>
                                    </td>
                                    <td>{shop.shopLocation}</td>

                                    <td>
                                        <button className="btn text-purple-600 w-[140px] flex items-center bg-slate-100">
                                            <MdNotificationsActive />Notification
                                        </button>

                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageShop;