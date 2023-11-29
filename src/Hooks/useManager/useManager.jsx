import { useQuery } from "@tanstack/react-query";
import UseAuth from "../UseAuth/UseAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { useState } from "react";

const useManager = () => {
    const { user, loading } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const [isManager, setIsManager] = useState(false)
    const [hasShop, setHasShop] = useState(false)
    const [role, setRole] = useState('anonymous')

    const { data, isPending: isAdminLoading } = useQuery({
        queryKey: ['loggedInUser'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            if (res.data?.role === 'manager') {
                setIsManager(true)
            }
            if (res.data?.shopId) {
                setHasShop(true)
            }
            setRole(res.data?.role)
        }
    })
    return { isManager, hasShop, role, data, isAdminLoading }

};

export default useManager;