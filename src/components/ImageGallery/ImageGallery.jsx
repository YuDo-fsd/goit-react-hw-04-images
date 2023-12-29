import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { ImageList } from './ImageGallery.styled';

export default function ImageGallery({ images, openModalWindow }) {
  return (
    <ImageList>
      {images.map(({ webformatURL, tags, largeImageURL, id }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            openModalWindow={openModalWindow}
          />
        );
      })}
    </ImageList>
  );
}
