import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logo from '../assets/logo-b.png';
import camera from '../assets/camera.png';

export default function Header() {
  return (
    <header id="main-header">
        <div className="header-content">
            <Link to="/">
                <img src={logo} height="45" alt="logo"/>
            </Link>
            <Link to="/new">
                <img src={camera} height="30" alt="enviar publicação"/>
            </Link>
        </div>
    </header>
  );
}
