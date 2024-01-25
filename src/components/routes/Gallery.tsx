import React, { useState } from "react";
import "../style/Gallery.css";
import { useApiContext } from "../contexts/ApiContext";
import Album from "../common/Album";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Gallery = () => {
  const { photos, albums, setAlbums } = useApiContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inputAlbum, setInputAlbum] = useState("");
  const [showUserAlbums, setShowUserAlbums] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const userAlbums = albums.filter((album) => album.userId === user?.id);

  const photosByAlbumId = userAlbums.map((album) => ({
    album,
    photos: photos.filter((photo) => photo.albumId === album.id),
  }));

  const handleMyAlbums = (myAlbum: boolean) => {
    setShowUserAlbums(myAlbum);
  };
  const handleAddAlbum = () => {
    if (user && inputAlbum !== "") {
      const newAlbums = [
        ...albums,
        { id: albums.length + 1, title: inputAlbum, userId: user.id },
      ];
      setShowAddButton(false);
      setAlbums(newAlbums);
      setInputAlbum("");
    } else {
      console.error("User is not defined. Unable to add album.");
    }
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
        <button
          onClick={() => {
            setShowAddButton(!showAddButton);
          }}
        >
          Dodaj album
        </button>
        {showAddButton && (
          <div className="addAlbum">
            <input
              value={inputAlbum}
              onChange={(e) => setInputAlbum(e.target.value)}
              type="text"
              placeholder="Podaj nazwe albumu"
            ></input>
            <button onClick={handleAddAlbum}>Dodaj</button>
          </div>
        )}
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
