import React from 'react'
import { Link } from 'react-scroll';
import logo from "../images/T-HOUSE.png";
import Cookies from 'universal-cookie';

let cookies = new Cookies();

const NavBar = () => {
    const logout = () => {
        cookies.remove("token");
        cookies.remove("uId");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("password");
        cookies.remove("phoneNumber");
        cookies.remove("avatarURL");
        window.location.reload();
      };

    
    return (
        <div className="nav active">
            <Link to="main" className="logo" smooth={true} duration={2000}>
                <img src={logo} alt="logo"/>
            </Link>
            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="nav-icon"></span>
            </label>
            <ul className="menu">
                <li><Link to="main" smooth={true} duration={2000}>Header</Link></li>
                <li><Link to="products" smooth={true} duration={2000}>Products</Link></li>
                <li><Link to="about" smooth={true} duration={2000}>About</Link></li>
                <li><Link to="contact" smooth={true} duration={2000}>Contact</Link></li>
                <li><Link to="" onClick={logout}>Logout</Link></li>
            </ul>
        </div>
    )
}

export default NavBar;
