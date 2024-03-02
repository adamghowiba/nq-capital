import searchIcon from '@iconify/icons-fluent/search-24-regular';
import { Icon } from '@iconify/react';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TopbarSearchProps {}

const TopbarSearch: FC<TopbarSearchProps> = ({ ...props }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <TextField
        placeholder="Search tickets..."
        size="small"
        sx={{
          bgcolor: 'white',
          '&.MuiFormControl-root': {
            backgroundColor: 'transparent',
          },
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                icon={searchIcon}
                fontSize={20}
                style={{ color: 'var(--neutral-400)' }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Typography color="var(--neutral-400)" variant="caption">
                ⌘K
              </Typography>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default TopbarSearch;
