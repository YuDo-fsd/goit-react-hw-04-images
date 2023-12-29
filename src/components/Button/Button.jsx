import React from 'react';
import { LoadButton } from './Button.styled';

export default function LoadMoreButton({ handleClick }) {
  return <LoadButton onClick={handleClick}>Load more</LoadButton>;
}
