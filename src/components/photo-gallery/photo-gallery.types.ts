import { ImageSourcePropType } from 'react-native';

export interface PhotoGalleryProps {
  photos: ImageSourcePropType[];
  title?: string;
  visibleCount?: number;
}
