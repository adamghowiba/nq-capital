import { DataGrid, DataGridProps, GridValidRowModel } from '@mui/x-data-grid';
import { ReactNode, useRef } from 'react';
import Box from '../Box/Box';

export interface CustomDataGridProps<R extends GridValidRowModel = any>
  extends DataGridProps<R> {
  title?: ReactNode;
}

const CustomDataGrid = <R extends GridValidRowModel = any>({
  title,
  ...props
}: CustomDataGridProps<R>) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {title && (
        <Box fontSize="24px" mb={1}>
          {title}
        </Box>
      )}

      <Box ref={toolbarRef}></Box>

      <DataGrid
        classes={{
          columnHeaders: 'Mui-dg-header',
        }}
        sx={{
          '& .MuiDataGrid-withBorderColor': {
            borderColor: '#F0F0F0',
          },
        }}
        style={{
          border: 'none',
          color: '#333333',
          ...props?.style,
        }}
        {...props}
      />
    </>
  );
};

export default CustomDataGrid;
