import { NavLink } from 'react-router-dom';
import logo from '../../assets/myStockLogo.png'
import { MdOndemandVideo } from "react-icons/md";

const Navbar = () => {
    const navItems = <>
        <li>
            <NavLink to="/" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
            }>Home
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
        <li>
            <NavLink to="/createStore" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-purple-700 font-semibold" : ""
            }>Create-Store
            </NavLink>
        </li>
    </>

    const handleWatchDemo = () => {
        const videoUrl = "https://www.youtube.com/embed/PohSjXM5AW0?si=y64bmm4eg3oIEbLE?autoplay=1"

        window.open(videoUrl, "_blank", "width=800", "height=600")
    }

    return (
        <div className="navbar bg-base-100 shadow-md max-w-7xl mx-auto py-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <div className='flex items-center'>
                    <img className='h-12' src={logo} alt="" />
                    <h3 className='text-3xl font-bold italic heading'>myStock Pro</h3>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <button onClick={handleWatchDemo} className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <MdOndemandVideo />
                    Watch Demo
                </button>
            </div>
        </div>
    );
};

export default Navbar;