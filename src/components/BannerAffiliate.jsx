// BannerAffiliate.js
const BannerAffiliate = ({ categoryId, postId }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners(categoryId, postId).then((response) => {
      setBanners(response.data);
    });
  }, [categoryId, postId]);

  return banners.map((banner) => (
    <div className="banner">
      <img src={banner.image} alt={banner.title} />
      <a href={banner.affiliate_url}>{banner.cta_text}</a>
    </div>
  ));
};
