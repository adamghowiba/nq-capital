import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Topbar from '../Topbar/Topbar';

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
      <CssBaseline />
      <Box>{children}</Box>
    </Box>
  );
}
