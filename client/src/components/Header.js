import React,{ useState, useEffect } from 'react';
import PSicon from '../img/pfIcon.png'
import { Link } from "react-router-dom"
import Search from './Search'
import FetchRouter from './FetchRouter';

const Header = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [games, setGames] = useState([]);

const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
        const data = await FetchRouter(`api/games/${encodeURIComponent(searchTerm)}`);
        if (data && typeof data === 'object' && !Array.isArray(data)) {
            setGames([data]);  // Wrap the single game object in an array
        } else {
            setGames(data);  // Assuming the API normally returns an array
            setError('No results found')
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <header>
            <Link to="/" className="homepage"> 
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