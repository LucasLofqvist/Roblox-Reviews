import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="buttons">
            <ul className="nav-ul">
                <li className="nav-li"><Link to="/"> Home </Link></li>
                <li className="nav-li"><Link to="/gameList">Games </Link></li>

                <li className="about"><Link to="/about">About us </Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;