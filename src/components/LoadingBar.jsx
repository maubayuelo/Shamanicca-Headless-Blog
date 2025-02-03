/// LoadingBar.js
import React from "react";
import PropTypes from "prop-types";

const LoadingBar = ({ classes = [] }) => {
  // Combine the default class with any additional classes passed via props
  const className = ["loading-bar", ...classes].join(" ");

  return <div className={className}></div>;
};

// Define prop types for validation
LoadingBar.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
};

export default LoadingBar;
