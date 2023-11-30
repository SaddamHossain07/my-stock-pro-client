import { Helmet } from "react-helmet";
import DashboardTitle from "../../../components/DashboardTitle/DashboardTitle";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { MdMarkEmailRead } from "react-icons/md";

const Users = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    return (
        <>
            <Helmet>
                <title>myStock Pro | Manage Shop</title>
            </Helmet>
            <div>
                <DashboardTitle role={'Admin'} subPage={'All Users'}></DashboardTitle>
                <div className="w-full bg-white p-3 mt-3 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Total Shop : </h3>
                    <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  p-4 rounded-none"><FaUsers />All Users</button>
                </div>
                <div className="overflow-x-auto overflow-y-auto mt-4">
                    <table className="table bg-white rounded-none">
                        {/* head */}
                        <thead className="bg-slate-50">
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Shop Name</th>
                                <th>Role</th>
                                <th>Send Notice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <tr key={user._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="font-semibold">{user.name}</div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {
                                            user.shopName && <p>{user.shopName}</p>
                                        }
                                    </td>
                                    <td>
                                        {
                                            user.role && <p>{user.role}</p>
                                        }
                                    </td>

                                    <td>
                                        {
                                            !user.shopName || !user.role ? <button className="btn text-purple-600 w-[140px] flex items-center bg-slate-100">
                                                <MdMarkEmailRead />Notification
                                            </button> : <></>
                                        }

                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    <div className="w-full flex justify-center">
                        <div className="join my-4 text-center">
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="1" checked />
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="2" />
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="3" />
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="4" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;