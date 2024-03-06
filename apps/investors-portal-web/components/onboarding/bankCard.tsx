import bank from '@iconify/icons-fluent/building-bank-48-regular';
import dot from '@iconify/icons-fluent/circle-12-filled';
import more from '@iconify/icons-fluent/more-horizontal-24-regular';
import { Icon } from '@iconify/react';
import { Avatar, Box, Typography } from '@mui/material';
import OneIcon from '../utils/OneIcon';
import { NewBankData } from './newBankDialog';

export interface BankCardProps {
  bank: NewBankData;
  disabled?: boolean;
}

export default function BankCard({
  bank: { bank_name, bank_account_number },
  disabled = false,
}: BankCardProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        columnGap: 3,
        alignItems: 'center',
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
      <OneIcon
        icon={more}
        title="More"
        fontSize={24}
        iconColor="#202020"
        disabled={disabled}
      />
    </Box>
  );
}
