import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NavBar from './Navbar';
import '../index1.css';
import '../index2.css';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <NavBar/>
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
