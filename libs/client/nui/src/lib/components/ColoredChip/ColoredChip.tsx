import { Chip, ChipProps } from '@mui/material';
import { FC } from 'react';

export type ChipColorSchema =
  | 'red'
  | 'green'
  | 'blue'
  | 'neutral'
  | 'yellow'
  | 'purple'
  | 'orange';

export interface ColoredChipProps extends ChipProps {
  colorSchema?: ChipColorSchema;
}

export const CHIP_COLOR_MAP: Record<
  ChipColorSchema,
  { bgColor: string; color: string }
> = {
  green: {
    color: '#3D9A50',
    bgColor: 'rgba(2, 179, 2, 0.08)',
  },
  red: {
    color: '#D93D42',
    bgColor: 'rgba(255, 1, 1, 0.06)',
  },
  blue: {
    color: '#3A5CCC',
    bgColor: 'rgba(1, 68, 255, 0.06)',
  },
  yellow: {
    color: '#FFC107',
    bgColor: 'rgba(255, 193, 7, 0.06)',
  },
  orange: {
    color: '#FF8C00',
    bgColor: 'rgba(255, 140, 0, 0.06)',
  },
  neutral: {
    color: '#646464',
    bgColor: '#F9F9F9',
  },
  purple: {
    color: '#3A5CCC',
    bgColor: 'rgba(1, 68, 255, 0.06)',
  },
};

export const ColoredChip: FC<ColoredChipProps> = ({
  colorSchema = 'neutral',
  ...props
}) => {
  const typeColor = CHIP_COLOR_MAP[colorSchema];

  return (
    <Chip
      size="small"
      {...props}
      sx={{
        color: typeColor.color,
        backgroundColor: typeColor.bgColor,
        ...props?.sx,
      }}
    />
  );
};
