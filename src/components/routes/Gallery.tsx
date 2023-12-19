import "../style/Gallery.css";
import { AlbumType } from "../types/Album.type";
import { useApiContext } from "../contexts/ApiContext";
import Album from "../common/Album";
import { PhotoType } from "../types/Photo.type";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Gallery = () => {
  const { photos, albums } = useApiContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const photosByAlbumId = albums.map((album: AlbumType) => ({
    album,
    photos: photos.filter((photo: PhotoType) => photo.albumId === album.id),
  }));

  return (
    <>
      <div className={`LoginLink ${user ? "display" : ""}`}>
        <p>Zaloguj się żeby zobaczyć Albumy</p>
        <button onClick={() => navigate("../Login")}>Logowanie</button>
      </div>
      <div className={`Gallery ${user ? "" : "blur"}`}>
        <h3>Albumy</h3>
        <hr />
        {photosByAlbumId.map(
          (
            { album, photos }: { album: AlbumType; photos: PhotoType[] },
            index
          ) => (
            <Album key={index} album={album} photos={photos} />
          )
        )}
      </div>
    </>
  );
};
