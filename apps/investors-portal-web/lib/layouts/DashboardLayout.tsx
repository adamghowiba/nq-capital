import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { ReactNode } from 'react';
import Topbar from '../components/Topbar/Topbar';
import Navbar from '../components/Navbar/Navbar';

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
