import { Box, Typography } from '@mui/material';
import Logo from '../../../../lib/components/Logo/logo';

export interface AuthHeaderProps {
  title: string;
}

export default function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <Box sx={{ display: 'grid', justifyItems: 'center', rowGap: 2 }}>
      <Logo />

      <Typography variant="h2" color="#8D8D8D" fontWeight={500}>
        {title}
      </Typography>
    </Box>
  );
}
