'use client';
import { DataGrid } from '@mui/x-data-grid';
import { FC } from 'react';


const Test: FC<any> = ({users, ...props }) => {
  return (
    <>
      <DataGrid
        columns={[
          { field: 'id', headerName: 'ID' },
          { field: 'email', headerName: 'email' },
        ]}
        rows={users}
      />
    </>
  );
};

export default Test;
