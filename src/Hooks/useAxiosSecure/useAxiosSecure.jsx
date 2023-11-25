import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth/useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()


    // interceptors for requests =======================
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('accessToken')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // interceptors for response =======================
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;