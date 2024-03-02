import notification from '@iconify/icons-fluent/alert-24-filled';
import upDown from '@iconify/icons-fluent/chevron-up-down-24-filled';
import person from '@iconify/icons-fluent/person-24-filled';
import questionCircle from '@iconify/icons-fluent/question-circle-24-filled';
import settings from '@iconify/icons-fluent/settings-24-filled';
import { Icon } from '@iconify/react';
import { Avatar, Divider, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DContainer from '../DContainer/DContainer';
import OneIcon from '../OneIcon/OneIcon';
import TopbarSearch from './TopbarSearch';

function Topbar() {
  return (
    <>
      <Box width="100%" bgcolor="#F9F9F9" height="56px">
        <DContainer
          height="100%"
          width="100%"
          sx={{ display: 'grid', alignItems: 'center' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                alignItems: 'center',
                columnGap: 3,
                justifyItems: 'center',
              }}
            >
              <Box
                bgcolor="black"
                borderRadius="8px"
                width="36px"
                height="32px"
                sx={{
                  display: 'grid',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  color="white"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="1"
                >
                  NQ
                </Typography>
              </Box>
              <Divider orientation="vertical" sx={{ height: '60%' }} />
              <Box
                sx={{
                  display: 'grid',
                  columnGap: '9px',
                  gridAutoFlow: 'column',
                  alignItems: 'center',
                  justifyContent: 'start',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: '#EBEBEB',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: '#8D8D8D',
                  }}
                >
                  JS
                </Avatar>
                <Typography>Jane Smith</Typography>
                <Tooltip arrow title="Swap user">
                  <IconButton size="small">
                    <Icon icon={upDown} fontSize="16px" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <TopbarSearch />
            <Box
              sx={{
                display: 'grid',
                alignItems: 'center',
                gridAutoFlow: 'column',
                columnGap: 2,
              }}
            >
              <OneIcon title="Help" icon={questionCircle} />
              <OneIcon title="Notifications" icon={notification} />
              <OneIcon title="Settings" icon={settings} />
              <OneIcon title="Profile" icon={person} />
            </Box>
          </Box>
        </DContainer>
      </Box>
    </>
  );
}

export default Topbar;
