import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import DashboardTitle from "../../components/DashboardTitle/DashboardTitle";

const imgUploadKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY
const imgUploadAPI = `https://api.imgbb.com/1/upload?key=${imgUploadKey}`

const UpdateProduct = () => {
    const item = useLoaderData()
    console.log(item)
    const { _id, name, quantity, buyingPrice, profitMargin, discount, location, description, image } = useLoaderData()
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user } = UseAuth()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imgUploadAPI, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const newProduct = {
                name: data.name,
                quantity: parseInt(data.quantity),
                buyingPrice: parseFloat(data.buyingPrice),
                profitMargin: parseFloat(data.profitMargin),
                discount: parseFloat(data.discount),
                location: data.location,
                description: data.description,
                image: res.data.data.display_url
            }
            const productResponse = await axiosPublic.patch(`/products/${_id}`, newProduct)
            if (productResponse.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
                navigate(`/dashboard/productManagement/${user.email}`)
            }
        }
    }
    return (
        <>
            <DashboardTitle role={'Manager'} subPage={'Update Product'}></DashboardTitle>
            <div className="w-3/4 mx-auto bg-white p-6 mt-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                    <div className="form-control">
                        <label className="label">
                            <span className="block text-sm font-medium leading-6 text-gray-900">Product Name</span>
                        </label>
                        <input
                            defaultValue={name}
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
                                defaultValue={quantity}
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
                                defaultValue={buyingPrice}
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
                                defaultValue={profitMargin}
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
                                defaultValue={discount}
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
                            defaultValue={location}
                            type="text"
                            {...register("location")}
                            placeholder="Location"
                            className="input input-sm input-bordered mb-2" required />
                    </div>
                    <div className="col-span-full form-control">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                            <textarea
                                defaultValue={description}
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
                            className="file-input bg-slate-100 file-input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control">
                        <button
                            type="submit"
                            className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  p-2 rounded-none mt-4">
                            <FaEdit />Update Product
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default UpdateProduct;