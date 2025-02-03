// Menu.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/app.scss";
import { fetchCategories } from "../utils/api";
import socialLinks from "./socialLinks";

const Menu = ({ isMenuVisible }) => {
  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const filteredCategories = data.filter(
          (category) => category.id !== 1 && category.id !== 82
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      className={`menu padding-top-md ${isMenuVisible ? "" : "menu_hidden"}`}
    >
      {categories.length > 0 ? (
        categories.map((category) => (
          <a
            key={category.id}
            className="type-sansserif type-bold type-sz-xsm type-no-decoration"
            href={`/category/${category.slug}`}
          >
            {category.name}
          </a>
        ))
      ) : (
        <p>No categories available.</p>
      )}

      {/* Static Links */}
      <a
        href="/page/get-shamaniccas-newsletter/"
        className="type-sansserif type-bold type-sz-xsm margin-top-md type-no-decoration"
      >
        Get Newsletter
      </a>
      <a
        href="/page/about-shamanicca/"
        className="type-sansserif type-bold type-sz-xsm margin-top-xsm type-no-decoration"
      >
        About Shamanicca
      </a>
      <a
        href="/page/contact-us/"
        className="type-sansserif type-bold type-sz-xsm margin-top-xsm type-no-decoration"
      >
        Contact Us
      </a>

      {/* Social Links */}
      <p className="type-sansserif type-uppercase type-sz-caption margin-top-md">
        Follow Us
      </p>
      <div className="row-ico">
        {socialLinks?.length > 0 ? (
          socialLinks.map(({ href, icon, alt }) => (
            <a
              key={alt}
              className="ico_link"
              target="_blank"
              rel="noopener noreferrer"
              href={href}
            >
              <img alt={alt} src={icon} />
            </a>
          ))
        ) : (
          <p className="type-sansserif type-sz-caption margin-top-md">
            No social links available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
