import React from 'react';
import PSicon from '../img/pfIcon.png'
import { Link, useNavigate } from "react-router-dom"
import Search from './Search'

const Header = () => {
    const navigate = useNavigate();

    const handleSearch = async (searchTerm) => {
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }

    return (
        <header>
            <Link to="/home" className="homepage"> 
                <img src={PSicon} alt="PlaySafe Icon" id="psicon" height="85px" width="85px" />
            </Link>
            <Search onSearch={handleSearch} /> 
            <div id="login">
                <Link to="/login"> <button> Login</button> </Link>
                <Link to="/signUp"> <button> Sign up</button> </Link>
            </div>
        </header>
    );
}

export default Header;