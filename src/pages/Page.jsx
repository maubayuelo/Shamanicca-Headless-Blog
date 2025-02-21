import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPageBySlug } from "../utils/api";
import SEO from "../components/Seo";
import LoadingBar from "../components/LoadingBar";
import AdBanner from "../components/AdBanner";

const Page = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await fetchPageBySlug(slug);
        console.log("Fetched page data:", data); // Debug log
        if (!data) throw new Error("Page not found");
        setPage(data);
      } catch (err) {
        console.error("Error loading page:", err); // Debug log
        setError(true);
      }
    };

    loadPage();
  }, [slug]);

  if (error)
    return (
      <section className="content">
        <article>
          <p className="type-sansserif type-sz-xsm margin-top-md">
            Error loading the page. Please try again later.
          </p>
        </article>
      </section>
    );

  if (!page)
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

  const {
    title = { rendered: "Untitled" },
    excerpt = { rendered: "" },
    content = { rendered: "" },
    _embedded = {},
  } = page;

  const featuredMedia = _embedded["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <>
      <SEO
        title={title.rendered}
        description={excerpt.rendered.replace(/<\/?p>/g, "")}
        url={`https://shamanicca.com/page/${slug}`}
      />

      <section className="content  margin-bottom-lg">
        <article>
          <h1 className="type-sansserif type-sz-lg padding-top-md type-bold type-uppercase">
            {title.rendered}
          </h1>

          {/* Excerpt */}
          {excerpt.rendered && (
            <h2
              className="type-serif type-sz-sm margin-bottom-sm"
              dangerouslySetInnerHTML={{
                __html: excerpt.rendered.replace(/<\/?p>/g, ""),
              }}
            />
          )}

          {/* Featured Media */}
          {featuredMedia && (
            <img
              className="margin-bottom-md"
              src={featuredMedia}
              alt={title.rendered}
            />
          )}

          {/* Page Content */}
          {content.rendered && (
            <div
              className="article_content"
              dangerouslySetInnerHTML={{
                __html: content.rendered,
              }}
            />
          )}
        </article>
      </section>
    </>
  );
};

export default Page;
