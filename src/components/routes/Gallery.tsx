import React, { useState } from "react";
import "../style/Gallery.css";
import { useApiContext } from "../contexts/ApiContext";
import Album from "../common/Album";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Gallery = () => {
  const { photos, albums } = useApiContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUserAlbums, setShowUserAlbums] = useState(false);

  const userAlbums = albums.filter((album) => album.userId === user?.id);

  const photosByAlbumId = userAlbums.map((album) => ({
    album,
    photos: photos.filter((photo) => photo.albumId === album.id),
  }));

  const handleMyAlbums = (myAlbum: boolean) => {
    setShowUserAlbums(myAlbum);
  };

  return (
    <>
      <div className={`LoginLink ${user ? "display" : ""}`}>
        <p>Zaloguj się żeby zobaczyć Albumy</p>
        <button onClick={() => navigate("../Login")}>Logowanie</button>
      </div>

      <div className={`Gallery ${user ? "" : "blur"}`}>
        <h3>Albumy</h3>
        <button onClick={() => handleMyAlbums(true)}>Moje Albumy</button>
        <button onClick={() => handleMyAlbums(false)}>Wszystkie Albumy</button>
        <hr />
        {showUserAlbums &&
          photosByAlbumId.map(({ album, photos }) => (
            <Album key={album.id} album={album} photos={photos} />
          ))}
        {!showUserAlbums &&
          albums.map((album) => (
            <Album
              key={album.id}
              album={album}
              photos={photos.filter((photo) => photo.albumId === album.id)}
            />
          ))}
      </div>
    </>
  );
};
