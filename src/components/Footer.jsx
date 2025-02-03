// Footer.jsx
import React from "react";
import "../styles/app.scss";
import socialLinks from "./socialLinks";

const Footer = () => {
  return (
    <footer className="padding-top-lg padding-bottom-lg">
      <div className="container-1-col">
        <p className="type-sansserif type-sz-caption-2 type-uppercase margin-bottom-sm">
          Catch updates following us on:
        </p>
        <div className="row margin-bottom-md">
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
        <div className="row margin-bottom-md">
          <a
            href="/get-shamaniccas-newsletter/"
            className="type-sansserif type-bold type-sz-caption-2 type-uppercase type-no-margin type-no-decoration"
          >
            Get Our Newsletter
          </a>
          <a
            href="/terms-and-conditions/"
            className="type-sansserif type-bold type-sz-caption-2 type-uppercase type-no-margin type-no-decoration"
          >
            Terms & Conditions
          </a>
        </div>
        <p className="type-sansserif type-sz-caption-2 type-no-margin">
          &copy; 2022-{new Date().getFullYear()} Shamanicca.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
