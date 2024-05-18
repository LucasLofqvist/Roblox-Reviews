import React from 'react';
import PSicon from '../img/pfIcon.png'
import { useNavigate } from "react-router-dom"
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
        <header className="header">
                <img className='homepage psicon' src={PSicon} alt="PlaySafe Icon" height="85px" width="85px" />

            <Search onSearch={handleSearch} /> 
            <div className="login">
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