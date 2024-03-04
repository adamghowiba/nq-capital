import { Box, Typography } from '@mui/material';

export interface StepHeaderProps {
  title: string;
  subtitle: string;
}
export default function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <Box sx={{ display: 'grid', rowGap: 2 }}>
      <Typography variant="h2" color="#202020" fontWeight={500}>
        {title}
      </Typography>
      <Typography variant="h5" color="#8D8D8D">
        {subtitle}
      </Typography>
    </Box>
  );
}
