import React from 'react';
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-lg font-bold">LOGO</Link>
            <nav>
                <Link to="/" className="px-4">Home</Link>
                <Link to="/games" className="px-4">Games</Link>
                <Link to="/about" className="px-4">About Us</Link>
                {isLoggedIn ? (
                    <Link to="/profile" className="px-4">Profile</Link>
                ) : (
                    <Link to="/login" className="px-4">Login</Link>
                )}
            </nav>
        </header>
    );
};


export default Header;
