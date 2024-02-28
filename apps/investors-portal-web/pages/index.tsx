import { Box, Button } from '@mui/material';
import DashboardLayout from '../components/(dashboard)/layout';

export function Index() {
  return (
    <DashboardLayout>
      <Box>
        <Button variant="contained" color="primary">
          Testing
        </Button>
      </Box>
    </DashboardLayout>
  );
}

export default Index;
