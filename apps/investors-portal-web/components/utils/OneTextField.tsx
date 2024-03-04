import { Box, TextField, TextFieldProps, Typography } from '@mui/material';

interface OneTextFieldProps {
  OneLabel: string;
}

export type TextFieldPropsExtended = TextFieldProps & OneTextFieldProps;

export function OneTextField({
  OneLabel,
  error,
  ...props
}: TextFieldPropsExtended) {
  return (
    <Box sx={{ display: 'grid', rowGap: 1 }}>
      <Typography>{OneLabel}</Typography>
      <TextField {...props} />
    </Box>
  );
}
