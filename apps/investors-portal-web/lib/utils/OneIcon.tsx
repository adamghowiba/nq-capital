import { Icon, IconifyIcon } from '@iconify/react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';

export interface OneIconProps {
  title: string;
  icon: IconifyIcon;
  fontSize?: number;
  iconColor?: string;
}

export type IconButtonPropsExtended = OneIconProps & IconButtonProps;

export default function OneIcon({
  title,
  icon,
  size = 'small',
  fontSize = 24,
  onClick,
  iconColor = 'var(--neutral-400)',
  ...props
}: IconButtonPropsExtended) {
  return (
    <Tooltip arrow title={title}>
      <IconButton size={size} onClick={onClick} {...props}>
        <Icon icon={icon} fontSize={fontSize} style={{ color: iconColor }} />
      </IconButton>
    </Tooltip>
  );
}
