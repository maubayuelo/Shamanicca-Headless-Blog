// PostCard.jsx
import React, { useEffect, useState } from "react";
import LoadingBar from "./LoadingBar";
import { fetchPlaceholderImage } from "../utils/api";
import { decodeEntities } from "../utils/decodeEntities";

const PostCard = ({ post, isLoading }) => {
  const [placeholderImage, setPlaceholderImage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false); // Track image loading state

  useEffect(() => {
    const loadPlaceholderImage = async () => {
      try {
        const placeholder = await fetchPlaceholderImage();
        setPlaceholderImage(placeholder?.thumbnail); // Fallback to default placeholder
      } catch (error) {
        console.error("Error fetching placeholder image:", error);
        //setPlaceholderImage("/img/placeholder.jpg"); // Fallback on error
      }
    };

    loadPlaceholderImage();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isLoading) {
    return <LoadingBar classes={["margin-bottom-md"]} />;
  }

  const excerptText =
    post.excerpt?.rendered
      ?.replace(/(<([^>]+)>)/gi, "") // Strip HTML tags
      .split(" ") // Split into words
      .slice(0, 6) // Take the first 6 words
      .join(" ") || "No description available.";

  const imageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail
      ?.source_url || placeholderImage;

  return (
    <section key={post.id} className="post_thumb">
      <a href={`/post/${post.slug}`}>
        {!imageLoaded && (
          <div className="padding-right-sm">
            <LoadingBar classes={["aspect-1-1"]} />
          </div>
        )}{" "}
        {/* Show LoadingBar */}
        <img
          src={imageUrl}
          alt={post.title?.rendered || "Post Thumbnail"}
          onLoad={handleImageLoad} // Trigger when image loads
          style={!imageLoaded ? { display: "none" } : {}} // Hide image until loaded
        />
      </a>
      <div className="col">
        <h4 className="type-sansserif type-bold type-sz-xsm margin-bottom-xsm">
          <a href={`/post/${post.slug}`} className="type-no-decoration">
            {decodeEntities(post.title?.rendered.replace(/(<([^>]+)>)/gi, ""))}
          </a>
        </h4>
        <p className="type-sansserif type-sz-caption type-no-margin">
          {decodeEntities(excerptText)}...
        </p>
      </div>
    </section>
  );
};

export default PostCard;
