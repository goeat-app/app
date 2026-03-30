import { Dimensions, FlatList, ImageSourcePropType } from 'react-native';
import { PhotoGalleryProps } from './photo-gallery.types';
import { useRef, useState } from 'react';

export const usePhotoGallery = ({
  photos,
  title,
  visibleCount,
}: PhotoGalleryProps) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightboxRef = useRef<FlatList<ImageSourcePropType>>(null);

  const photosVisible = photos.slice(0, visibleCount + 1);

  return {
    photosVisible,
    SCREEN_WIDTH,
    selectedIndex,
    setSelectedIndex,
    currentIndex,
    setCurrentIndex,
    lightboxRef,
  };
};
