import React from 'react';
import PSicon from '../img/pfIcon.png'

const Header = () => {
    return (
        <header>
            <a href="/" className="homepage">
                <img src={PSicon} alt="PlaySafe Icon" id="psicon" height="85px" width="85px" />
            </a>

            <div className="search-container">
                <input type="text" placeholder="Search.." />
                <i className="fa fa-search"></i>
            </div>

            <div id="login">
                <button> Login</button>
                <button> Sign up</button>
            </div>
        </header>
    );
}

export default Header;