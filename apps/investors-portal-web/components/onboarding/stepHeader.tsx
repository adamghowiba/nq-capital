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
    <Box sx={{ display: 'grid', rowGap: gap }}>
      <Typography variant="h2" py={0} color="#202020" fontWeight={500}>
        {title}
      </Typography>
      <Typography variant="h5" py={0} color="#8D8D8D">
        {subtitle}
      </Typography>
    </Box>
  );
}
