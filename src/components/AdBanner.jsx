// AdBanner.jsx
import React, { useState, useEffect } from "react";
import { fetchPlaceholderImage, fetchAdBannerData } from "../utils/api";
import LoadingBar from "./LoadingBar";

const AdBanner = ({ classes = [] }) => {
  const className = ["pr0m0_b4nn3r", ...classes].join(" ");
  //console.log("Banner Classes:", className);
  const [adBannerData, setAdBannerData] = useState(null);
  const [placeholderImage, setPlaceholderImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAdBannerData = async () => {
      try {
        // Fetch and set placeholder image
        const placeholder = await fetchPlaceholderImage();
        setPlaceholderImage(placeholder);

        // Fetch ad banner data
        const adData = await fetchAdBannerData();
        setAdBannerData(adData);
      } catch (error) {
        console.error("Error loading ad banner data:", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    loadAdBannerData();
  }, []);

  // Show LoadingBar while loading
  if (isLoading) {
    return <LoadingBar classes={["margin-top-md", "margin-bottom-md"]} />;
  }

  // If data still hasn't loaded after the loading bar, render nothing
  if (!adBannerData) return null;

  return (
    <section className={className}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={adBannerData.url}
        className="img-cont"
      >
        <img
          alt={adBannerData.title}
          src={adBannerData.image.sizes.medium || placeholderImage.medium}
        />
      </a>
      <div className="type-cont">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={adBannerData.url}
          className="type-sansserif type-bold type-sz-default type-no-margin type-uppercase type-no-decoration"
        >
          {adBannerData.title}
        </a>
        <p className="type-sansserif type-sz-caption type-no-margin">
          {adBannerData.tagText}
        </p>
      </div>
      <div className="btn-cont">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn_primary type-bold type-sansserif type-uppercase type-no-decoration margin-center"
          href={adBannerData.url}
        >
          {adBannerData.ctaText}
        </a>
      </div>
    </section>
  );
};

export default AdBanner;
