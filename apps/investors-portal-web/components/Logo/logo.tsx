import { Box, Typography } from '@mui/material';

export default function Logo() {
  return (
    <Box
      bgcolor="black"
      borderRadius="8px"
      width="36px"
      height="32px"
      sx={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography color="white" fontSize="14px" fontWeight="500" lineHeight="1">
        NQ
      </Typography>
    </Box>
  );
}
