import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';  

const Navbar = () => {
    const location = useLocation();
    const savedStories = useAppSelector(state => state.saved.stories); 

    const navItems = [
        { path: "/sports", label: "Sports", icon: "bi-trophy" },
        { path: "/indonesia", label: "Indonesia", icon: "bi-globe" },
        { path: "/programming", label: "Programming", icon: "bi-terminal" },
        { path: "/saved", label: `Saved (${savedStories.length})`, icon: "bi-bookmark" } 
    ];

    return (
        <nav className="bg-white shadow-sm py-2">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    {navItems.map((item) => (
                        <Link 
                            key={item.path}
                            to={item.path} 
                            className={`btn btn-link text-decoration-none d-flex align-items-center 
                                ${location.pathname === item.path 
                                    ? 'text-danger fw-bold' 
                                    : 'text-secondary'
                                } 
                                mx-3 py-2 nav-item-hover`}
                        >
                            <i className={`bi ${item.icon} me-2`}></i>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
