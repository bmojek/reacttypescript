import React from "react";
import Slider from "react-slick";
import { useApiContext } from "../contexts/ApiContext";
import { PhotoType } from "../types/Photo.type";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Album from "../common/Album";
import { MergedPostType } from "../types/MergedPost.type";
import { UserType } from "../types/User.type";

const Home: React.FC = () => {
  const { photos, posts, albums, users, comments } = useApiContext();
  const navigate = useNavigate();

  const shuffleArray = <T extends any[]>(array: T): T => {
    const shuffled = [...array] as T;
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const mergePostsUsers = (): MergedPostType[] => {
    return posts.map((post) => {
      const user = users.find((u) => u.id === post.userId);
      const postComments = comments.filter(
        (comment) => comment.postId === post.id
      );
      return {
        ...post,
        user: user || ({} as UserType),
        comments: postComments || [],
      };
    });
  };

  const randomPosts = shuffleArray(mergePostsUsers()).slice(0, 4);

  const randomAlbums = shuffleArray(albums).slice(0, 6);

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

  const handleOnClick = (goto: boolean) => {
    goto ? navigate("/Posts") : navigate("/Gallery");
  };

  return (
    <div className="home-container">
      <div className="photo-carousel">
        <h3>Najnowsze zdjęcia</h3>
        <Slider {...slickSettings}>
          {photos.slice(0, 10).map((photo: PhotoType) => (
            <div key={photo.id} className="carousel-item">
              <img src={photo.url} alt={photo.title} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="latest">
        <div className="latest-posts" onClick={() => handleOnClick(true)}>
          <h3>Losowe posty</h3>
          {randomPosts.map((post: MergedPostType) => (
            <div key={post.id} className="post-item">
              <h1>{post.user.username}</h1>
              <h2>{post.body}</h2>
            </div>
          ))}
        </div>
        <div className="latest-albums" onClick={() => handleOnClick(false)}>
          <h3>Losowe albumy</h3>
          {randomAlbums.map((album) => (
            <Album
              key={album.id}
              album={album}
              photos={photos.filter((photo) => photo.albumId === album.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
