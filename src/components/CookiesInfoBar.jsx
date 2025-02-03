// CookiesInfoBar.js
import React, { useEffect, useState } from "react";
import "../styles/app.scss";

const CookiesInfoBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if the cookie acceptance exists
  useEffect(() => {
    const isAccepted = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieInfoHidden="));
    if (!isAccepted) {
      setIsVisible(true);
    }
  }, []);

  // Save acceptance in cookies
  const acceptCookies = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Cookie valid for 7 days
    document.cookie = `cookieInfoHidden=1; expires=${expiryDate.toUTCString()}; path=/`;
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="cookies-infobar padding-bottom-sm">
        <div className="cookies-infobar_wrapper">
          <p className="type-sansserif type-sz-caption-2 no-margin">
            By using our website, you agree to our use of cookies. Please refer
            to our{" "}
            <a href="/cookie-policy" className="type-sansserif type-bold">
              cookie policy
            </a>{" "}
            for more information.
          </p>
          <a
            id="cookies-infobar-close"
            className="cookies-infobar-btn type-sansserif type-sz-caption type-bold type-uppercase no-margin"
            onClick={acceptCookies}
          >
            Ok
          </a>
        </div>
      </div>
    )
  );
};

export default CookiesInfoBar;
