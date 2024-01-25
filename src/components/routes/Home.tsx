import React from "react";
import Slider from "react-slick";
import { useApiContext } from "../contexts/ApiContext";
import { PostType } from "../types/Post.type";
import { PhotoType } from "../types/Photo.type";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home: React.FC = () => {
  const { photos, posts } = useApiContext();
  const navigate = useNavigate();
  const latestPosts = posts.slice(0, 3).reverse();

  const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
  };
  const handleOnClick = () => {
    navigate("/Posts");
  };
  const handleOnClickGallery = () => {
    navigate("/Gallery");
  };
  return (
    <div className="home-container">
      <div className="photo-carousel">
        <h3>Najnowsze zdjecia</h3>
        <Slider {...slickSettings}>
          {photos.slice(0, 10).map((photo: PhotoType) => (
            <div key={photo.id} className="carousel-item">
              <img src={photo.url} alt={photo.title} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="latest-posts" onClick={handleOnClick}>
        <h3>Najnowsze posty</h3>
        {latestPosts.map((post: PostType) => (
          <div key={post.id} className="post-item">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div className="latest-albums" onClick={handleOnClickGallery}>
        <h3>Najnowsze albumy</h3>
        {photos.slice(0, 8).map((photo: PhotoType) => (
          <img key={photo.id} src={photo.url} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Home;
