import { theme } from '@airhublabs/client/shared/ui-amui';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import {
  Button,
  Portal,
  Tooltip
} from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { FC } from 'react';
import { CustomFilterModel } from '../../hooks/use-grid-filter';
import { HStack } from '../Stack/Stack';
import ColumnFilter, { ColumnFilterProps } from './ColumnFilter';

interface CustomToolbarProps {
  floating?: boolean;
  columnFilters?: ColumnFilterProps[];
  anchorRef: HTMLElement;
  customFilterModel?: CustomFilterModel;
}

const CustomToolbar: FC<CustomToolbarProps> = ({
  floating,
  columnFilters,
  anchorRef,
  customFilterModel,
  ...props
}) => {
  return (
    <Portal container={anchorRef}>
      <GridToolbarContainer
        sx={{
          border: 'none',
        }}
      >
        <HStack
          spacing={0.5}
          p={1}
          px={0}
          justify="space-between"
          w="full"
          align="center"
        >
          <HStack align="center" gap={1}>
            {columnFilters?.map((filter) => (
              // @ts-expect-error TODO: Fix Lazy ts ignore
              <ColumnFilter
                key={filter.column as string}
                {...customFilterModel}
                {...filter}
              />
            ))}
            <GridToolbarFilterButton />
          </HStack>

          <HStack align="center" gap="0.5rem">
            <GridToolbarQuickFilter
              variant="outlined"
              placeholder="Search for a part"
              sx={{
                margin: 0,
                padding: 0,
              }}
              InputProps={{
                size: 'small',
                endAdornment: (
                  <SearchOutlined
                    sx={{ color: 'GrayText', width: 20, height: 20 }}
                  />
                ),
                sx: {
                  maxWidth: '200px',
                  fontSize: '14px',
                  bgcolor: '#FBFBFC',
                  '& ::placeholder': {
                    color: theme.palette.grey[500],
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E5E7EB',
                  },
                },
              }}
            />

            <Tooltip title="Export is currently disabled">
              <Button variant="outlined">Export to CSV</Button>
            </Tooltip>
          </HStack>
        </HStack>
      </GridToolbarContainer>
    </Portal>
  );
};

export default CustomToolbar;
