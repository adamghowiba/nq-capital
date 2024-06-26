import {
  Box,
  ClickAwayListener,
  ListItemIcon,
  MenuItem,
  MenuItemProps,
  Popper,
} from '@mui/material';
import Link from 'next/link';
import React, {
  Children,
  FC,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BoxPropsExtended } from '../Box/Box';
import { Primitive } from 'type-fest';

export interface NMenuProps extends PropsWithChildren {}

export const NMenu: FC<NMenuProps> = ({ children, ...props }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const MenuListComponent = useMemo(() => {
    const menuList = Children.toArray(children)[1];

    if (React.isValidElement(menuList) && menuList.type === MenuList) {
      return menuList;
    }

    return undefined;
  }, [children]);

  const MenuButtonComponent = useMemo(() => {
    const menuButton = Children.toArray(children)[0];

    if (React.isValidElement(menuButton) && menuButton.type === MenuButton) {
      return menuButton;
    }

    return undefined;
  }, [children]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
      <Box>
        <MenuContext.Provider
          value={{
            isOpen: isOpen,
            closeMenu: () => setIsOpen(false),
            openMenu: () => setIsOpen(true),
            toggle: () => setIsOpen((open) => !open),
            setAnchorElement: (element) =>
              setAnchorEl(element as HTMLDivElement),
            anchorElement: anchorEl,
          }}
        >
          {MenuButtonComponent}

          <Popper
            open={isOpen}
            anchorEl={anchorEl}
            placement="bottom-start"
            popperOptions={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 2],
                  },
                },
              ],
            }}
          >
            {MenuListComponent}
          </Popper>
        </MenuContext.Provider>
      </Box>
    </ClickAwayListener>
  );
};

export interface MenuButtonProps extends PropsWithChildren {}

export const MenuButton: FC<MenuButtonProps> = ({ children }) => {
  const menuContext = useContext(MenuContext);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return;

    menuContext.setAnchorElement(boxRef.current);
  }, [boxRef.current]);

  return (
    <Box ref={boxRef} sx={{cursor: 'pointer'}} onClick={() => menuContext.toggle()}>
      {children}
    </Box>
  );
};

export interface MenuListProps extends PropsWithChildren, BoxPropsExtended {}

export const MenuList: FC<MenuListProps> = ({ children, sx, ...props }) => {
  const menuContext = useContext(MenuContext);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (target.role === 'menuitem') {
      menuContext.closeMenu();
    }
  };

  return (
    <Box
      onClick={handleClick}
      padding="6px"
      borderRadius="8px"
      bgcolor="#202020"
      minWidth="150px"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      sx={{
        '& .MuiDivider-root': {
          borderColor: 'rgb(255, 255, 255, 0.1)',
          my: '6px',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export interface NMenuItemProps extends PropsWithChildren, MenuItemProps {
  leftIcon?: ReactNode;
  href?: string;
  colorBadge?: string;
}

export const NMenuItem: FC<NMenuItemProps> = ({
  leftIcon,
  children,
  color,
  href,
  sx,
  colorBadge,
  ...props
}) => {
  return (
    <MenuItem
      component={href ? Link : 'li'}
      href={href}
      {...props}
      sx={{
        color: color || '#BBBBBB',
        borderRadius: '4px',
        minHeight: '30px',
        lineHeight: '1',
        fontSize: '13px',
        fontWeight: '500',
        py: '0',
        px: '8px',
        transition: 'background-color 0.15s ease',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
        ...sx,
      }}
    >
      {leftIcon && (
        <ListItemIcon
          sx={{
            '&.MuiListItemIcon-root': { minWidth: '26px', color: 'inherit' },
          }}
        >
          {leftIcon}
        </ListItemIcon>
      )}

      {colorBadge && (
        <ListItemIcon
          sx={{
            '&.MuiListItemIcon-root': { minWidth: '20px', color: 'inherit' },
          }}
        >
          <Box
            width="8px"
            height="8px"
            bgcolor={colorBadge}
            borderRadius="2px"
          />
        </ListItemIcon>
      )}

      {children}
    </MenuItem>
  );
};

export interface MenuContextProps {
  isOpen: boolean;
  closeMenu: () => void;
  openMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  toggle: () => void;
  setAnchorElement: (element: HTMLElement | HTMLDivElement) => void;
  anchorElement: HTMLElement | HTMLDivElement | null;
  value?: Primitive | null;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const MenuContext = createContext<MenuContextProps>({
  isOpen: false,
  value: null,
  closeMenu: function (): void {
    throw new Error('Function not implemented.');
  },
  openMenu: function (): void {
    throw new Error('Function not implemented.');
  },
  toggle: function (): void {
    throw new Error('Function not implemented.');
  },
  anchorElement: null,
});
