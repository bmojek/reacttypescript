import { AlbumType } from "../types/Album.type";
import { PhotoType } from "../types/Photo.type";
import Photo from "./Photo";

const Album = ({
  album,
  photos,
}: {
  album: AlbumType;
  photos: PhotoType[];
}) => (
  <div className="Album">
    <a href="">
      <h4>{album.title}</h4>
      {photos.slice(0, 12).map((photo: PhotoType, index) => (
        <Photo key={index} photo={photo} />
      ))}
    </a>
  </div>
);

export default Album;
