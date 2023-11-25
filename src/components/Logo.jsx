import { Link } from 'react-router-dom';
import logo from '../assets/myStockLogo.png'

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center'>
                <img className='h-12' src={logo} alt="" />
                <h3 className='text-3xl font-bold heading'>myStock</h3>
            </div>
        </Link>
    );
};

export default Logo;