import { twMerge } from 'lib/utils/twMerge';

import { Typography } from '@/components/typography/typography';

import { TitleProps } from './title.types';

export const Title = ({ className, text, ...props }: TitleProps) => {
  return (
    <Typography
      type="span"
      className={twMerge('text-xs text-[#FFF]', className)}
      text={text}
      {...props}
    />
  );
};
