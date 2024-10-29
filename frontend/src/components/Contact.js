// Contact.js
import React from 'react';
import '../Styles/Contact.css';

const Contact = () => (
  <div className="container">
    <h2>Contact Us</h2>
    <form className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your Name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Your Email" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  </div>
);

export default Contact;
