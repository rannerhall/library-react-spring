import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/categories" className="nav-item nav-link">Categories</NavLink>
                <NavLink to="/libraryItems" className="nav-item nav-link">Library Items</NavLink>
                <NavLink to="/employees" className="nav-item nav-link">Employees</NavLink>
            </div>
        </nav>
    );
}

export { Nav };