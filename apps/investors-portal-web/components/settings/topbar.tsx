import back from '@iconify/icons-fluent/arrow-left-24-filled';
import { Icon } from '@iconify/react';
import { Box, IconButton, Typography } from '@mui/material';
import DContainer from '../DContainer/DContainer';

interface SettingsTopbarProps {
  handleBack: () => void;
}
export default function SettingsTopbar({ handleBack }: SettingsTopbarProps) {
  return (
    <Box width="100%" height="56px">
      <DContainer
        sx={{ height: '100%', display: 'grid', alignItems: 'center' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            columnGap: 2,
          }}
        >
          <IconButton size="small" onClick={handleBack}>
            <Icon icon={back} color="#8D8D8D" fontSize={24} />
          </IconButton>
          <Typography sx={{ color: '#8D8D8D' }}>Back</Typography>
        </Box>
      </DContainer>
    </Box>
  );
}
