'use client';
import { InputAdornment, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';

export interface TopbarSearchProps {}

const TopbarSearch: FC<TopbarSearchProps> = ({ ...props }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <TextField
        placeholder="Search order..."
        size="small"
        fullWidth
        sx={{
          bgcolor: 'white',
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <SearchRounded /> */}
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
