import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface OneTextFieldProps {
  OneLabel: ReactNode;
}

export type TextFieldPropsExtended = TextFieldProps & OneTextFieldProps;

export function OneTextField({ OneLabel, ...props }: TextFieldPropsExtended) {
  return (
    <Box sx={{ display: 'grid', rowGap: 1 }}>
      <Typography>{OneLabel}</Typography>
      <TextField {...props} />
    </Box>
  );
}
