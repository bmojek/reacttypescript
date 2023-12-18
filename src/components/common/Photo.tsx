import React, { FC } from "react";
import { PhotoType } from "../types/Photo.type";

interface Props {
  photo: PhotoType;
}

const Photo: FC<Props> = ({ photo }) => {
  return <img src={photo.thumbnailUrl} alt={photo.title} />;
};

export default Photo;
