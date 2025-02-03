import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostBySlug, fetchPostsByCategory } from "../utils/api";
import { decodeEntities } from "../utils/decodeEntities";
import SEO from "../components/Seo";
import ArticleShareIcons from "../components/ArticleShareIcons";
import PostCard from "../components/PostCard";
import AdBanner from "../components/AdBanner";
import LoadingBar from "../components/LoadingBar"; // Import the LoadingBar component

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

          // Filter out the current post by slug
          const filteredRelated = related.filter((post) => post.slug !== slug);

          // If fewer than 4 posts remain after filtering, add additional posts from the category
          let extraRelatedPosts = [];
          if (filteredRelated.length < 4) {
            extraRelatedPosts = related
              .filter(
                (post) => !filteredRelated.includes(post) && post.slug !== slug // Exclude duplicates and the current post
              )
              .slice(0, 4 - filteredRelated.length);
          }

          // Combine filtered posts and extra posts to ensure 4 posts
          const finalRelatedPosts = [
            ...filteredRelated.slice(0, 4),
            ...extraRelatedPosts,
          ].slice(0, 4);
          setRelatedPosts(finalRelatedPosts);
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
          {/* Loading state with LoadingBar */}
          <LoadingBar
            classes={["margin-top-md", "padding-top-md", "margin-bottom-md"]}
          />
          <LoadingBar classes={["margin-bottom-md"]} />
          <LoadingBar classes={["margin-bottom-md"]} />
        </article>
      </section>
    );

  const articleSlug = `https://www.shamanicca.com/${slug}`;

  return (
    <>
      <SEO
        title={article.title?.rendered || "Shamanicca Blog"}
        description={
          article.excerpt?.rendered?.replace(/<\/?p>/g, "") ||
          "Mindfulness, Wicca, White Magic, Alchemy &amp; Shamanism Blog"
        }
        keywords={
          article.keywords
            ? article.keywords.join(", ")
            : "spirituality, meditation"
        }
        image={
          article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://example.com/default-image.jpg"
        }
        url={`https://shamanicca.com/post/${article.slug}`}
      />
      <section className="content">
        <article>
          <h1 className="type-sansserif type-sz-lg padding-top-md  type-bold type-uppercase">
            {article.title.rendered}
          </h1>

          {/* Excerpt */}
          {article.excerpt?.rendered && (
            <h2
              className="type-serif type-sz-sm margin-bottom-sm"
              dangerouslySetInnerHTML={{
                __html: article.excerpt.rendered.replace(/<\/?p>/g, ""), // Remove <p> tags
              }}
            />
          )}

          <p className="type-sz-caption">
            Category:{" "}
            {article._embedded?.["wp:term"]?.[0]?.[0] ? (
              <a
                href={`/category/${article._embedded["wp:term"][0][0].slug}`}
                className="type-primary"
              >
                {article._embedded["wp:term"][0][0].name}
              </a>
            ) : (
              "Uncategorized"
            )}
          </p>

          <ArticleShareIcons
            articleTitle={article.title.rendered}
            articleSlug={articleSlug}
          />
          {article._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              className="margin-bottom-md"
              src={article._embedded["wp:featuredmedia"][0].source_url}
              alt={article.title.rendered}
            />
          )}
          {/* Article Content */}
          {article.content?.rendered && (
            <React.Fragment>
              {article.content.rendered
                .split(/<\/p>/) // Split the content into paragraphs
                .filter((paragraph) => paragraph.trim() !== "") // Remove empty paragraphs
                .map((paragraph, index, paragraphs) => (
                  <React.Fragment key={index}>
                    {/* Render the paragraph */}
                    <div
                      className={`type-sansserif ${
                        index === 3 ? "margin-top-sm" : ""
                      }`}
                      dangerouslySetInnerHTML={{
                        __html:
                          index < paragraphs.length - 1
                            ? `${paragraph}</p>`
                            : paragraph,
                      }}
                    />
                    {/* Insert AdBanner after the 3rd paragraph */}
                    {paragraphs.length > 5 && index === 2 && <AdBanner />}
                  </React.Fragment>
                ))}
            </React.Fragment>
          )}
          {/* Display an ad banner at the end of the posts list */}
          <AdBanner classes={["margin-bottom-md"]} key="ad-banner-end" />
        </article>

        <div className="margin-top-md margin-bottom-lg">
          <section className="post_listing_grid_cont">
            <h4 className="type-uppercase type-sansserif type-bold type-sz-default margin-bottom-md">
              Related Articles
            </h4>
            {relatedPosts.slice(0, 4).map((post, index) => (
              <React.Fragment key={post.id}>
                {index % 2 === 0 && (
                  <section className="post_listing_grid post_listing_grid_responsive">
                    <PostCard
                      key={`postcard-${post.id}`}
                      post={post}
                      decodeEntities={decodeEntities}
                    />
                    {relatedPosts[index + 1] && (
                      <PostCard
                        key={`postcard-${relatedPosts[index + 1].id}`}
                        post={relatedPosts[index + 1]}
                        decodeEntities={decodeEntities}
                      />
                    )}
                  </section>
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
      </section>
    </>
  );
};

export default Article;
