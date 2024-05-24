import alertIcon from '@iconify/icons-fluent/alert-16-filled';
import { Icon } from '@iconify/react';
import { Breadcrumbs, IconButton, Link, Typography } from '@mui/material';
import { Box, HStack, NAvatar } from '@nq-capital/nui';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { useUser } from '../../hooks/use-user';
import { useLoginMutation } from '../../gql/gql-client';

export interface TopbarProps {}

const Topbar: FC<TopbarProps> = ({ ...props }) => {
  const user = useUser();

  const router = useRouter();

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
                  component={Link}
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

          <NAvatar size="md">
            {user.data?.first_name?.slice(0, 1) || 'U'}
          </NAvatar>
        </HStack>
      </HStack>
    </>
  );
};

export default Topbar;
