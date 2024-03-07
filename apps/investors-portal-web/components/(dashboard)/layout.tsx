import { Box, CssBaseline } from '@mui/material';
import { ReactNode, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Topbar from '../Topbar/Topbar';
import SettingsDialog from '../settings';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <SettingsDialog
        closeDialog={() => setIsSettingsDialogOpen(false)}
        isDialogOpen={isSettingsDialogOpen}
      />
      <Box
        sx={{
          height: '100svh',
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr',
        }}
      >
        <Topbar openSettings={() => setIsSettingsDialogOpen(true)} />
        <Navbar />
        <CssBaseline />
        <Box>{children}</Box>
      </Box>
    </>
  );
}
