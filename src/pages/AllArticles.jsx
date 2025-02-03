// AllArticles.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/app.scss";
import AdBanner from "../components/AdBanner";
import Pagination from "../components/Pagination";
import { fetchPlaceholderImage, fetchPosts } from "../utils/api";
import MainBanner from "../components/MainBanner";
import PostCardExt from "../components/PostCardExt";
import LoadingBar from "../components/LoadingBar";
import SEO from "../components/Seo";

const AllArticles = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [placeholderImage, setPlaceholderImage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const baseUrl = "http://shamanicca.local/articles"; // Base URL for pagination

  const [isLoading, setIsLoading] = useState(false);

  // Fetch posts for the current page
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPosts(currentPage); // Pass the current page
        setPosts(response.data); // Set the posts data
        //console.log("Response Data:", response.data);
        setTotalPages(parseInt(response.headers["x-wp-totalpages"] || "1", 10)); // Get total pages from API headers
        //console.log("Response Headers:", response.headers);
        const placeholder = await fetchPlaceholderImage();
        setPlaceholderImage(placeholder);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 1) {
      navigate(`/articles`); // No page number for page 1
    } else {
      navigate(`/articles/${page}`); // Add page number for other pages
    }
  };

  return (
    <>
      <SEO
        title="Shamanicca Blog - All Articles"
        description="Mindfulness, Wicca, White Magic, Alchemy &amp; Shamanism Blog"
        keywords="meditation, spirituality, guided meditations, inner peace, wicca, shamanism, Mindfulness,  White Magic, Alchemy, Blog"
        image="https://shamanicca.com/path-to-image.jpg"
        url="https://shamanicca.com"
      />
      <section className="content content_ext">
        {/* Main Banner Section */}
        <MainBanner
          title={"All Blog Articles"}
          description={"Browse all our posts."}
          isLoading={false}
        />
        {/* Articles Listing */}
        {isLoading ? (
          <div className="post_listing_grid_cont">
            <LoadingBar classes={["margin-bottom-md"]} />
          </div>
        ) : (
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
                    key={index}
                    classes={["margin-bottom-md"]}
                    key={`ad-banner-4th-${index}`}
                  />
                )}
              </React.Fragment>
            ))}
            {/* Display an ad banner at the end of the posts list */}
            <AdBanner classes={["margin-bottom-md"]} key="ad-banner-end" />
          </div>
        )}
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange} // Use handlePageChange here
          baseUrl={baseUrl}
        />
        ;
      </section>
    </>
  );
};

export default AllArticles;
