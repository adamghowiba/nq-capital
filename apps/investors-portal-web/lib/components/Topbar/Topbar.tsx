import alertIcon from '@iconify/icons-fluent/alert-16-filled';
import notification from '@iconify/icons-fluent/alert-24-filled';
import arrowExitIcon from '@iconify/icons-fluent/arrow-exit-20-filled';
import upDown from '@iconify/icons-fluent/chevron-up-down-24-filled';
import personIcon from '@iconify/icons-fluent/person-24-filled';
import receipt16FilledIcon from '@iconify/icons-fluent/receipt-16-filled';
import settingsIcon from '@iconify/icons-fluent/settings-24-filled';
import { Icon } from '@iconify/react';
import {
  Avatar,
  ClickAwayListener,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  HStack,
  MenuButton,
  MenuList,
  NAvatar,
  NMenu,
  NMenuItem,
  VStack,
} from '@nq-capital/nui';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { useInvestor } from '../../hooks/use-investor';
import DContainer from '../DContainer/DContainer';
import Logo from '../Logo/logo';
import NotificationPopover from '../NotificationPopover/NotificationPopover';
import TopbarSearch from './TopbarSearch';
import { useLogoutMutation } from '../../gql/gql-client';
import { useRouter } from 'next/router';

const Topbar: FC<any> = () => {
  const router = useRouter();
  const investor = useInvestor();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      router.push('/login');
    },
  });

  const notificationsIconRef = useRef<HTMLButtonElement>(null);

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
              <Link href="/">
                <Logo />
              </Link>

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
                    width: '32px',
                    height: '32px',
                  }}
                >
                  {investor.data?.first_name[0]}
                  {investor.data?.last_name[0]}
                </Avatar>

                <Typography>
                  {investor.data?.first_name} {investor.data?.last_name}
                </Typography>

                <Tooltip arrow title="Swap user">
                  <IconButton size="small">
                    <Icon icon={upDown} fontSize="16px" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <TopbarSearch />

            <HStack gap={2} align="center">
              <ClickAwayListener
                onClickAway={() => setIsNotificationOpen(false)}
              >
                <Box>
                  <IconButton
                    size="small"
                    ref={notificationsIconRef}
                    onClick={() => setIsNotificationOpen((open) => !open)}
                  >
                    <Icon icon={notification} fontSize={20} />
                  </IconButton>

                  <NotificationPopover
                    open={isNotificationOpen}
                    anchorEl={notificationsIconRef.current}
                    placement="bottom-end"
                  />
                </Box>
              </ClickAwayListener>

              <IconButton
                size="small"
                component={Link}
                href="/settings"
                sx={{ fontSize: '20px' }}
              >
                <Icon icon={settingsIcon} />
              </IconButton>

              <NMenu>
                <MenuButton>
                  <IconButton size="small" sx={{ fontSize: '20px' }}>
                    <Icon icon={personIcon} />
                  </IconButton>
                </MenuButton>

                <MenuList width="250px">
                  <NMenuItem sx={{ py: '6px', pl: '4px' }} href="/settings">
                    <HStack gap={1}>
                      <NAvatar>{investor.data?.first_name[0]}</NAvatar>

                      <VStack>
                        <Typography variant="body2" color="grey.300">
                          {investor.data?.first_name} {investor.data?.last_name}
                        </Typography>
                        <Typography variant="caption" color="grey.400">
                          {investor.data?.email}
                        </Typography>
                      </VStack>
                    </HStack>
                  </NMenuItem>

                  <Divider sx={{}} />

                  <NMenuItem
                    leftIcon={<Icon icon={settingsIcon} fontSize={15} />}
                    href="/settings"
                  >
                    Settings
                  </NMenuItem>
                  <NMenuItem
                    leftIcon={<Icon icon={alertIcon} fontSize={15} />}
                    href="/settings/notifications"
                  >
                    Notifications
                  </NMenuItem>
                  <NMenuItem
                    leftIcon={<Icon icon={receipt16FilledIcon} fontSize={15} />}
                    href="/settings/billing"
                  >
                    Billing
                  </NMenuItem>

                  <Divider sx={{}} />

                  <NMenuItem
                    leftIcon={<Icon icon={arrowExitIcon} fontSize={15} />}
                    onClick={() => logoutMutation.mutate({})}
                  >
                    Logout
                  </NMenuItem>
                </MenuList>
              </NMenu>
            </HStack>
          </Box>
        </DContainer>
      </Box>
    </>
  );
};

export default Topbar;
