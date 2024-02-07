import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import '../styles/global.css';

export const metadata = {
  title: 'Welcome to backoffice-web',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}