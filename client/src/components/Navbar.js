import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="buttons">
            <ul>
                <li><Link to="/home"> Home </Link></li>
                <li><Link to="/gameList">Games </Link></li>
                <li><Link to="/">xx </Link></li>
                <li><Link to="/">xx </Link></li>
                <li className="about"><Link to="/">About us </Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;