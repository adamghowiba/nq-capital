import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import DContainer from '../DContainer/DContainer';
import TopbarSearch from './TopbarSearch';

export interface TopbarProps {}

const Topbar: FC<TopbarProps> = ({ ...props }) => {
  return (
    <>
      <Box width="100%" bgcolor="#F9F9F9" height="56px">
        <DContainer height="100%" width="100%">
          <Grid container width="100%" height="100%" alignContent="center">
            <Grid item xs alignSelf="center">
              <Stack
                bgcolor="black"
                borderRadius="8px"
                width="36px"
                height="32px"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="white"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="1"
                >
                  AO
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs>
              <TopbarSearch />
            </Grid>

            <Grid
              item
              xs
              display="flex"
              justifyContent="end"
              alignItems="center"
              color="#8D8D8D"
            >
              {/* <IconButton sx={{ color: 'inherit' }}>
                <HelpIcon sx={{ width: ICON_SIZE }} />
              </IconButton> */}

              {/* <IconButton sx={{ color: 'inherit' }}>
                <NotificationsIcon sx={{ width: ICON_SIZE }} />
              </IconButton> */}

              {/* <IconButton sx={{ color: 'inherit' }}>
                <SettingsIcon sx={{ width: ICON_SIZE }} />
              </IconButton> */}

              {/* <Tooltip title={user?.user?.email}>
                <IconButton sx={{ color: 'inherit' }}>
                  <Person sx={{ width: ICON_SIZE }} />
                </IconButton>
              </Tooltip> */}
            </Grid>
          </Grid>
        </DContainer>
      </Box>
    </>
  );
};

export default Topbar;
