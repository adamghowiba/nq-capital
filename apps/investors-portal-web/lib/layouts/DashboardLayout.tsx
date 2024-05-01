import { Box, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Topbar from '../components/Topbar/Topbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        height: '100svh',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
      }}
    >
      <Topbar />
      <Navbar />
      <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
      <CssBaseline />
    </Box>
  );
}
