import { MdOndemandVideo } from "react-icons/md";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import UserInfo from "../UserInfo/UserInfo";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useManager from "../../Hooks/useManager/useManager";

const Navbar = () => {
    const { user } = UseAuth()
    const [isAdmin] = useAdmin()
    const { isManager, hasShop, role } = useManager()
    const navItems = <>
        <li>
            <NavLink to="/" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
            }>Home
            </NavLink>
        </li>
        {
            user ? <>
                {
                    !isManager && !isAdmin && <li>
                        <NavLink to="/createShop" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
                        }>Create-Shop
                        </NavLink>
                    </li>
                }
                {
                    isAdmin && <li>
                        <NavLink to={`/dashboard/users`} className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
                        }>Dashboard
                        </NavLink>
                    </li>
                }
                {
                    !isAdmin && <li>
                        <NavLink to={`/dashboard/productManagement/${user.email}`} className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
                        }>Dashboard
                        </NavLink>
                    </li>
                }
            </> :
                <>
                    <li>
                        <NavLink to="/createShop" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
                        }>Create-Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
                        }>Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
                        }>Register
                        </NavLink>
                    </li>
                </>
        }

    </>

    const handleWatchDemo = () => {
        const videoUrl = "https://www.youtube.com/embed/PohSjXM5AW0?si=y64bmm4eg3oIEbLE?autoplay=1"

        window.open(videoUrl, "_blank", "width=800", "height=600")
    }

    return (
        <div className="navbar bg-base-100 fixed z-10 max-w-7xl mx-auto py-4 shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Logo></Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <button onClick={handleWatchDemo} className="btn rounded-none bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <MdOndemandVideo />
                    Watch Demo
                </button>
                {
                    user && <UserInfo></UserInfo>
                }
            </div>
        </div>
    );
};

export default Navbar;