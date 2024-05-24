import moreHorizontal16Filled from '@iconify/icons-fluent/more-horizontal-16-filled';
import { Icon } from '@iconify/react';
import { IconButton, Typography } from '@mui/material';
import {
  HStack,
  MenuButton,
  MenuList,
  NAvatar,
  NMenu,
  NMenuItem,
  VStack,
} from '@nq-capital/nui';
import { DateTime } from 'luxon';
import { FC, useMemo } from 'react';

export interface UserDetailHeaderProps {
  firstName: string;
  lastName?: string;
  email?: string;
  createdAt: string;
}

const UserDetailHeader: FC<UserDetailHeaderProps> = ({
  createdAt,
  firstName,
  lastName,
  email,
  ...props
}) => {
  const formattedJoinedDate = useMemo(() => {
    return DateTime.fromISO(createdAt).toFormat('dd MMM, yyyy');
  }, [createdAt]);

  return (
    <HStack gap={3} align="center">
      <NAvatar
        sx={{
          width: '120px',
          height: '120px',
          fontSize: '42px',
        }}
      >
        {firstName?.[0]}
      </NAvatar>

      <VStack gap={1}>
        <Typography variant="h2" fontWeight="medium">
          {firstName} {lastName}
        </Typography>

        <a href={`mailto:${email}`}>
          <Typography variant="subtitle2">{email}</Typography>
        </a>

        <Typography variant="subtitle2">
          Joined {formattedJoinedDate}
        </Typography>
      </VStack>

      <HStack ml="auto" align="center" mb={4}>
        <NMenu>
          <MenuButton>
            <IconButton>
              <Icon icon={moreHorizontal16Filled} width={28} height={28} />
            </IconButton>
          </MenuButton>

          <MenuList>
            <NMenuItem disabled color="error.main" >Delete</NMenuItem>
            <NMenuItem disabled>Edit</NMenuItem>
            <NMenuItem disabled>Disable</NMenuItem>
            <NMenuItem disabled>Export statement</NMenuItem>
          </MenuList>
        </NMenu>
      </HStack>
    </HStack>
  );
};

export default UserDetailHeader;
