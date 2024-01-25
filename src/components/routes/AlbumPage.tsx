import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PhotoType } from "../types/Photo.type";
import { UserType } from "../types/User.type";
import { useApiContext } from "../contexts/ApiContext";
import "../style/AlbumPage.css";
import { useAuth } from "../contexts/AuthContext";

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { photos, albums, users, setPhotos } = useApiContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useAuth();
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
  const isCurrentUserAlbum = albumOwner && albumOwner.id === user?.id;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const newPhoto: PhotoType = {
      albumId: selectedAlbum.id,
      id: photos.length + 1,
      title: "New Photo",
      url: URL.createObjectURL(selectedFile),
      thumbnailUrl: URL.createObjectURL(selectedFile),
    };

    setPhotos([...photos, newPhoto]);
    setSelectedFile(null);
  };

  return (
    <div className="album-container">
      <p>
        Album Użytkownika: {albumOwner ? albumOwner.username : "Unknown User"}
      </p>
      <h2>Nazwa albumu: {selectedAlbum.title}</h2>
      {isCurrentUserAlbum && ( // Conditionally render upload container
        <div className="upload-container">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!selectedFile}>
            Dodaj zdjęcie
          </button>
        </div>
      )}
      <div>
        {selectedAlbumPhotos.map((photo: PhotoType, index) => (
          <img key={index} src={photo.url} alt={`${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
