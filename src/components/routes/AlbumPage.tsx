import React from "react";
import { useParams } from "react-router-dom";
import { PhotoType } from "../types/Photo.type";
import { UserType } from "../types/User.type";
import { useApiContext } from "../contexts/ApiContext";
import "../style/AlbumPage.css";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { photos, albums, users } = useApiContext();

  const selectedAlbum = albums.find((album) => album.id === Number(albumId));

  if (!selectedAlbum) {
    return <div>Album not found</div>;
  }

  const selectedAlbumPhotos = photos.filter(
    (photo) => photo.albumId === selectedAlbum.id
  );

  const albumOwner: UserType | undefined = users.find(
    (user) => user.id === selectedAlbum.userId
  );

  return (
    <div className="album-container">
      <p>
        Album Użytkownika: {albumOwner ? albumOwner.username : "Unknown User"}
      </p>
      <h2>Nazwa albumu: {selectedAlbum.title}</h2>

      <div>
        {selectedAlbumPhotos.map((photo: PhotoType, index) => (
          <img key={index} src={photo.url} alt={`Photo ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
