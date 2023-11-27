import { useForm } from "react-hook-form";
import { FaEdit, FaPen, FaTrash } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardTitle from "../../components/DashboardTitle/DashboardTitle";
const imgUploadKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY
const imgUploadAPI = `https://api.imgbb.com/1/upload?key=${imgUploadKey}`

const ProductManagement = () => {
    const shop = useLoaderData()
    const [haveProduct, setHaveProduct] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/owner/${shop._id}`)
            return res.data
        }
    })

    useEffect(() => {
        if (products.length > 0) {
            setHaveProduct(true)
        }
    }, [products])

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imgUploadAPI, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log(res.data)
        if (res.data.success) {
            // now send the data to the server 
            const buyingPrice = parseFloat(data.buyingPrice)
            const profitMargin = parseFloat(data.profitMargin)
            const tax = (buyingPrice * 7.5) / 100
            const profit = (buyingPrice * profitMargin) / 100

            const newProduct = {
                name: data.name,
                quantity: parseInt(data.quantity),
                buyingPrice: buyingPrice,
                profitMargin: profitMargin,
                discount: parseFloat(data.discount),
                location: data.location,
                description: data.description,
                image: res.data.data.display_url,
                shopId: shop._id,
                shopName: shop.shopName,
                ownerEmail: shop.ownerEmail,
                sellingPrice: buyingPrice + tax + profit,
                productAddedDate: new Date(),
                saleCount: 0
            }
            const productResponse = await axiosPublic.post('/products', newProduct)
            if (productResponse.data.message) {
                toast("Opps...!!! The product limit already exit!");
                navigate('/dashboard/subscription')
            }
            if (productResponse.data.insertedId) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Menu Item added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                // reset()
            }
        }
    }

    const handleDelete = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/products/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${item.name} has been deleted.`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });

    }

    return (

        < div >
            {
                haveProduct ? <>
                    <DashboardTitle role={'Manager'} subPage={'Product Management'}></DashboardTitle>
                    <div className="w-full bg-white p-3 mt-3 flex justify-between items-center">
                        <h3 className="text-2xl font-bold">Total Product : {products.length}</h3>
                        <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  p-4 rounded-none" onClick={() => document.getElementById('my_modal_3').showModal()}><FaPen></FaPen>Add Product</button>
                    </div>
                    <div className="overflow-x-auto overflow-y-auto mt-4">
                        <table className="table bg-white">
                            {/* head */}
                            <thead className="bg-slate-50">
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Sales</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((item, index) => <tr key={item._id}>
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
                                        <td>{item.quantity}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <Link to={`/dashboard/updateProduct/${item._id}`} >
                                                <button className="btn-sm text-red-500 font-bold">
                                                    <FaEdit></FaEdit>
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(item)} className="btn-sm text-red-500 font-bold">
                                                <FaTrash></FaTrash>
                                            </button>

                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </>
                    : <>
                        <div className="mt-24 flex items-center justify-center">
                            <div className="bg-white w-1/2 border border-gray-200 flex flex-col items-center justify-center px-4 py-8 rounded-lg shadow-2xl">
                                <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider heading">New Here?</p>
                                <p className="text-md md:text-lg lg:text-xl font-bold tracking-wider text-gray-500 mt-4 text-center">You have not added any product yet!</p>
                                <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white mt-6 p-4 rounded-none" onClick={() => document.getElementById('my_modal_3').showModal()}><FaPen></FaPen>Add Product</button>
                            </div>
                        </div>
                    </>
            }

            {/* add product form  */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                        <div className="form-control">
                            <label className="label">
                                <span className="block text-sm font-medium leading-6 text-gray-900">Product Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Product Name"
                                className="input input-sm input-bordered" required />
                        </div>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="block text-sm font-medium leading-6 text-gray-900">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("quantity")}
                                    placeholder="Quantity"
                                    className="input input-sm input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="block text-sm font-medium leading-6 text-gray-900">Buying Price ($)</span>
                                </label>
                                <input
                                    {...register("buyingPrice")}
                                    type="number"
                                    placeholder="buying Price ($)"
                                    className="input input-sm input-bordered w-full" />
                            </div>
                        </div>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="block text-sm font-medium leading-6 text-gray-900">Profit Margin (%)</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("profitMargin")}
                                    placeholder="Profit Margin (%)"
                                    className="input input-sm input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="block text-sm font-medium leading-6 text-gray-900">discount (%)</span>
                                </label>
                                <input
                                    {...register("discount")}
                                    type="number"
                                    placeholder="discount (%)"
                                    className="input input-sm input-bordered w-full" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="block text-sm font-medium leading-6 text-gray-900">Location</span>
                            </label>
                            <input
                                type="text"
                                {...register("location")}
                                placeholder="Location"
                                className="input input-sm input-bordered" required />
                        </div>
                        <div className="col-span-full form-control">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2">
                                <textarea
                                    {...register("description")}
                                    placeholder="Description"
                                    rows="3"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6 p-4 mb-2" />
                            </div>
                        </div>

                        <div className="form-control">
                            <input
                                {...register("image")}
                                type="file"
                                className="file-input bg-slate-100 file-input-bordered max-w-xs" />
                        </div>

                        <div className="form-control">
                            <button
                                type="submit"
                                className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  p-2 rounded-none mt-4">
                                <FaPen />Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div >
    );
};

export default ProductManagement;