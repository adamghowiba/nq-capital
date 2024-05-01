import bank from '@iconify/icons-fluent/building-bank-48-regular';
import dot from '@iconify/icons-fluent/circle-12-filled';
import more from '@iconify/icons-fluent/more-horizontal-24-regular';
import { Icon } from '@iconify/react';
import { Avatar, Box, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { theme } from '../../theme';
import OneIcon from '../../utils/OneIcon';
import BankCardMenu from './BankCardMenu';
import { BankSchema } from '../BankCardMutationDialog/BankMutationDialog';

export interface BankCardProps {
  bankName: string;
  accountNumber: string;
  isDefault?: boolean;
  isDisabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMakeDefault: () => void;
}

export const BankCard: FC<BankCardProps> = ({
  bankName,
  accountNumber,
  isDefault = false,
  isDisabled = false,
  onEdit,
  onDelete,
  onMakeDefault,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <BankCardMenu
        anchorEl={anchorEl}
        closeMenu={() => setAnchorEl(null)}
        isOpen={!!anchorEl}
        isDefault={isDefault}
        onEdit={onEdit}
        onDelete={onDelete}
        onMakeDefault={onMakeDefault}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isDefault
            ? 'auto 1fr auto auto'
            : 'auto 1fr auto',
          columnGap: 3,
          alignItems: 'center',
          padding: '16px 0',
        }}
      >
        <Avatar sx={{ backgroundColor: '#E4E4E4' }}>
          <Icon icon={bank} fontSize={28} color="#8D8D8D" />
        </Avatar>
        <Box>
          <Typography>{bankName}</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'baseline',
              columnGap: 0.5,
            }}
          >
            <Box>
              {[...new Array(12)].map((_, index) => (
                <Icon
                  key={index}
                  icon={dot}
                  fontSize={5}
                  color="#8D8D8D"
                  style={{
                    marginLeft: index > 0 && index % 4 === 0 ? '4px' : '2px',
                  }}
                />
              ))}
            </Box>
            <Typography color="#8D8D8D" fontWeight={400}>
              {accountNumber.substring(accountNumber.length -4)}
            </Typography>
          </Box>
        </Box>
        {isDefault && (
          <Box
            sx={{
              padding: '0 6px',
              backgroundColor: 'rgba(1, 160, 1, 0.13)',
              borderRadius: '5px',
            }}
          >
            <Typography sx={{ color: theme.palette.success.main }}>
              Default
            </Typography>
          </Box>
        )}
        <OneIcon
          icon={more}
          title="More"
          fontSize={24}
          iconColor="#202020"
          disabled={isDisabled}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        />
      </Box>
    </>
  );
};
