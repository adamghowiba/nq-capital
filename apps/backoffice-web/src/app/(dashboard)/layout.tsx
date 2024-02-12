import { Box, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import Topbar from '../../lib/components/Topbar/Topbar';
import Navbar from '../../lib/components/Navbar/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <Navbar />
      <CssBaseline />
      <Box>{children}</Box>
    </>
  );
}
