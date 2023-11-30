import { useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import useManager from "../../Hooks/useManager/useManager";

const UserInfo = () => {
    const { user, logOut } = UseAuth()
    const navigate = useNavigate()
    const { role } = useManager()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    return (

        <div className="hidden md:flex items-center gap-4 ml-auto">
            <div className="hidden lg:flex flex-col items-end">
                <p className="font-semibold text-gray-500">{user?.displayName}</p>
                {
                    role && <p className="text-xs ">({role})</p>
                }
            </div>
            <img className="w-12 h-12 rounded-full z-10 border" src={user?.photoURL} alt="" />
            <button onClick={handleLogOut} className="h-12 shadow-md bg-slate-100 hover:bg-slate-200 text-purple-600 font-bold pl-8 pr-6 rounded-r-full -ml-9 z-5">Sign Out</button>
        </div>

    );
};

export default UserInfo;