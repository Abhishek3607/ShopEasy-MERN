import { Link } from "react-router-dom";
import "../componentStyles/Navbar.css";
import { Close, PersonAdd, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import { Menu } from "@mui/icons-material";

function Navbar() {
    const[isMenuOpen, setIsMenuOpen]=useState(false);
    const toggleMenu=()=>setIsMenuOpen(!isMenuOpen);
    const isAuthenticated=true;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={()=>setIsMenuOpen(false)}>ShopEasy</Link>
        </div>
        <div className={`navbar-links ${isMenuOpen?'active':''}`}>
          <ul>
            <li>
              <Link to="/" onClick={()=>setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about-us"></Link>About Us
            </li>
            <li>
              <Link to="/contact-us">Contact-Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-icons">
          {/* <div className="search-container">
            <form className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Search products"
              />
              <button className="search-icon">
                <Search focusable="false" />
              </button>
            </form>
          </div> */}

          <div className="cart-container">
            <Link to="/cart">
              <ShoppingCart className="icon" />
              <span className="cart-badge">6</span>
            </Link>
          </div>
          {!isAuthenticated &&<Link to="/register" className="register-link">
            <PersonAdd className="icon" />
          </Link>}
          <div className="navbar-hamburger" onClick={toggleMenu}>
            {isMenuOpen? <Close className="icon"/>:<Menu className="icon"/>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
