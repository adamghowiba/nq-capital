import alertIcon from '@iconify/icons-fluent/alert-16-filled';
import arrowExitIcon from '@iconify/icons-fluent/arrow-exit-20-filled';
import receipt16FilledIcon from '@iconify/icons-fluent/receipt-16-filled';
import settingsIcon from '@iconify/icons-fluent/settings-24-filled';
import { Icon } from '@iconify/react';
import {
  Breadcrumbs,
  Divider,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import {
  Box,
  HStack,
  MenuButton,
  MenuList,
  NAvatar,
  NMenu,
  NMenuItem,
  VStack,
} from '@nq-capital/nui';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { useLogoutMutation } from '../../gql/gql-client';
import { useUser } from '../../hooks/use-user';

export interface TopbarProps {}

const Topbar: FC<TopbarProps> = ({ ...props }) => {
  const user = useUser();

  const router = useRouter();

  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      router.push('/login');
    },
  });

  const pathBreadcrumbs = useMemo((): { name: string; href?: string }[] => {
    const pathSegments = router.asPath.split('/').filter(Boolean);

    const breadcrumbs = pathSegments.map((segment, index) => {
      return {
        name: segment,
        href:
          index === pathSegments.length - 1
            ? undefined
            : `/${pathSegments.slice(0, index + 1).join('/')}`,
      };
    });

    return [{ name: 'Home', href: '/' }, ...breadcrumbs];
  }, [router.pathname]);

  return (
    <>
      <HStack
        borderBottom="1px solid"
        borderColor="#EBEBEB"
        h="45px"
        px={2}
        py={1.5}
      >
        <Breadcrumbs>
          {pathBreadcrumbs.map((breadcrumb, index) => (
            <Box key={breadcrumb.name} textTransform="capitalize">
              {breadcrumb.href ? (
                <Link
                  component={NextLink}
                  key={index}
                  href={breadcrumb.href}
                  sx={{ textTransform: 'capitalize', color: 'text.secondary' }}
                  underline={'hover'}
                >
                  {breadcrumb.name}
                </Link>
              ) : (
                <Typography>{breadcrumb.name}</Typography>
              )}
            </Box>
          ))}
        </Breadcrumbs>

        <HStack ml="auto" gap={0.5}>
          <IconButton>
            <Icon icon={alertIcon} width={18} height={18} />
          </IconButton>

          <NMenu>
            <MenuButton>
              <NAvatar size="md">
                {user.data?.first_name?.slice(0, 1) || 'U'}
              </NAvatar>
            </MenuButton>

            <MenuList width="250px">
              <NMenuItem sx={{ py: '6px', pl: '4px' }} href="/settings">
                <HStack gap={1}>
                  <NAvatar>{user.data?.first_name[0]}</NAvatar>

                  <VStack>
                    <Typography variant="body2" color="grey.300">
                      {user.data?.first_name} {user.data?.last_name}
                    </Typography>
                    <Typography variant="caption" color="grey.400">
                      {user.data?.email}
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
      </HStack>
    </>
  );
};

export default Topbar;
