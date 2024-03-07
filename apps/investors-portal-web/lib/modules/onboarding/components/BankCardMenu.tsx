import { Menu, MenuItem } from '@mui/material';

export interface BankCardMenuProps {
  closeMenu: () => void;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMakeDefault: () => void;
}

export default function BankCardMenu({
  closeMenu,
  anchorEl,
  isOpen,
  onEdit,
  onDelete,
  onMakeDefault,
}: BankCardMenuProps) {
  const more_menu_items = [
    { label: 'Edit', action: onEdit },
    { label: 'Make Default', action: onMakeDefault },
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
    >
      {more_menu_items.map(({ action, label }, index) => (
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
