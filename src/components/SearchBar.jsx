// SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.scss";

const SearchBar = ({ isSearchVisible, toggleSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      id="search_form_header"
      className={`search_form_header ${
        isSearchVisible ? "search_form_header_active" : ""
      }`}
    >
      <form
        role="search"
        method="get"
        className="searchform"
        onSubmit={handleSearchSubmit}
      >
        <div>
          <input
            type="text"
            name="s"
            placeholder="Type keyword(s)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input type="submit" value="Search" onClick={toggleSearch} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
