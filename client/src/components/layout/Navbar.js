import React, { useContext } from 'react'
import AuthContext from './../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { user, isAuth, logout } = authContext;
    const logouth = () => {
        logout()
    }
    const auth = (
        <div className="navbar bg-dark navbar-dark">
            <div className='container'>
                <div className="navbar-brand mr-auto">
                    <i class="fas fa-list-ul"></i> ToDo List
                </div>
                <ul className='navbar-nav text-center'>
                    <li className='nav-item'>

                        <a className='nav-link text-white' onClick={logouth} href="#!">{user && user.name}np <i className="fas fa-sign-out-alt"></i><span className='hidden-sm-down'></span> Sign Out</a>
                    </li>
                </ul>
            </div>
        </div>

    )
    const guest = (
        <div className="navbar bg-dark navbar-dark">
            <div className='container'>
                <div className="navbar-brand">
                    <i class="fas fa-list-ul"></i>  ToDo List
                </div>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-link'>
                            Login
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='register' className='nav-link'>
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

    )
    return isAuth ? auth : guest


}

export default Navbar
