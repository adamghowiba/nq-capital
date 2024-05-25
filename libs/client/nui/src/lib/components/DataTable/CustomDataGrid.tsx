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
  extends Pick<CustomDataGridProps, 'autoHideSelectActions' | 'title'> {
  renderSelectActions?: RenderSelectedActionsHandler;
  selectedRows: GridRowSelectionModel;
}

const CustomToolbar: FC<CustomToolbarProps> = ({
  selectedRows,
  renderSelectActions,
  autoHideSelectActions = true,
  title,
  ...props
}) => {
  return (
    <GridToolbarContainer sx={{ alignItems: 'center' }}>
      <HStack gap={1} justify="space-between" w="full">
        {title && (
          <Box color="text.primary" fontSize="20px">
            {title}
          </Box>
        )}

        <HStack>
          {renderSelectActions &&
            (autoHideSelectActions ? !!selectedRows.length : true) &&
            renderSelectActions({ selectedRows })}
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
        </HStack>
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
      <HStack>
        {/* {title && (
          <Box fontSize="24px" mb={1}>
            {title}
          </Box>
        )} */}
        {/* <Box ref={toolbarRef}></Box> */}
      </HStack>

      <DataGrid
        classes={{
          columnHeaders: 'Mui-dg-header',
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        rowHeight={53}
        slotProps={{
          toolbar: {
            renderSelectActions: props.renderSelectActions,
            selectedRows: selectedRows,
            autoHideSelectActions,
            title: title as string,
          },
          baseCheckbox: {
            size: 'small',
            sx: {
              '&.MuiCheckbox-root.Mui-checked': {
                color: '#5B5BD6',
              },
            },
          },
        }}
        sx={{
          fontWeight: '400',
          '& .MuiDataGrid-withBorderColor': {
            borderColor: '#F0F0F0',
          },
          '.MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#FAFAFF',
          },
        }}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(selectionModel, details) => {
          setSelectedRows(selectionModel);
        }}
        style={{
          border: 'none',
          // color: '#333333',
          color: 'rgb(107, 114, 128)',
          ...props?.style,
        }}
        {...props}
      />
    </>
  );
};

declare module '@mui/x-data-grid' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ToolbarPropsOverrides extends CustomToolbarProps {}
}
