import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AlbumType } from "../types/Album.type";
import { PhotoType } from "../types/Photo.type";
import Photo from "./Photo";

interface AlbumProps {
  album: AlbumType;
  photos: PhotoType[];
}

const Album: FC<AlbumProps> = ({ album, photos }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/Album/${album.id}`, { state: { photos } });
  };

  return (
    <div className="Album">
      <div onClick={handleOnClick} style={{ cursor: "pointer" }}>
        <h4>{album.title}</h4>
        {photos.slice(0, 12).map((photo: PhotoType, index) => (
          <Photo key={index} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Album;
