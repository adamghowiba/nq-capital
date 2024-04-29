import { Chip, ChipProps } from '@mui/material';
import { FC } from 'react';
import { TransactionType } from '../../gql/gql-client';

export interface TransactionTypeChipProps extends Omit<ChipProps, 'label'> {
  label: TransactionType;
}

const TYPE_COLOR_MAP: Record<
  TransactionType,
  { bgColor: string; color: string }
> = {
  DEPOSIT: {
    color: '#3D9A50',
    bgColor: 'rgba(2, 179, 2, 0.08)',
  },
  WITHDRAWAL: {
    color: '#D93D42',
    bgColor: 'rgba(255, 1, 1, 0.06)',
  },
  ADJUSTMENT: {
    color: '#3A5CCC',
    bgColor: 'rgba(1, 68, 255, 0.06)',
  },
  FEE: {
    color: '#3D9A50',
    bgColor: 'rgba(2, 179, 2, 0.08)',
  },
  REFUND: {
    color: '#3D9A50',
    bgColor: 'rgba(2, 179, 2, 0.08)',
  },
};

const TransactionTypeChip: FC<TransactionTypeChipProps> = ({ ...props }) => {
  const typeColor = TYPE_COLOR_MAP[props.label];

  return (
    <>
      <Chip
        size="small"
        sx={{
          color: typeColor.color,
          backgroundColor: typeColor.bgColor,
        }}
        {...props}
      />
    </>
  );
};

export default TransactionTypeChip;
