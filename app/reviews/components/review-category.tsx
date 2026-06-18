import { View } from 'react-native';

import { StarRating } from '@/components/star-rating/start-rating';
import { Typography } from '@/components/typography/typography';

interface ReviewCategoryProps {
  title: string;
  question: string;
  rating: number;
  onChange: (rating: number) => void;
}

export const ReviewCategory = ({
  title,
  question,
  rating,
  onChange,
}: ReviewCategoryProps) => {
  return (
    <View className="gap-2">
      <Typography
        type="span"
        text={title}
        className="font-plus-jakarta-semi-bold text-lg color-[#354259]"
      />
      <Typography type="p" text={question} className="font-poppins text-sm" />
      <StarRating rating={rating} onChange={onChange} />
    </View>
  );
};
