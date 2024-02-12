import { DataGrid, DataGridProps, GridValidRowModel } from '@mui/x-data-grid';
import { useRef } from 'react';
import Box from '../Box/Box';

export interface CustomDataGridProps<R extends GridValidRowModel = any>
  extends DataGridProps<R> {}

const CustomDataGrid = async <R extends GridValidRowModel = any>({
  ...props
}: CustomDataGridProps<R>) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box ref={toolbarRef}></Box>

      <DataGrid
        classes={{
          columnHeaders: 'Mui-dg-header',
        }}
        {...props}
      />
    </>
  );
};

export default CustomDataGrid;
