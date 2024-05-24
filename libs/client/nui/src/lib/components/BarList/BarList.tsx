import React, { FC, useMemo } from 'react';
import { HStack, VStack } from '../Stack/Stack';
import { Typography, alpha } from '@mui/material';

type Bar<T> = T & {
  key?: string;
  href?: string;
  value: number;
  name: string;
};

export interface BarListProps<T = unknown> {
  data: Bar<T>[];
  color?: string;
  /**
   * Height of the bar
   * @default 40
   */
  barHeight?: number;
  /**
   * Alpha value for to lighten the color by a specific amount
   * Should be between 0-1
   * @default 0.1
   */
  colorAlphaValue?: number;
  valueFormatter?: (value: number) => string;
  onClickBar?: (payload: Bar<T>) => void;
  sortOrder?: 'ascending' | 'descending' | 'none';
}

export const BarList: FC<BarListProps> = ({
  data,
  valueFormatter,
  onClickBar,
  sortOrder = 'descending',
  color = '#5353CE',
  colorAlphaValue = 0.1,
  barHeight = 40,
  ...props
}) => {
  const colorBackground = useMemo(
    () => alpha(color, colorAlphaValue),
    [color, colorAlphaValue]
  );

  const sortedData = useMemo(() => {
    if (sortOrder === 'none') {
      return data;
    }
    return [...data].sort((a, b) => {
      return sortOrder === 'ascending' ? a.value - b.value : b.value - a.value;
    });
  }, [data, sortOrder]);

  const widths = useMemo(() => {
    const maxValue = Math.max(...sortedData.map((item) => item.value), 0);

    return sortedData.map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2)
    );
  }, [sortedData]);

  return (
    <HStack align="center" gap={2} justify="space-between">
      <VStack gap={1} flexGrow={1}>
        {sortedData.map((data, i) => (
          <HStack
            flexShrink={0}
            color={color}
            bgcolor={colorBackground}
            p={1}
            borderRadius={1}
            w={`${widths[i]}%`}
            key={data.key || data.name || i}
            h={`${barHeight}px`}
            onClick={() => onClickBar?.(data)}
          >
            {data.name}
          </HStack>
        ))}
      </VStack>

      <VStack gap={1}>
        {sortedData.map((data, i) => {
          return (
            <VStack
              key={data.key || data.name || i}
              align="end"
              justify="center"
              height={`${barHeight}px`}
            >
              <Typography>
                {valueFormatter ? valueFormatter(data.value) : data.value}
              </Typography>
            </VStack>
          );
        })}
      </VStack>
    </HStack>
  );
};
