import { Box, Typography } from '@mui/material';

export interface StepHeaderProps {
  title: string;
  subtitle: string;
  gap?: number;
}
export default function StepHeader({
  title,
  subtitle,
  gap = 2,
}: StepHeaderProps) {
  return (
    <Box sx={{ display: 'grid', rowGap: 1 }}>
      <Typography variant="h2" color="#202020" fontWeight={500}>
        {title}
      </Typography>
      <Typography variant="h5" color="#8D8D8D">
        {subtitle}
      </Typography>
    </Box>
  );
}
