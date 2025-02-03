// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import CookiesInfoBar from "./components/CookiesInfoBar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Article from "./pages/Article";
import Category from "./pages/Category";
import AllArticles from "./pages/AllArticles";
import Page from "./pages/Page";

const App = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);

  const [categories, setCategories] = useState([]);

  // Toggle the menu and ensure the search bar is closed
  const toggleMenu = () => {
    if (!isMenuVisible) {
      setSearchVisible(false);
    }
    setMenuVisible((prev) => !prev);
  };

  // Toggle the search bar and ensure the menu is closed
  const toggleSearch = () => {
    if (!isSearchVisible) {
      setMenuVisible(false);
    }
    setSearchVisible((prev) => !prev);
  };

  return (
    <Router future={{ v7_startTransition: true }}>
      <Header
        toggleMenu={toggleMenu}
        toggleSearch={toggleSearch}
        isMenuVisible={isMenuVisible}
      />
      <Menu isMenuVisible={isMenuVisible} categories={categories} />
      <SearchBar
        toggleSearch={toggleSearch}
        isSearchVisible={isSearchVisible}
      />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Article />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/category/:slug/:page" element={<Category />} />
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/articles/:page" element={<AllArticles />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/search/:query/:page" element={<SearchResults />} />
          <Route path="/page/:slug" element={<Page />} />
        </Routes>
        <Sidebar />
      </main>
      <Footer />
      <CookiesInfoBar />
    </Router>
  );
};

export default App;
