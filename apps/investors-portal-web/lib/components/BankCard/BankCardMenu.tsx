import { Menu, MenuItem } from '@mui/material';

export interface BankCardMenuProps {
  closeMenu: () => void;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMakeDefault: () => void;
  isDefault: boolean;
}

export default function BankCardMenu({
  closeMenu,
  anchorEl,
  isOpen,
  onEdit,
  onDelete,
  onMakeDefault,
  isDefault,
}: BankCardMenuProps) {
  const more_menu_items = [
    { label: 'Edit', action: onEdit },
    { label: 'Delete', action: onDelete },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      open={isOpen}
      onClose={closeMenu}
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'red'
          }
        }
      }}
    >
      {[
        ...(isDefault
          ? []
          : [{ label: 'Make Default', action: onMakeDefault }]),
        ...more_menu_items,
      ].map(({ action, label }, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            closeMenu();
            action();
          }}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
}
