import React from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  url,
  tags,
  largeImageURL,
  openModalWindow,
}) {
  const newModalData = {
    largeImageUrl: largeImageURL,
    altName: tags,
  };

  return (
    <GalleryItem onClick={() => openModalWindow(newModalData)}>
      <GalleryImage src={url} alt={tags} />
    </GalleryItem>
  );
}
