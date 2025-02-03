// Sidebar.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/app.scss";
import { fetchPostsByCategory, fetchPlaceholderImage } from "../utils/api";
import { decodeEntities } from "../utils/decodeEntities";
import PostCard from "../components/PostCard";
import LoadingBar from "../components/LoadingBar";

const Sidebar = () => {
  const location = useLocation();
  const currentSlug = location.pathname.split("/post/")[1]; // Extract current slug
  const [popularPosts, setPopularPosts] = useState([]);
  const [whiteMagicPosts, setWhiteMagicPosts] = useState([]);
  const [placeholderImage, setPlaceholderImage] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading

  // Category IDs
  const POPULAR_ARTICLES_ID = 82; // ID for "popular-articles" category
  const WHITE_MAGIC_ID = 5; // ID for "white-magic-for-beginners" category

  useEffect(() => {
    const loadSidebarData = async () => {
      setLoading(true);
      try {
        const placeholder = await fetchPlaceholderImage();
        setPlaceholderImage(placeholder);

        const popular = await fetchPostsByCategory(POPULAR_ARTICLES_ID);
        const filteredPopular = popular.filter(
          (post) => post.slug !== currentSlug
        );

        // Ensure 3 posts by adding extra posts if filteredPopular < 3
        const extraPopularPosts =
          filteredPopular.length < 3
            ? popular
                .filter((post) => !filteredPopular.includes(post))
                .slice(0, 3 - filteredPopular.length)
            : [];

        setPopularPosts([...filteredPopular.slice(0, 3), ...extraPopularPosts]);

        const whiteMagic = await fetchPostsByCategory(WHITE_MAGIC_ID);
        const filteredWhiteMagic = whiteMagic.filter(
          (post) => post.slug !== currentSlug
        );

        // Ensure 3 posts by adding extra posts if filteredWhiteMagic < 3
        const extraWhiteMagicPosts =
          filteredWhiteMagic.length < 3
            ? whiteMagic
                .filter((post) => !filteredWhiteMagic.includes(post))
                .slice(0, 3 - filteredWhiteMagic.length)
            : [];

        setWhiteMagicPosts([
          ...filteredWhiteMagic.slice(0, 3),
          ...extraWhiteMagicPosts,
        ]);
      } catch (error) {
        console.error("Error loading sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSidebarData();
  }, [currentSlug]);

  return (
    <aside className="sidebar margin-bottom-lg">
      {/* Top Reads Section */}
      <section className="highlighted-posts">
        <h3 className="type-uppercase type-sansserif type-bold type-sz-default">
          Top Reads
        </h3>
        {loading ? (
          <>
            <LoadingBar classes={["margin-bottom-sm"]} />
            <LoadingBar classes={["margin-bottom-sm"]} />
            <LoadingBar classes={["margin-bottom-sm"]} />
          </>
        ) : (
          popularPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              decodeEntities={decodeEntities}
            />
          ))
        )}
      </section>

      {/* White Magic for Beginners Section */}
      <section className="categories margin-top-md">
        <h3 className="type-uppercase type-sansserif type-bold type-sz-default">
          White Magic 101
        </h3>
        {loading ? (
          <>
            <LoadingBar classes={["margin-bottom-sm"]} />
            <LoadingBar classes={["margin-bottom-sm"]} />
            <LoadingBar classes={["margin-bottom-sm"]} />
          </>
        ) : (
          whiteMagicPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              decodeEntities={decodeEntities}
            />
          ))
        )}
      </section>
    </aside>
  );
};

export default Sidebar;
