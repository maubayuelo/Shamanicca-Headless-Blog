// PostCardExt.jsx
import React from "react";
import { fetchPlaceholderImage } from "../utils/api";
import { decodeEntities } from "../utils/decodeEntities";

const PostCardExt = ({ post, placeholderImage }) => {
  const imageSrc =
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url || placeholderImage.medium;

  return (
    <div className="post_thumb_ext">
      <a href={`/post/${post.slug}`}>
        <picture>
          <source
            media="(max-width: 799px)"
            srcSet={
              post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
                ?.thumbnail?.source_url || placeholderImage.thumbnail
            }
          />
          <source media="(min-width: 800px)" srcSet={imageSrc} />
          <img src={imageSrc} alt={post.title.rendered} />
        </picture>
      </a>
      <div className="col">
        <h4 className="type-sansserif type-bold margin-bottom-xsm">
          <a href={`/post/${post.slug}`} className="type-no-decoration">
            {decodeEntities(post.title.rendered)}
          </a>
        </h4>
        <p className="type-sansserif type-sz-caption type-no-margin">
          {decodeEntities(post.excerpt?.rendered || "No description available.")
            .replace(/(<([^>]+)>)/gi, "")
            .split(" ")
            .slice(0, 12)
            .join(" ")}{" "}
          ...
        </p>
      </div>
    </div>
  );
};

export default PostCardExt;
