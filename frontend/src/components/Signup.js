import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Signup.css';

function Signup() {
  return (
    <div className="form-container">
      <div className="form">
        <h2>Signup</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Create password" />
        <input type="password" placeholder="Confirm password" />
        <button className="submit-button">Signup</button>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="toggle-text">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
