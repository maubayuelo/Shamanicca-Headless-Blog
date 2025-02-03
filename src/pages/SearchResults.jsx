// SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/app.scss";
import LoadingBar from "../components/LoadingBar";
import Pagination from "../components/Pagination";
import { fetchPlaceholderImage, fetchSearchResults } from "../utils/api"; // Add this function to your API utils
import MainBanner from "../components/MainBanner";
import PostCardExt from "../components/PostCardExt";
import AdBanner from "../components/AdBanner";
import SEO from "../components/Seo";

const SearchResults = () => {
  const { query } = useParams(); // Get search query from URL
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [placeholderImage, setPlaceholderImage] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetchSearchResults(query, currentPage);
        if (response && response.posts) {
          const placeholder = await fetchPlaceholderImage();
          setPlaceholderImage(placeholder);
          setResults(response.posts);
          setTotalPages(response.totalPages || 1);
        } else {
          throw new Error("Invalid API response structure.");
        }
      } catch (err) {
        console.error("Error loading search results:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/search/${query}/${page}`);
  };

  if (error)
    return (
      <div className="post_listing_grid_ext">
        <p className="type-sansserif type-sz-xsm margin-top-md">
          Error loading search results. Please try again later.
        </p>
      </div>
    );

  return (
    <>
      <SEO
        title="Shamanicca Blog - Search Results"
        description="Mindfulness, Wicca, White Magic, Alchemy &amp; Shamanism Blog"
        keywords="meditation, spirituality, guided meditations, inner peace, wicca, shamanism, Mindfulness,  White Magic, Alchemy, Blog"
        image="https://shamanicca.com/path-to-image.jpg"
        url="https://shamanicca.com"
      />
      <section className="content margin-bottom-sm">
        {/* Main Banner Section */}
        <MainBanner
          title={categoryName || "No category available"}
          description={
            categoryDescription || "No description available for this category."
          }
          isLoading={isLoading}
        />

        {/* Post Listing */}
        {isLoading ? (
          <div className="post_listing_grid_cont">
            <LoadingBar classes={["margin-bottom-md"]} />
          </div>
        ) : posts.length > 0 ? (
          <div className="post_listing_grid_cont">
            {posts.map((post, index) => (
              <React.Fragment key={`post-card-${index}`}>
                <PostCardExt
                  key={post.id}
                  post={post}
                  placeholderImage={placeholderImage}
                  decodeEntities={(str) =>
                    str
                      .replace(/(<([^>]+)>)/gi, "")
                      .split(" ")
                      .slice(0, 12)
                      .join(" ")
                  }
                />
                {posts.length > 5 && index === 2 && (
                  <AdBanner
                    classes={["margin-bottom-md"]}
                    key={`ad-banner-4th-${index}`}
                  />
                )}
              </React.Fragment>
            ))}
            {/* Display an ad banner at the end of the posts list */}
            <AdBanner classes={["margin-bottom-md"]} key="ad-banner-end" />
          </div>
        ) : (
          <p>No posts found for this category.</p>
        )}

        {/* Pagination */}
        {isLoading ? (
          <LoadingBar classes={["margin-bottom-md"]} />
        ) : totalPages > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            baseUrl={`/category/${slug}`}
          />
        ) : null}
      </section>
      <section className="content margin-bottom-sm">
        {/* Main Banner Section */}
        <MainBanner
          title="Search Results for:"
          description={`"${query}"`}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="post_listing_grid_cont">
            <LoadingBar classes={["margin-bottom-md"]} />
          </div>
        ) : results.length > 0 ? (
          <div className="post_listing_grid_cont">
            {results.map((post, index) => (
              <React.Fragment key={`post-card-${index}`}>
                <PostCardExt
                  key={post.id}
                  post={post}
                  placeholderImage={placeholderImage}
                  decodeEntities={(str) =>
                    str
                      .replace(/(<([^>]+)>)/gi, "")
                      .split(" ")
                      .slice(0, 12)
                      .join(" ")
                  }
                />
                {results.length > 5 && index === 2 && (
                  <AdBanner
                    classes={["margin-bottom-sm"]}
                    key={`ad-banner-4th-${index}`}
                  />
                )}
              </React.Fragment>
            ))}
            {/* Display an ad banner at the end of the posts list */}
            <AdBanner classes={["margin-bottom-md"]} key="ad-banner-end" />
          </div>
        ) : (
          <p>No results found for "{query}".</p>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            baseUrl={`/search/${query}`}
          />
        )}
      </section>
    </>
  );
};

export default SearchResults;
