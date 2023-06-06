import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './NavDetail.css';

const DetailNav = () => {
  return (
    <nav className="detail-nav-container">
      <Link to="/home" className="back-link">
        <FaArrowLeft size={20} />
         Return Home
      </Link>
    </nav>
  );
};

export default DetailNav;
