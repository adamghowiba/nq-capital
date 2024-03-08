import { Box, Tab, Tabs, Typography } from '@mui/material';

interface SettingsHeaderProps {
  handleTabChange: (tabNumber: number) => void;
  activeTab: number;
}
export default function SettingsHeader({
  activeTab,
  handleTabChange,
}: SettingsHeaderProps) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #EBEBEB',
        display: 'grid',
        justifyItems: 'center',
        rowGap: 3,
        paddingTop: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 500,
          width: '604px',
          lineHeight: '32px',
          fontSize: '24px',
        }}
      >
        Settings
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, value) => handleTabChange(value)}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        sx={{ width: '604px' }}
      >
        <Tab value={1} label="General" />
        <Tab value={2} label="Notification" />
        <Tab value={3} label="Security" />
        <Tab value={4} label="Billing" />
      </Tabs>
    </Box>
  );
}
