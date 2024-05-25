import { Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { StackPropsExtended } from '../Stack/Stack';

export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';
export interface DrawerContentProps
  extends PropsWithChildren,
    StackPropsExtended {
  /**
   * Floating drawers don't stick to the edges of the screen
   * but instead appear as if they're floating
   * @default true
   */
  isFloating?: boolean;
  /**
   * Size of the drawer
   * @default "medium"
   */
  size?: DrawerSize;
}

export const DrawerContent: FC<DrawerContentProps> = ({
  children,
  isFloating = true,
  size = 'md',
  ...props
}) => {
  const floatingMargin = 12;

  const SIZE_MAP: Record<DrawerSize, string | number> = {
    lg: '500px',
    md: '400px',
    sm: '300px',
    full: `calc(100vw - ${floatingMargin * 2}px)`,
  };

  return (
    <Stack
      bgcolor="white"
      height={`calc(100vh - ${floatingMargin * 2}px)`}
      width={SIZE_MAP[size]}
      m={isFloating ? `${floatingMargin}px` : 0}
      borderRadius={isFloating ? '12px' : 'unset'}
      sx={{
        transition: 'width 0.3s ease',
      }}
      {...props}
    >
      <Stack height="100%" width="100%" maxWidth="900px" mx="auto">{children}</Stack>
    </Stack>
  );
};

