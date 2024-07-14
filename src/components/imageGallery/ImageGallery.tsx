import { ImgProps, ImageGalleryProps } from '../../types';
import React, { FC } from 'react';
import ImageCard from '../imageCard/ImageCard'
import css from './ImageGallery.module.css'

const ImageGallery: FC<ImageGalleryProps> = ({ data, onClick, onId }) => {
  return (
    <ul className={css.list}>
      {data.map((item: ImgProps) => (
        <li key={item.id} className={css.item}>
          <ImageCard data={item} onClick={onClick} onId={onId} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;