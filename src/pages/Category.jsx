// Category.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/app.scss";
import LoadingBar from "../components/LoadingBar";
import AdBanner from "../components/AdBanner";
import Pagination from "../components/Pagination";
import { fetchPlaceholderImage, fetchPostsByCategorySlug } from "../utils/api";
import MainBanner from "../components/MainBanner";
import PostCardExt from "../components/PostCardExt";
import SEO from "../components/Seo";

const Category = () => {
  const { slug } = useParams(); // Get category slug from URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [placeholderImage, setPlaceholderImage] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPostsByCategorySlug(slug, currentPage);
        const placeholder = await fetchPlaceholderImage();
        setPlaceholderImage(placeholder);

        if (response && response.posts) {
          setPosts(response.posts);
          setCategoryName(response.categoryName || "");
          setCategoryDescription(response.categoryDescription || "");
          setTotalPages(response.totalPages || 1);
        } else {
          throw new Error("Invalid API response structure.");
        }
      } catch (err) {
        console.error("Error loading posts for category:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [slug, currentPage]);

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Update the URL with the page number
    // Update the URL conditionally
    if (page === 1) {
      navigate(`/category/${slug}`); // No page number in URL for page 1
    } else {
      navigate(`/category/${slug}/${page}`); // Include page number for other pages
    }
  };

  if (error)
    return (
      <div className="post_listing_grid_cont">
        <p className="type-sansserif type-sz-xsm margin-top-md">
          Error loading the category posts. Please try again later.
        </p>
      </div>
    );

  return (
    <>
      <SEO
        title={`Shamanicca Blog - ${categoryName}`}
        description={categoryDescription}
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
    </>
  );
};

export default Category;
