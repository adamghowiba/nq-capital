import Stack, { StackProps } from '@mui/material/Stack';
import { forwardRef } from 'react';
import { LiteralUnion } from 'type-fest';

export interface StackPropsExtended extends StackProps {
  w?: LiteralUnion<'full', string> | number;
  h?: LiteralUnion<'full', string> | number;
  align?: StackProps['alignItems'];
  justify?: StackProps['justifyContent'];
}

export const VStack = forwardRef<HTMLDivElement, StackPropsExtended>(
  ({ w, h, align, justify, direction, ...props }, ref) => {
    return (
      <Stack
        height={h === 'full' ? '100%' : h}
        width={w === 'full' ? '100%' : w}
        direction={direction ?? 'column'}
        alignItems={align}
        justifyContent={justify}
        ref={ref}
        {...props}
      />
    );
  }
);

VStack.displayName = 'VStackCustom';

export const HStack = forwardRef<HTMLDivElement, StackPropsExtended>(
  ({ w, h, align = 'center', justify, direction, ...props }, ref) => {
    return (
      <Stack
        height={h === 'full' ? '100%' : h}
        width={w === 'full' ? '100%' : w}
        alignItems={align}
        justifyContent={justify}
        direction={direction ?? 'row'}
        ref={ref}
        {...props}
      />
    );
  }
);

HStack.displayName = 'HStackCustom';
