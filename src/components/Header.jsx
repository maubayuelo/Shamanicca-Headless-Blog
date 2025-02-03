// Header.jsx

import React, { useState } from "react";
import "../styles/app.scss";
import shamaniccaLogo from "../img/shamanicca-logo.svg";
import IcoHam from "../img/icon-ham-menu.svg";
import IcoClose from "../img/icon-x.svg";
import IcoSearch from "../img/icon-search.svg";

const Header = ({ toggleMenu, toggleSearch, isMenuVisible }) => {
  return (
    <header className="header">
      <div className="col">
        {/* Hamburger Menu */}
        <div
          id="ham_btn"
          className={`ico ham_btn ${isMenuVisible ? "menu_hidden" : ""}`}
          onClick={toggleMenu}
        >
          <img
            alt="Menu Icon"
            className={`ico ico-ham ${isMenuVisible ? "hidden" : ""}`}
            src={IcoHam}
          />
          <img
            alt="Close Menu Icon"
            className={`ico ico-x ${isMenuVisible ? "" : "hidden"}`}
            src={IcoClose}
          />
        </div>

        {/* Logo */}
        <a href="/" className="logo">
          <img alt="Shamanicca Logo" src={shamaniccaLogo} />
        </a>

        {/* Search Icon */}
        <img
          alt="Search Icon"
          id="search_btn"
          className="ico search_btn"
          onClick={toggleSearch}
          src={IcoSearch}
        />
      </div>
    </header>
  );
};

export default Header;
