import { Paper, PaperProps } from '@mui/material';
import { FC } from 'react';

export interface AuthPaperProps extends PaperProps {}

export const AuthPaper: FC<AuthPaperProps> = ({ sx, children, ...props }) => {
  return (
    <Paper
      sx={{
        width: '400px',
        padding: 3,
        boxShadow: '0px 0px 0px 1px #64646414, 0px 1px 2px 0px #6464641A',
        display: 'grid',
        rowGap: 3,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
