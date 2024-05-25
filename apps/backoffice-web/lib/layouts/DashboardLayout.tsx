import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box } from '@nq-capital/nui';
import Topbar from '../components/Topbar/Topbar';
import { SCREEN_HEIGHT_CALC } from '../constants/size.constants';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        height: '100svh',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        bgcolor: '#F9F9F9',
      }}
    >
      <Sidebar />

      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: '#F9F9F9',
        }}
      >
        <Box
          sx={{
            margin: '8px',
            bgcolor: 'white',
            borderRadius: '12px',
            height: 'calc(100vh - 16px)',
            boxShadow: '0px 2px 4px 0px #EBEBEB, 0px 0px 0px 1px #EBEBEB',
          }}
        >
          <Topbar />

          <Box
            sx={{
              overflow: 'auto',
              scrollbarWidth: 'thin',
              height: SCREEN_HEIGHT_CALC,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
