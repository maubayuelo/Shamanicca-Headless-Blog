// ArticleVideo.jsx
import React from "react";

const ArticleVideo = ({ acf }) => {
  // Check if the ACF fields exist and if the video should be displayed
  if (!acf || !acf.display_video || !acf.yoube_video_id) {
    return null;
  }

  return (
    <div className="article-video margin-bottom-sm">
      <iframe
        className="feat-yt-video"
        src={`https://www.youtube.com/embed/${acf.yoube_video_id}`}
        title={acf.video_title || "Featured Video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {acf.video_title && (
        <p className="video-title type-sansserif type-sz-caption">
          {acf.video_title}
        </p>
      )}
    </div>
  );
};

export default ArticleVideo;
