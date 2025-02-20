import React from "react";
import "./navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navLinks = [
    { path: "/course", label: "Courses" },
    { path: "/letucre", label: "Schedule Lectures" },
    { path: "/instructor", label: "Instructor" }
  ];
const navigate =useNavigate()
  const Login=()=>{
    navigate("/login")
  }
  return (
    <header>
      <nav className="navbar">
      
        <div className="nav-logo">
          <img
            src="https://kdigitalcurry.com/assets/images/logo/KDC_logo.png"
            alt="KDC Logo"
          />
          <div className="user-name">
            <p>Hello, Lokesh</p>
          </div>
        </div>

       
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path} className={({ isActive }) => (isActive ? "active" : "")}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

      
        <div className="nav-login">
          <p className="login-btn" onClick={Login}>
            Login <FaRegUserCircle />
          </p>
        </div>
      </nav>
    </header>
  );
};
