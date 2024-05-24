import { Popper, PopperProps, Typography } from '@mui/material';
import { ButtonTab, ButtonTabs, HStack, VStack } from '@nq-capital/nui';
import { FC, useMemo, useState } from 'react';

export interface NotificationPopoverProps extends PopperProps {}

const MOCK_NOTIFICATIONS: {
  title: string;
  description: string;
  id: number;
  read_at?: string;
}[] = [
  {
    id: 1,
    title: 'New Investment',
    description: "You've successfully invested $1,000",
  },
  {
    id: 2,
    title: 'Withdraw completed',
    description: 'Your scheduled withdrawal of $500 is completed',
    read_at: '2023-01-25',
  },
  {
    id: 3,
    title: 'Maintenon notice',
    description:
      'Scheduled maintenon on Jan 25, 2023 is postponed to Jan 30, 2023',
    read_at: '2023-01-25',
  },
];
const NotificationPopover: FC<NotificationPopoverProps> = ({ ...props }) => {
  const [tab, setTab] = useState('all');

  const filteredNotifications = useMemo(() => {
    if (tab === 'unread') {
      return MOCK_NOTIFICATIONS.filter((notification) => !notification.read_at);
    }

    return [...MOCK_NOTIFICATIONS];
  }, [tab]);

  return (
    <>
      <Popper
        sx={{
          bgcolor: 'black',
          color: 'white',
          p: '4px',
          borderRadius: '12px',
          width: '456px',
          zIndex: 100,
        }}
        {...props}
      >
        <VStack gap={'8px'}>
          <HStack px="8px" py="8px">
            <Typography color="#F1F1F1" fontWeight="500">
              Notifications
            </Typography>
          </HStack>

          <ButtonTabs
            onChange={(ev, value) => setTab(value)}
            value={tab}
            textColor="inherit"
            sx={{
              px: '4px',
            }}
            colorSchema="dark"
          >
            <ButtonTab label="All" value="all" />
            <ButtonTab label="Unread" value="unread" />
          </ButtonTabs>

          <VStack
            gap={1}
            px="4px"
            maxHeight="400px"
            overflow="auto"
            sx={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#8D8D8D',
                borderRadius: '100px',
              },
            }}
          >
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                description={notification.description}
              />
            ))}
          </VStack>
        </VStack>
      </Popper>
    </>
  );
};

export interface NotificationItemProps {
  title: string;
  description: string;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  title,
  description,
  ...props
}) => {
  return (
    <VStack
      sx={{
        p: '8px',
        borderRadius: '12px',
        transition: 'background-color 0.1s ease',
        ':hover': {
          bgcolor: 'rgba(255, 255, 255, 0.10)',
        },
        ':hover .ni-description': {
          color: '#BBBBBB',
        },
      }}
    >
      <Typography sx={{ color: '#F1F1F1' }}>{title}</Typography>
      <Typography
        className="ni-description"
        sx={{
          color: '#8D8D8D',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {description}
      </Typography>
    </VStack>
  );
};

export default NotificationPopover;
