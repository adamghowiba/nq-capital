import bank from '@iconify/icons-fluent/building-bank-48-regular';
import dot from '@iconify/icons-fluent/circle-12-filled';
import more from '@iconify/icons-fluent/more-horizontal-24-regular';
import { Icon } from '@iconify/react';
import { Avatar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../lib/theme';
import OneIcon from '../utils/OneIcon';
import BankCardMenu from './BankCardMenu';
import { NewBankData } from './BankMutationDialog';

export interface BankCardProps {
  bank: NewBankData;
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMakeDefault: () => void;
}

export default function BankCard({
  bank: { bank_name, bank_account_number, is_default },
  disabled = false,
  onEdit,
  onDelete,
  onMakeDefault,
}: BankCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <BankCardMenu
        anchorEl={anchorEl}
        closeMenu={() => setAnchorEl(null)}
        isOpen={!!anchorEl}
        onEdit={onEdit}
        onDelete={onDelete}
        onMakeDefault={onMakeDefault}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: is_default
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
          <Typography>{bank_name}</Typography>
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
              {bank_account_number.substring(bank_account_number.length - 4)}
            </Typography>
          </Box>
        </Box>
        {is_default && (
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
          disabled={disabled}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        />
      </Box>
    </>
  );
}
