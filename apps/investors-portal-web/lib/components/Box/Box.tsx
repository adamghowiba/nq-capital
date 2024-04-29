import MUIBox, { BoxProps } from '@mui/material/Box';
import { CSSPseudoSelectorProps } from '@mui/system';
import { forwardRef } from 'react';

export interface BoxPropsExtended extends Omit<BoxProps, 'ref'> {
  w?: BoxProps['width'] | 'full' | 'min-content';
  h?: BoxProps['height'] | 'full' | 'min-content';
  _hover?: CSSPseudoSelectorProps[':hover'];
  _first?: CSSPseudoSelectorProps[':first'];
}

const Box = forwardRef<HTMLDivElement, BoxPropsExtended>(
  ({ w, h, _hover, _first, sx, ...props }, ref) => {
    return (
      <MUIBox
        height={h}
        width={w}
        {...props}
        sx={{
          ':hover': _hover,
          ':first': _first,
          ...sx,
        }}
        ref={ref}
      />
    );
  }
);

Box.displayName = 'CustomBox';

export default Box;
