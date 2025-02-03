//  ArticleShareIcons.jsx
import React from "react";
import icoX from "../img/icon-twitter.svg";
import icoFb from "../img/icon-fb.svg";
import icoWhatsApp from "../img/icon-whatsapp.svg";
import icoTelegram from "../img/icon-telegram.svg";
import icoEmail from "../img/icon-email.svg";
import icoLink from "../img/icon-link.svg";

const ArticleShareIcons = ({ articleTitle, articleSlug }) => {
  const shareLinks = [
    {
      type: "text",
      content: ["Sharing", "Is", "Love"],
      className:
        "type-sansserif type-bold type-sz-caption-2 no-margin type-uppercase",
      spanClassName: "type-primary",
    },
    {
      type: "link",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${articleTitle} - ${articleSlug}`
      )}`,
      target: "_blank",
      title: "X",
      img: {
        alt: "Share on X",
        src: icoX,
      },
    },
    {
      type: "link",
      href: `https://www.facebook.com/share.php?u=${encodeURIComponent(
        articleSlug
      )}&t=${encodeURIComponent(articleTitle)}`,
      target: "_blank",
      title: "Facebook",
      img: {
        alt: "Share on Facebook",
        src: icoFb,
      },
    },
    {
      type: "link",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${articleTitle} ${articleSlug}`
      )}`,
      target: "_blank",
      title: "WhatsApp",
      img: {
        alt: "Share on WhatsApp",
        src: icoWhatsApp,
      },
    },
    {
      type: "link",
      href: `https://telegram.me/share/url?url=${encodeURIComponent(
        articleSlug
      )}&text=${encodeURIComponent(articleTitle)}`,
      target: "_blank",
      title: "Telegram",
      img: {
        alt: "Share on Telegram.me",
        src: icoTelegram,
      },
    },
    {
      type: "link",
      href: `mailto:?subject=${encodeURIComponent(
        articleTitle
      )}&body=${encodeURIComponent(articleSlug)}`,
      target: "_blank",
      title: "Email",
      img: {
        alt: "Share on Email",
        src: icoEmail,
      },
    },
    {
      type: "link",
      href: "#", // Use "#" instead of "javascript:void(0);"
      id: "copy_url_link",
      title: "Copy link",
      img: {
        alt: "Share Link",
        src: icoLink,
      },
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(articleSlug);

    // Select the li.tag element
    const tagElement = document.querySelector("li.tag");

    if (tagElement) {
      // Add the .display class
      tagElement.classList.add("display");

      // Remove the .display class after 1 second
      setTimeout(() => {
        tagElement.classList.remove("display");
      }, 500);
    }
  };

  return (
    <ul className="share_links margin-top-sm">
      {shareLinks.map((link, index) => {
        if (link.type === "text") {
          return (
            <li key={index}>
              <p className={link.className}>
                {link.content[0]}
                <br />
                {link.content[1]}{" "}
                <span className={link.spanClassName}>{link.content[2]}</span>
              </p>
            </li>
          );
        }

        if (link.type === "link") {
          return (
            <li key={index}>
              <a
                href={link.href}
                target={link.target}
                title={link.title}
                id={link.id || null}
                onClick={(e) => {
                  if (link.id === "copy_url_link") {
                    e.preventDefault(); // Prevent default link behavior
                    copyToClipboard(); // Copy link to clipboard
                  }
                }}
              >
                <img alt={link.img.alt} src={link.img.src} />
              </a>
            </li>
          );
        }

        return null;
      })}
      <li className="tag type-sansserif type-sz-caption-2 type-no-margin">
        URL Copied
      </li>
    </ul>
  );
};

export default ArticleShareIcons;
