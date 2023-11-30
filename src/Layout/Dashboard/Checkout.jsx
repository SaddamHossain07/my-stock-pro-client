import { FaPen, FaTrash } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../components/DashboardTitle/DashboardTitle";
import { RiSecurePaymentFill } from "react-icons/ri";
import html2pdf from 'html2pdf.js'
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";


const Checkout = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()
    const { data: carts = [], refetch } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user.email}`)
            return res.data
        }
    })

    // create pdf while Get Paid ====================
    const element = document.getElementById('my-table');
    const opt = {
        margin: 1,
        filename: `${user?.email}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const handleGetPaid = async () => {
        html2pdf().from(element).set(opt).save();

        const totalBuyingPrice = carts.reduce((total, item) => total + item.buyingPrice, 0)
        const totalSellingPrice = carts.reduce((total, item) => total + item.sellingPrice, 0)
        const profit = totalSellingPrice - totalBuyingPrice

        const newSales = {
            shopManager: carts.map(item => item.shopManager),
            totalBuyingPrice: totalBuyingPrice,
            price: totalSellingPrice,
            profit: profit,
            salesDate: new Date(),
            cartIds: carts.map(item => item._id),
            cartProductIds: carts.map(item => item.productId),
            productName: carts.map(item => item.name),
            email: user.email
        }
        const res = await axiosSecure.post('/sales', newSales)
        console.log(res.data)
        if (res.data.salesResult.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Menu Item added successfully",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
    }

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to remove this item from your cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been removed.",
                                icon: "success"
                            });
                            refetch()
                        }
                        refetch()
                    })
            }
        });

    }


    return (
        <>
            <Helmet>
                <title>myStock Pro | Check-out</title>
            </Helmet>
            <div id="my-table" >
                <DashboardTitle role={'Manager'} subPage={'Check-Out'}></DashboardTitle>
                {
                    carts.length ? <>
                        <div className="w-full bg-white p-3 mt-3 flex justify-between items-center">
                            <h3 className="text-2xl font-bold">Total <span className="text-purple-600">{carts.length}</span> Products are ready to check-out</h3>
                            <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  p-4 rounded-none" onClick={handleGetPaid}><RiSecurePaymentFill />Get Paid</button>
                        </div>
                        <div className="overflow-x-auto overflow-y-auto mt-4">
                            <table className="table bg-white rounded-none">
                                {/* head */}
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        carts?.map((item, index) => <tr key={item._id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-24 h-16">
                                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-semibold">{item.name}</div>
                                            </td>
                                            <td>{parseFloat(item.sellingPrice.toFixed(2))}</td>
                                            <td>1</td>
                                            <td>{parseFloat(item.sellingPrice.toFixed(2))}</td>

                                            <td>
                                                <button onClick={() => handleDelete(item._id)} className="btn-sm text-red-500 font-bold">
                                                    <FaTrash></FaTrash>
                                                </button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </> : <>
                        <div className="mt-24 flex items-center justify-center">
                            <div className="bg-white w-1/2 border border-gray-200 flex flex-col items-center justify-center px-4 py-8 rounded-lg shadow-2xl">
                                <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider heading">No product to checkout</p>
                                <p className="text-md md:text-lg lg:text-xl font-bold tracking-wider text-gray-500 mt-4 text-center">Please go back to the sales page!</p>
                                <Link to={'/dashboard/manageSales'}>
                                    <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white mt-6 p-4 rounded-none"><FaArrowLeftLong />Sales Page</button>
                                </Link>
                            </div>
                        </div>
                    </>
                }

            </div>
        </>
    );
};

export default Checkout;