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
    <Box ref={boxRef} onClick={() => menuContext.toggle()}>
      {children}
    </Box>
  );
};

export interface MenuListProps extends PropsWithChildren {}

export const MenuList: FC<MenuListProps> = ({ children }) => {
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
      sx={{
        borderRadius: '12px',
        padding: '6px',
        bgcolor: '#202020',
        minWidth: '150px',
        '& .MuiMenuItem-root': {
          color: '#BBBBBB',
          borderRadius: '4px',
          minHeight: '30px',
          lineHeight: '1',
          fontSize: '13px',
          fontWeight: '500',
          py: '0',
          px: '8px',
        },
        '& .MuiMenuItem-root:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      {children}
    </Box>
  );
};

export interface NMenuItemProps extends PropsWithChildren, MenuItemProps {
  leftIcon?: ReactNode;
  href?: string;
}

export const NMenuItem: FC<NMenuItemProps> = ({
  leftIcon,
  children,
  color,
  href,
  ...props
}) => {
  return (
    <MenuItem
      {...props}
      sx={{ '&.MuiMenuItem-root': { color: color }, ...props.sx }}
      component={href ? Link : 'li'}
      href={href}
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
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const MenuContext = createContext<MenuContextProps>({
  isOpen: false,
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
