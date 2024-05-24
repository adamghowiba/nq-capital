import notification from '@iconify/icons-fluent/alert-24-filled';
import upDown from '@iconify/icons-fluent/chevron-up-down-24-filled';
import person from '@iconify/icons-fluent/person-24-filled';
import settings from '@iconify/icons-fluent/settings-24-filled';
import { Icon, IconifyIcon } from '@iconify/react';
import {
  Avatar,
  ClickAwayListener,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { useInvestor } from '../../hooks/use-investor';
import OneIcon from '../../utils/OneIcon';
import DContainer from '../DContainer/DContainer';
import Logo from '../Logo/logo';
import NotificationPopover from '../NotificationPopover/NotificationPopover';
import { HStack } from '../Stack/Stack';
import TopbarSearch from './TopbarSearch';
import { useLoginMutation } from '../../gql/gql-client';

const Topbar: FC<any> = () => {
  const investor = useInvestor();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notificationsIconRef = useRef<HTMLButtonElement>(null);
  const loginMutation = useLoginMutation();

  const rightIcons: {
    title: string;
    icon: IconifyIcon;
    onClick?: () => void;
    href?: string;
  }[] = [
    {
      icon: settings,
      title: 'Settings',
      href: '/settings',
    },
    {
      icon: person,
      title: 'Profile',
    },
  ];

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
                  onClick={() =>
                    loginMutation.mutate({
                      loginInput: {
                        email: 'investor@webrevived.com',
                        password: 'password',
                        user_type: 'INVESTOR',
                      },
                    })
                  }
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

              {rightIcons.map(({ icon, title, onClick, href }, index) => (
                <OneIcon
                  key={index}
                  title={title}
                  icon={icon}
                  onClick={onClick}
                  fontSize={20}
                  LinkComponent={href ? Link : undefined}
                  // @ts-expect-error MUI doesn't accept slot href
                  href={href}
                />
              ))}
            </HStack>
          </Box>
        </DContainer>
      </Box>
    </>
  );
};

export default Topbar;
