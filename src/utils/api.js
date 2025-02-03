// api.js
import axios from 'axios';

const API_BASE_URL = 'https://shamanicca.local/wp-json';
const PLACEHOLDER_IMAGE_ID = 257; // ID of the placeholder image

export const fetchPosts = (page = 1) =>
  axios.get(`${API_BASE_URL}/wp/v2/posts?_embed`, {
    params: { page, per_page: 9 }, // Fetch 4 posts per page
});
export const fetchPostById = (id) => axios.get(`${API_BASE_URL}/wp/v2/posts/${id}?_embed`);


// Fetch the URL of the placeholder image
export const fetchPlaceholderImage = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/media/${PLACEHOLDER_IMAGE_ID}`);
    const { media_details } = response.data;
    return {
      thumbnail: media_details.sizes.thumbnail.source_url,
      medium: media_details.sizes.medium.source_url,
      large: media_details.sizes.large.source_url,
      full: response.data.source_url, // Full size
    };
  } catch (error) {
    console.error("Error fetching placeholder image:", error);
    // Fallback to a static URL if API call fails
    //return "/img/img-placeholder-120x120.jpg";
  }
};

// Helper function to extract the featured image URL
const getFeaturedImageUrl = (post) => {
  if (
    post._embedded &&
    post._embedded['wp:featuredmedia'] &&
    post._embedded['wp:featuredmedia'][0] &&
    post._embedded['wp:featuredmedia'][0].source_url
  ) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null; // Fallback if no featured image is available
};

  // Fetch categories. Used in Menu.jsx
  export const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/wp/v2/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

// Fetch posts by category ID. . Used in SideBar.jsx
export const fetchPostsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/posts?_embed`, {
      params: {
        categories: categoryId, // Use category ID
        per_page: 3, // Fetch only 3 posts
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    return [];
  }
};

export const fetchPostsByCategorySlug = async (slug, page = 1) => {
  try {
    // Fetch category to get its ID
    const categoryResponse = await axios.get(`${API_BASE_URL}/wp/v2/categories`, {
      params: { slug },
    });
    const category = categoryResponse.data[0];

    // Use the category ID to fetch posts
    const postsResponse = await axios.get(`${API_BASE_URL}/wp/v2/posts?_embed`, {
      params: { categories: category.id, per_page: 6, page },
    });

    return {
      posts: postsResponse.data,
      totalPages: parseInt(postsResponse.headers["x-wp-totalpages"], 10),
      categoryName: category.name,
      categoryDescription: category.description, // Category description

    };
  } catch (error) {
    console.error(`Error fetching posts for category slug: ${slug}`, error);
    throw error;
  }
};


// Fetch the home banner (Post ID: 130)
export const fetchHomeBanner = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/pages/130?_embed`);
    //console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching home banner:", error);
    return null;
  }
};

// Fetch the latest post for the hero article
export const fetchHeroArticle = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/posts?_embed`, {
      params: { per_page: 1 },
    });
    const post = response.data[0];
    if (post) {
      return {
        ...post,
        featuredImage: getFeaturedImageUrl(post), // Ensure featuredImage is set
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching hero article:", error); // Log errors
    return null;
  }
};

// Fetch the 2nd to 13th latest posts
export const fetchFirstPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/posts?_embed`, {
      params: { per_page: 14, offset: 1 }, // Skip the first post
    });
    return response.data.map((post) => ({
      ...post,
      featuredImage: getFeaturedImageUrl(post),
    }));
  } catch (error) {
    console.error("Error fetching first posts:", error);
    return [];
  }
};

// Fetch affiliate banners using ACF fields
export const fetchAdBannerData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/affiliates`, {
      params: { per_page: 1 }, // Fetch only one banner for simplicity
    });
    const ad = response.data[0];
    if (ad) {
      const featuredImage = getFeaturedImageUrl(ad);
      return {
        title: ad.acf.title,
        tagText: ad.acf.tag_text,
        image: featuredImage || ad.acf.image,
        ctaText: ad.acf.cta_text,
        url: ad.acf.affiliate_url,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching affiliate banner:", error);
    return null;
  }
};

// Fetch the link to the all-posts page
export const fetchAllPostPageLink = async () => {
  try {
    // Assuming a custom endpoint or hardcoded link
    return "/articles";
  } catch (error) {
    console.error("Error fetching all posts page link:", error);
    return null;
  }
};


// Article Template
// fetch Article post in Article.jsx
export const fetchPostBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/posts`, {
      params: { slug, _embed: true },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
};

export const fetchPageBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/pages`, {
      params: { slug, _embed: true },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
};


// Fetch Search Results in  in SearchResults.jsx
export const fetchSearchResults = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wp/v2/posts`, {
      params: {
        search: query,
        page,
        per_page: 6, // Adjust as needed
        _embed: true,
      },
    });

    return {
      posts: response.data,
      totalPages: parseInt(response.headers["x-wp-totalpages"], 10) || 1,
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
