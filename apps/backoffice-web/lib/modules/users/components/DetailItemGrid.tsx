import { Unstable_Grid2 as Grid, Grid2Props } from '@mui/material';
import { HStack } from '@nq-capital/nui';
import React, { FC } from 'react';

export interface DetailItemGridProps extends Grid2Props {
  size?: number;
}

export const DetailItemGrid: FC<DetailItemGridProps> = ({
  size = 12,
  ...props
}) => {
  return (
    <Grid
      mobile={size}
      component={HStack}
      justify="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="#F1F1F1"
      sx={{ '&:last-child': { borderBottom: 'none' } }}
      {...props}
    >
      {props.children}
    </Grid>
  );
};
