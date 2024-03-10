import { Box, Tab, Tabs, Typography } from '@mui/material';
import { SettingsActiveTab } from '.';

interface SettingsHeaderProps {
  handleTabChange: (tabNumber: SettingsActiveTab) => void;
  activeTab: number;
  tabItems: ISettingsTabItem[];
}

export interface ISettingsTabItem {
  position: number;
  label: string;
}

export default function SettingsHeader({
  activeTab,
  handleTabChange,
  tabItems,
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
        {tabItems.map(({ label, position: pos }, index) => (
          <Tab value={pos} label={label} key={index} />
        ))}
      </Tabs>
    </Box>
  );
}
