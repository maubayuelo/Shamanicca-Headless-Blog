// Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/app.scss";
import AdBanner from "../components/AdBanner";
import PostCard from "../components/PostCard";
import LoadingBar from "../components/LoadingBar";
import {
  fetchPlaceholderImage,
  fetchHomeBanner,
  fetchHeroArticle,
  fetchFirstPosts,
  fetchAllPostPageLink,
} from "../utils/api";
import MainBanner from "../components/MainBanner";
import SEO from "../components/Seo";

const Home = () => {
  const [placeholderImage, setPlaceholderImage] = useState("");
  const [homeBanner, setHomeBanner] = useState(null);
  const [heroArticle, setHeroArticle] = useState(null);
  const [posts, setPosts] = useState([]);
  const [allPostsLink, setAllPostsLink] = useState(null);

  const [isLoadingHomeBanner, setIsLoadingHomeBanner] = useState(true);
  const [isLoadingHeroArticle, setIsLoadingHeroArticle] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingAdBanner, setIsLoadingAdBanner] = useState(true);
  const [isLoadingAllPostsLink, setIsLoadingAllPostsLink] = useState(true);

  const decodeEntities = (html) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  };

  useEffect(() => {
    const loadHomeBanner = async () => {
      try {
        const homeBannerData = await fetchHomeBanner();
        setHomeBanner(homeBannerData);
      } catch (error) {
        console.error("Error loading home banner:", error);
      } finally {
        setIsLoadingHomeBanner(false);
      }
    };

    const loadHeroArticle = async () => {
      try {
        const heroArticleData = await fetchHeroArticle();
        console.log("Hero Article Data:", heroArticleData);
        setHeroArticle(heroArticleData);
      } catch (error) {
        console.error("Error loading hero article:", error);
      } finally {
        setIsLoadingHeroArticle(false);
      }
    };

    const loadPosts = async () => {
      try {
        const postList = await fetchFirstPosts();
        setPosts(postList);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoadingPosts(false);
        setIsLoadingAdBanner(false); // AdBanner depends on posts loading
      }
    };

    const loadAllPostsLink = async () => {
      try {
        const allPostsPage = await fetchAllPostPageLink();
        setAllPostsLink(allPostsPage);
      } catch (error) {
        console.error("Error loading all posts link:", error);
      } finally {
        setIsLoadingAllPostsLink(false);
      }
    };

    const loadPlaceholderImage = async () => {
      try {
        const placeholder = await fetchPlaceholderImage();
        setPlaceholderImage(placeholder);
      } catch (error) {
        console.error("Error loading placeholder image:", error);
      }
    };

    // Call all loaders
    loadPlaceholderImage();
    loadHomeBanner();
    loadHeroArticle();
    loadPosts();
    loadAllPostsLink();
  }, []);

  return (
    <>
      <SEO
        title="Shamanicca Blog - Mindfulness, Wicca, White Magic, Alchemy & Shamanism"
        description="Explore articles about mindfulness, Wicca, White Magic, Alchemy, and Shamanism."
        url="https://shamanicca.com"
      />

      <section className="content">
        {/* Main Banner Section */}
        <MainBanner
          title={
            homeBanner?.excerpt?.rendered
              ? decodeEntities(
                  homeBanner.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")
                )
              : null
          }
          description={null}
          isLoading={isLoadingHomeBanner}
        />
        {/* {console.log(heroArticle)} */}
        {/* Hero Article Section */}
        {isLoadingHeroArticle ? (
          <LoadingBar classes={["padding-top-xlg", "margin-bottom-sm"]} />
        ) : (
          heroArticle && (
            <section className="post_listing_grid_cont">
              <div className="hero-article margin-bottom-md">
                <a
                  className="hero-article-image"
                  href={`/post/${heroArticle.slug}`}
                >
                  <img
                    alt={heroArticle.title?.rendered || "Hero Article"}
                    src={heroArticle.featuredImage || placeholderImage.medium}
                  />
                </a>
                <div className="hero-article-col">
                  <h2 className="type-sansserif type-sz-default type-bold margin-top-sm">
                    <a
                      href={`/post/${heroArticle.slug}`}
                      className="type-no-decoration"
                    >
                      {decodeEntities(
                        heroArticle.title?.rendered.replace(
                          /<\/?[^>]+(>|$)/g,
                          ""
                        )
                      )}
                    </a>
                  </h2>
                  <p className="type-sansserif type-sz-caption">
                    {decodeEntities(
                      heroArticle.excerpt?.rendered || ""
                    ).replace(/(<([^>]+)>)/gi, "")}
                  </p>
                </div>
              </div>
            </section>
          )
        )}

        {/* Post Listing Section */}
        {isLoadingPosts ? (
          <LoadingBar classes={["margin-bottom-sm"]} />
        ) : (
          <section className="post_listing_grid_cont">
            {posts.map((post, index) => (
              <React.Fragment key={post.id}>
                {index % 2 === 0 && (
                  <section
                    className={`post_listing_grid post_listing_grid_responsive${
                      index === 4 ? " margin-top-md" : ""
                    }`}
                  >
                    <PostCard
                      post={post}
                      placeholderImage={placeholderImage.thumbnail}
                      decodeEntities={decodeEntities}
                    />
                    {posts[index + 1] && (
                      <PostCard
                        post={posts[index + 1]}
                        placeholderImage={placeholderImage.thumbnail}
                        decodeEntities={decodeEntities}
                      />
                    )}
                  </section>
                )}
                {index === 3 && !isLoadingAdBanner && (
                  <AdBanner
                    classes={["margin-bottom-sm"]}
                    placeholderImage={placeholderImage}
                  />
                )}
              </React.Fragment>
            ))}
            {/* AdBanner Section */}
            {isLoadingAdBanner ? (
              <LoadingBar classes={["margin-bottom-sm"]} />
            ) : (
              <AdBanner
                classes={["margin-bottom-md"]}
                placeholderImage={placeholderImage}
              />
            )}
            {/* All Posts Link Section */}
            {isLoadingAllPostsLink ? (
              <LoadingBar classes={["margin-bottom-lg"]} />
            ) : (
              allPostsLink && (
                <a
                  href={allPostsLink}
                  className="btn type-bold type-sansserif type-uppercase type-no-decoration margin-center margin-top-sm margin-bottom-lg"
                >
                  See all articles
                </a>
              )
            )}
          </section>
        )}
      </section>
    </>
  );
};

export default Home;
