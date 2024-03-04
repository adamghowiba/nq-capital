import { Icon, IconifyIcon } from '@iconify/react';
import { IconButton, Tooltip } from '@mui/material';

export interface OneIconProps {
  title: string;
  icon: IconifyIcon;
  size?: 'small' | 'large' | 'medium';
  fontSize?: number;
  onClick?: () => void;
}

export default function OneIcon({
  title,
  icon,
  size = 'small',
  fontSize = 24,
  onClick,
}: OneIconProps) {
  return (
    <Tooltip arrow title={title}>
      <IconButton size={size} onClick={onClick}>
        <Icon
          icon={icon}
          fontSize={fontSize}
          style={{ color: 'var(--neutral-400)' }}
        />
      </IconButton>
    </Tooltip>
  );
}
