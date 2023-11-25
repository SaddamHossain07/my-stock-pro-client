import { MdOndemandVideo } from "react-icons/md";
import { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider/AuthProvider';
import Logo from "../Logo";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navItems = <>
        <li>
            <NavLink to="/" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
            }>Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/createStore" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
            }>Create-Store
            </NavLink>
        </li>
        {
            user ? <>
                <li>
                    <NavLink to="/dashboard" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
                    }>Dashboard
                    </NavLink>
                </li>
            </> : <>
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
        <div className="navbar bg-base-100 fixed z-10 max-w-7xl mx-auto py-4">
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
                    user && <>
                        <div className="hidden md:flex items-center gap-4 ml-auto">
                            <p className="font-semibold">{user?.displayName}</p>
                            <img className="w-12 h-12 rounded-full z-10" src={user?.photoURL} alt="" />
                            <button onClick={handleLogOut} className="h-12 bg-purple-500 hover:bg-purple-600 text-white font-bold pl-8 pr-6 rounded-r-full -ml-9 z-5">Sign Out</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;