import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { queryClient } from '../api/query-client';
import { theme } from '@nq-capital/nui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<RootLayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-us">
            {children}

            <CssBaseline />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default RootLayout;
