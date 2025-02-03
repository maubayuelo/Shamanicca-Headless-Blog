// MainBanner.jsx
import React from "react";
import LoadingBar from "./LoadingBar";

const MainBanner = ({ title, description, isLoading }) => {
  return (
    <section className="main_b4nn3r">
      {isLoading ? (
        <>
          <LoadingBar classes={["padding-top-md", "margin-bottom-sm"]} />
          <LoadingBar />
        </>
      ) : (
        <>
          {title && (
            <h1 className="display type-serif type-sz-xsm type-regular no-margin-bottom type-uppercase">
              {title || "Default Title"}
            </h1>
          )}
          {description && (
            <p className="display type-sansserif type-sz-caption type-regular margin-top-xsm no-margin-bottom">
              {description}
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default MainBanner;
