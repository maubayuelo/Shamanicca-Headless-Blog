import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Shamanicca Blog",
  description = "Mindfulness, Wicca, White Magic, Alchemy & Shamanism Blog",
  keywords = "meditation, spirituality, guided meditations, inner peace, wicca, shamanism, mindfulness, white magic, alchemy",
  image = "https://shamanicca.com/wp-content/uploads/2025/02/bioPage-thumb.png",
  url = "https://shamanicca.com",
  type = "website",
  articlePublishedTime,
  articleModifiedTime,
  author = "Shamanicca",
  category,
  tags = [],
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    headline: title,
    description: description,
    image: image,
    url: url,
    publisher: {
      "@type": "Organization",
      name: "Shamanicca",
      logo: {
        "@type": "ImageObject",
        url: "http://shamanicca.com/wp-content/uploads/2022/08/shamanicca-logo.jpg",
      },
    },
    author: {
      "@type": "Person",
      name: author,
    },
    ...(type === "article" && {
      datePublished: articlePublishedTime,
      dateModified: articleModifiedTime || articlePublishedTime,
      articleSection: category,
      keywords: tags.join(", "),
    }),
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags (for social media sharing) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Shamanicca Blog" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@shamanicca" />

      {/* Structured Data for better SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
