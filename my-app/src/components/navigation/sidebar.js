import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';


const Sidebar = () => {
    return (
        <aside>
            <div className="top">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>

            <div className="sidebar">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <h3>Dashboard</h3>
                </NavLink>
                <NavLink to="/room" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">bed</span>
                    <h3>Room</h3>
                </NavLink>
                <NavLink to="/booking" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">date_range</span>
                    <h3>Booking</h3>
                </NavLink>
                <NavLink to="/guest" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">person</span>
                    <h3>Guest</h3>
                </NavLink>
                <NavLink to="/facilities" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">exercise</span>
                    <h3>Facilities</h3>
                </NavLink>
                <NavLink to="/billing" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">receipt_long</span>
                    <h3>Billing</h3>
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">finance</span>
                    <h3>Report</h3>
                </NavLink>
                <NavLink to="/employee" className={({ isActive }) => isActive ? 'active' : ''}>
                    <span className="material-symbols-outlined">badge</span>
                    <h3>Employees</h3>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
