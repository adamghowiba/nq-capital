'use client';

import Box from '../../components/Box/Box';
import DContainer from '../../components/DContainer/DContainer';
import CustomDataGrid from '../../components/StyledDataGrid/CustomDataGrid';

export default function Index() {
  return (
    <>
      <DContainer my={5}>
        <Box h="60vh">
          <CustomDataGrid rows={[]} columns={[{ field: 'id' }]} />
        </Box>
      </DContainer>
    </>
  );
}
