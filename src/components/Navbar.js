import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router'
const Navbar = (props) => {
    // Google Analytics setup
    let location = useLocation();
    const handleLogout = () => {
        props.logout();
    }
    const isLoggedIn = localStorage.getItem('authToken') ? true : false;
    const showLogout = isLoggedIn && (location.pathname === '/' || location.pathname === '/about');
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNote</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/">Home</Link>
                                
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                        {!showLogout ? (
                            <>
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                            </>
                        ) : (
                            <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
                        )}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
