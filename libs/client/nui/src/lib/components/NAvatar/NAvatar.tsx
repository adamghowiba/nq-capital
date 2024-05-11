import { Avatar, AvatarProps } from '@mui/material';
import React, { FC } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface NAvatarProps extends Omit<AvatarProps, 'size'> {
  /**
   * @default "md"
   */
  size?: AvatarSize;
}

export const NAvatar: FC<NAvatarProps> = ({
  size = 'md',
  children,
  ...props
}) => {
  const AVATAR_SIZE_MAP: Record<
    AvatarSize,
    {
      width: string | number;
      height: string | number;
      fontSize?: string | number;
    }
  > = {
    xs: { width: '22px', height: '22px' },
    sm: { width: '28px', height: '28px', fontSize: '13px' },
    md: { width: '32px', height: '32px', fontSize: '16px' },
    lg: { width: '40px', height: '40px' },
    xl: { width: '56px', height: '56px' },
  };

  const sizeDimensions = AVATAR_SIZE_MAP[size];

  return (
    <Avatar
      {...props}
      sx={{
        ...sizeDimensions,
        bgcolor: '#F1F1F1',
        color: '#8D8D8D',
        cursor: props.onClick ? 'pointer' : undefined,
        ...props.sx,
      }}
    >
      {' '}
      {children}{' '}
    </Avatar>
  );
};
