import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })


    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin from now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to delete this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });

    }

    return (
        <div className="bg-slate-100 min-h-screen overflow-hidden pt-16">

            <div className="rounded-lg bg-white m-16 p-8 ">
                <div className="flex items-center mb-2 py-2">
                    <h3 className="text-xl w-1/2 font-bold">All Users :  </h3>
                    <h3 className="text-xl w-1/2 font-bold">Total User : {users.length} </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-orange-300">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roll</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="font-semibold">{user.name}</div>
                                    </td>
                                    <td>
                                        <div>{user.email}</div>
                                    </td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'Admin'
                                                : <button onClick={() => handleMakeAdmin(user)} className="btn-sm bg-orange-300 rounded-md hover:bg-orange-500 text-red-500 hover:text-white font-bold">
                                                    <FaUser></FaUser>
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn-sm text-red-500 font-bold">
                                            <FaTrash></FaTrash>
                                        </button>

                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;