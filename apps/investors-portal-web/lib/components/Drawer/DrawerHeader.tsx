import arrowExpandFilledIcon from '@iconify/icons-fluent/arrow-expand-16-filled';
import dismissIcon from '@iconify/icons-fluent/dismiss-12-filled';
import minimizeFilledIcon from '@iconify/icons-fluent/minimize-16-filled';
import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import Box from "../Box/Box";
import { HStack, StackPropsExtended } from "../Stack/Stack";

export interface DrawerHeaderProps extends PropsWithChildren, StackPropsExtended {
  isExpanded?: boolean;
  onClickExpand?: () => void;
  onClose?: () => void;
}

const DrawerHeader: FC<DrawerHeaderProps> = ({
  isExpanded,
  children,
  onClickExpand,
  onClose,
  ...props
}) => {
  return (
    <>
      <HStack p={3} pt={2} pb={'12px'} align="start" {...props}>
        <Box alignSelf="center">{children}</Box>

        <HStack ml="auto" gap={1}>
          <IconButton size="small" onClick={onClose}>
            <Icon icon={dismissIcon} />
          </IconButton>

          {onClickExpand && (
            <Tooltip title="Expand">
              <IconButton size="small" onClick={() => onClickExpand()}>
                <Icon
                  icon={isExpanded ? minimizeFilledIcon : arrowExpandFilledIcon}
                />
              </IconButton>
            </Tooltip>
          )}
        </HStack>
      </HStack>
    </>
  );
};

export default DrawerHeader
