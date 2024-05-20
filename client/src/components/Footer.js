// work in progress
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <hr />
            <div className="footer-content">
                <div>
                    <p className="footer-name"> © 2024 PlaySafe on Roblox, Inc. </p>
                </div>
                <div className="footer-icons">
                <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><span className="fa-brands fa-facebook"></span></Link>
                <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><span className="fa-brands fa-x-twitter"></span></Link>
                <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><span className="fa-brands fa-linkedin"></span></Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;