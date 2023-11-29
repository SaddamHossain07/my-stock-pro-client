import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import SocialLogin from "../../Authentication/SocialLogin/SocialLogin";

const Login = () => {
    const { loginUser } = UseAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        loginUser(email, password)
            .then(result => {
                const user = result.user
                console.log('user login', user)
                Swal.fire({
                    title: "User Logged In successfully",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true })

            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid credential!",
                    footer: '<a href="#">Please check your email and password.</a>'
                });
            })
    }

    return (
        <>
            <Helmet>
                <title>myStock Pro | Login</title>
            </Helmet>
            <div className="hero min-h-screen pt-24">
                <div className="hero-content flex flex-col gap-6 md:gap-0 md:flex-row">
                    <div className="w-[400px] lg:w-[500px] h-[528px] shadow-2xl rounded-lg md:rounded-l-lg md:rounded-r-none overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://i.ibb.co/09hLXbH/Screenshot-2023-11-29-091819.png" alt="" />
                    </div>
                    <div className="rounded-lg md:rounded-r-lg md:rounded-l-none w-full max-w-sm shadow-2xl bg-gradient-to-r from-slate-200 to-[#e3b99c] p-8">

                        <h3 className="text-3xl font-bold text-purple-900 text-center mb-4">Login Now</h3>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold border-0" type="submit" value="Login" />
                            </div>
                        </form>
                        <div>
                            <p className="mt-4">New to myStock Pro? <Link to='/register' className="border-b-2 border-violet-800 text-violet-800">Register</Link></p>

                            <div className="divider py-6">OR</div>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;