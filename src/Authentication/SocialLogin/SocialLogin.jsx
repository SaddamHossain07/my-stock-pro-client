import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const { googleLogin } = UseAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'




    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photo: result.user.photoUrl
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User updated successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate(from, { replace: true })
                        }
                    })
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <button onClick={handleGoogleLogin} className="border-2 border-purple-600 bg-slate-100 rounded-lg py-3 px-4 mt-4 flex gap-4 justify-center font-semibold w-full">
            <span><img className="h-6" src="https://i.ibb.co/1RHYhnL/download.png" alt="" /></span>
            Continue with Google
        </button>
    );
};

export default SocialLogin;