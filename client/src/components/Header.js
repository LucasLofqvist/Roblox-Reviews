import React from 'react';
import PSicon from '../img/pfIcon.png'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import Search from './Search'

const Header = () => {
    const navigate = useNavigate();
    const {isLoggedIn,isAdmin = false, logout} = useAuth()

    const handleSearch = async (searchTerm) => {
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }

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
                    <Link to="/login"> <button className='loginButton'> Login</button> </Link>
                    <Link to="/signUp"> <button className='signInButton'> Sign up</button> </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;