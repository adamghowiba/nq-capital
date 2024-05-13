import {
  DataGrid,
  DataGridProps,
  GridRowSelectionModel,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { FC, ReactNode, useRef, useState } from 'react';
import { Box } from '../Box/Box';
import { HStack } from '../Stack/Stack';

export type RenderSelectedActionsHandler = (params: {
  selectedRows: GridRowSelectionModel;
}) => ReactNode;

export interface CustomToolbarProps
  extends Pick<CustomDataGridProps, 'autoHideSelectActions'> {
  renderSelectActions?: RenderSelectedActionsHandler;
  selectedRows: GridRowSelectionModel;
}

const CustomToolbar: FC<CustomToolbarProps> = ({
  selectedRows,
  renderSelectActions,
  autoHideSelectActions = true,
  ...props
}) => {
  return (
    <GridToolbarContainer sx={{ alignItems: 'center' }}>
      <HStack ml="auto" gap={1}>
        {renderSelectActions &&
          (autoHideSelectActions ? !!selectedRows.length : true) &&
          renderSelectActions({ selectedRows })}
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      </HStack>
    </GridToolbarContainer>
  );
};

export interface CustomDataGridProps<R extends GridValidRowModel = any>
  extends DataGridProps<R> {
  title?: ReactNode;
  renderSelectActions?: RenderSelectedActionsHandler;
  /**
   * Auto hide select actions when no rows are selected
   * @default true
   */
  autoHideSelectActions?: boolean;
}

export const CustomDataGrid = <R extends GridValidRowModel = any>({
  title,
  autoHideSelectActions = true,
  ...props
}: CustomDataGridProps<R>) => {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
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
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            renderSelectActions: props.renderSelectActions,
            selectedRows: selectedRows,
            autoHideSelectActions,
          } as CustomToolbarProps,
        }}
        sx={{
          '& .MuiDataGrid-withBorderColor': {
            borderColor: '#F0F0F0',
          },
        }}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(selectionModel, details) => {
          setSelectedRows(selectionModel);
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
