import React, { FC } from "react";
import { PhotoType } from "../types/Photo.type";

interface Props {
  photo: PhotoType;
  index: number;
}

const Photo: FC<Props> = ({ photo, index }) => {
  return (
    <a href="/">
      <img src={photo.url} alt={photo.title} />
    </a>
  );
};

export default Photo;
