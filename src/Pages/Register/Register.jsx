import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import UseAuth from "../../Hooks/UseAuth/UseAuth";

const Register = () => {

    const { createUser } = UseAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log('user created', result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Helmet>
                <title>myStock Pro | Register</title>
            </Helmet>
            <div className="hero min-h-screen pt-24">
                <div className="hero-content flex flex-col gap-6 md:gap-0 md:flex-row">
                    <div className="w-[400px] lg:w-[500px] h-[696px] shadow-2xl rounded-lg md:rounded-l-lg md:rounded-r-none overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://i.ibb.co/N217Tsm/daryl-han-BRx-JXTUlh7-M-unsplash.jpg" alt="" />
                    </div>
                    <div className="rounded-lg md:rounded-r-lg md:rounded-l-none w-full max-w-sm shadow-2xl bg-gradient-to-r from-slate-200 to-[#e3b99c] p-8">

                        <h3 className="text-3xl font-bold text-purple-900 text-center mb-4">Register Now</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} name='name' placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" {...register("photo")} name='photo' placeholder="photo url" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-xs text-red-700 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/ })} name='password' placeholder="password" className="input input-bordered" />
                                {errors.password && <span className='text-xs text-red-700 mt-2'>The password must be 6 characters, with at least a symbol, upper and lower case letters and a number</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold border-0" type="submit" value="Register" />
                            </div>
                        </form>
                        <div>
                            <p className="mt-4">New to myStock Pro? <Link to='/login' className="border-b-2 border-violet-800 text-violet-800">Login here</Link></p>
                            <div className="divider py-6">OR</div>
                            <button className="border-2 border-purple-600 bg-slate-100 rounded-lg py-3 px-4 mt-4 flex gap-4 justify-center font-semibold w-full">
                                <span><img className="h-6" src="https://i.ibb.co/1RHYhnL/download.png" alt="" /></span>
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Register;