import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostBySlug, fetchPostsByCategory } from "../utils/api";
import { decodeEntities } from "../utils/decodeEntities";
import SEO from "../components/Seo";
import ArticleShareIcons from "../components/ArticleShareIcons";
import PostCard from "../components/PostCard";
import AdBanner from "../components/AdBanner";
import ArticleVideo from "../components/ArticleVideo"; // Import the custom video component
import LoadingBar from "../components/LoadingBar";

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchPostBySlug(slug);
        setArticle(data);

        if (data?.categories?.length > 0) {
          const categoryId = data.categories[0];

          let related = await fetchPostsByCategory(categoryId);
          // console.log(
          //   "Total related articles fetched from API:",
          //   related.length
          // );

          // Exclude the current article
          let filteredRelated = related.filter((post) => post.slug !== slug);
          // console.log(
          //   "After filtering out current article:",
          //   filteredRelated.length
          // );

          // Ensure we always get at least 4 unique related posts
          if (filteredRelated.length < 4) {
            const extraPosts = related
              .filter((post) => post.slug !== slug)
              .slice(0, 4 - filteredRelated.length); // Only take missing number of posts

            //console.log("Extra posts fetched:", extraPosts.length);
            filteredRelated = [...filteredRelated, ...extraPosts];
          }

          // Remove duplicates properly using a Set
          const uniqueRelatedPosts = Array.from(
            new Map(filteredRelated.map((post) => [post.slug, post])).values()
          );

          //console.log("Final related posts count:", uniqueRelatedPosts.length);

          // Ensure exactly 4 unique articles
          setRelatedPosts(uniqueRelatedPosts.slice(0, 4));
        }
      } catch (err) {
        console.error("Error loading article:", err);
        setError(true);
      }
    };

    loadArticle();
  }, [slug]);

  if (error)
    return (
      <section className="content">
        <article>
          <p className="type-sansserif type-sz-xsm margin-top-md">
            Error loading the article. Please try again later.
          </p>
        </article>
      </section>
    );

  if (!article)
    return (
      <section className="content">
        <article>
          <LoadingBar
            classes={["margin-top-md", "padding-top-md", "margin-bottom-md"]}
          />
          <LoadingBar classes={["margin-bottom-md"]} />
          <LoadingBar classes={["margin-bottom-md"]} />
        </article>
      </section>
    );

  //console.log("Article data: ", article);
  return (
    <>
      <SEO
        title={article.title?.rendered || "Shamanicca Blog"}
        description={
          article.excerpt?.rendered?.replace(/<\/?p>/g, "") ||
          "Mindfulness, Wicca, White Magic, Alchemy & Shamanism Blog"
        }
        image={
          article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          `https://shamanicca.com/post/${article.slug}`
        }
        url={`https://shamanicca.com/post/${article.slug}`}
        type="article"
        articlePublishedTime={article.date}
        articleModifiedTime={article.modified}
        category={article.category}
        tags={article.tags}
      />

      <section className="content">
        <article>
          <h1 className="type-sansserif type-sz-lg padding-top-md type-bold type-uppercase">
            {decodeEntities(article.title.rendered)}
          </h1>

          {article.excerpt?.rendered && (
            <p
              className="type-serif type-sz-sm margin-bottom-sm"
              dangerouslySetInnerHTML={{
                __html: article.excerpt.rendered.replace(/<\/?p>/g, ""),
              }}
            />
          )}

          <p className="type-sz-caption type-sansserif">
            Category:{" "}
            {article._embedded?.["wp:term"]?.[0]?.[0] ? (
              <a
                href={`/category/${article._embedded["wp:term"][0][0].slug}`}
                className="type-primary"
              >
                {decodeEntities(article._embedded["wp:term"][0][0].name)}
              </a>
            ) : (
              "Uncategorized"
            )}
          </p>

          <ArticleShareIcons
            articleTitle={article.title.rendered}
            articleSlug={`https://shamanicca.com/post/${article.slug}`}
          />

          {article._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              className="margin-bottom-md"
              src={
                article._embedded["wp:featuredmedia"][0].media_details.sizes
                  .large.source_url
              }
              alt={decodeEntities(article.title.rendered)}
            />
          )}
          {/* {console.log(
            "image URL:",
            article._embedded["wp:featuredmedia"][0].media_details.sizes.large
              .source_url
          )} */}

          {/* Insert the custom video component */}
          {/* {console.log(article.acf)} */}
          <ArticleVideo acf={article.acf} />

          {/* Render content directly from WordPress */}
          {article.content?.rendered && (
            <>
              {article.content.rendered
                .split(/<\/p>/)
                .filter((paragraph) => paragraph.trim() !== "")
                .map((paragraph, index, paragraphs) => (
                  <React.Fragment key={index}>
                    <div
                      className="article_content"
                      dangerouslySetInnerHTML={{
                        __html:
                          index < paragraphs.length - 1
                            ? `${paragraph}</p>`
                            : paragraph,
                      }}
                    />
                    {index === 2 && paragraphs.length > 4 && (
                      <AdBanner classes={["margin-bottom-md"]} />
                    )}
                  </React.Fragment>
                ))}
            </>
          )}

          <AdBanner classes={["margin-bottom-md"]} key="ad-banner-end" />
        </article>

        <div className="margin-top-md margin-bottom-md">
          <section className="post_listing_grid_cont">
            <h4 className="type-uppercase type-sansserif type-bold type-sz-default margin-bottom-md">
              Related Articles
            </h4>
            <div className="post_listing_grid post_listing_grid_responsive">
              {relatedPosts.slice(0, 4).map((post, index) => (
                <React.Fragment key={post.id}>
                  {index % 2 === 0 && (
                    <section className="post_listing_grid post_listing_grid_responsive">
                      <PostCard key={`postcard-${post.id}`} post={post} />
                      {relatedPosts[index + 1] && (
                        <PostCard
                          key={`postcard-${relatedPosts[index + 1].id}`}
                          post={relatedPosts[index + 1]}
                        />
                      )}
                    </section>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Article;
