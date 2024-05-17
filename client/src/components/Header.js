import React from 'react';
import PSicon from '../img/pfIcon.png'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import Search from './Search'

const Header = () => {
    const navigate = useNavigate();
    const {isLoggedIn,isAdmin = false, logout} = useAuth()

    const handleSearch = async (searchTerm) => {
        navigate(`/gameList/?search=${encodeURIComponent(searchTerm)}`);
    }

    const handlePreSignupRouteStorageAndNavigate = (path) => {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
            sessionStorage.setItem('preLoginRoute', currentPath);
        }
        navigate(path);
    };
    

    return (
        <header>
            <Link to="/" className="homepage"> 
                <img src={PSicon} alt="PlaySafe Icon" id="psicon" height="85px" width="85px" />
            </Link>
            <Search onSearch={handleSearch} /> 
            <div id="login">
                {isLoggedIn || isAdmin ? (
                    <button className='loggedIn' onClick={logout}>Logout</button>
                ) : (
                    <>
                    <button className='loginButton' onClick={() => handlePreSignupRouteStorageAndNavigate('/login')}>Login</button>
                    <button className='signInButton' onClick={() => handlePreSignupRouteStorageAndNavigate('/signup')}>Sign up</button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;