import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const imgUploadKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY
const imgUploadAPI = `https://api.imgbb.com/1/upload?key=${imgUploadKey}`

const CreateShop = () => {
    const { register, handleSubmit, reset } = useForm()
    const { user } = UseAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imgUploadAPI, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        if (res.data.success) {
            const newShop = {
                shopName: data.name,
                ownerName: user.displayName,
                ownerEmail: user.email,
                shopLocation: data.shopLocation,
                shopInfo: data.shopInfo,
                shopLogo: res.data.data.display_url,
                limit: 3
            }
            const shopResponse = await axiosPublic.post('/shops', newShop)
            console.log(shopResponse.data)
            if (shopResponse.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your shop has been created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
                navigate(`/dashboard/productManagement/${user.email}`)
            }
        }
    }

    return (
        <div className="p-16">
            <div className="bg-slate-100 w-3/4 mx-auto h-full p-16">
                <h2 className="text-4xl text-center font-bold text-purple-600 underline">Creat Your One Shop</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
                    <div className="form-control">
                        <label className="label">
                            <span className="block text-sm font-medium leading-6 text-gray-900">Shop Name*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="Shop Name"
                            className="input input-bordered" required />
                    </div>

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="block text-sm font-medium leading-6 text-gray-900">Owner Name</span>
                            </label>
                            <input
                                disabled
                                defaultValue={user.displayName}
                                {...register("ownerName")}
                                type="text"
                                placeholder="Owner Name"
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="block text-sm font-medium leading-6 text-gray-900">Owner Email</span>
                            </label>
                            <input
                                disabled
                                defaultValue={user.email}
                                {...register("ownerEmail")}
                                type="email"
                                placeholder="Owner Email"
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="col-span-full form-control">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Shop Location</label>
                        <div className="mt-2">
                            <textarea
                                {...register("shopLocation")}
                                placeholder="Shop Location"
                                rows="3"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-4" />
                        </div>
                    </div>
                    <div className="col-span-full form-control">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Shop Info</label>
                        <div className="mt-2">
                            <textarea
                                {...register("recipe")}
                                placeholder="Shop Info"
                                rows="9"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-4" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Shop Logo</label>
                        <input
                            {...register("image")}
                            type="file"
                            className="file-input bg-slate-100 file-input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control">
                        <button
                            type="submit"
                            className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white  px-6 py-4 mt-4 rounded-none">
                            <MdOutlineCreateNewFolder />Create Shop
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateShop;