import { Stack, StackProps } from '@mui/material';
import { FC } from 'react';

export interface AuthLayoutProps extends StackProps {}

export const AuthLayout: FC<AuthLayoutProps> = ({ ...props }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      bgcolor="#FCFCFC"
      height="100vh"
      {...props}
    >
      {/* <AuthHeader title="Welcom back to NQ" /> */}

      {props.children}
    </Stack>
  );
};
