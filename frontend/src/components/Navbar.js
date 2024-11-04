import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    {/* <Link to="/signup">Signup</Link>
    <Link to="/login">Login</Link> */}
  </nav>
);

export default Navbar;
