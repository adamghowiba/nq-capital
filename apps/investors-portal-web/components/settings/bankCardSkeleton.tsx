import bank from '@iconify/icons-fluent/building-bank-48-regular';
import dot from '@iconify/icons-fluent/circle-12-filled';
import more from '@iconify/icons-fluent/more-horizontal-24-regular';
import { Icon } from '@iconify/react';
import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import OneIcon from '../utils/OneIcon';

export default function BankCardSkeleton() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        columnGap: 3,
        alignItems: 'center',
        padding: '16px 0',
      }}
    >
      <Avatar sx={{ backgroundColor: '#E4E4E4' }}>
        <Icon icon={bank} fontSize={28} color="#8D8D8D" />
      </Avatar>
      <Box>
        <Typography>
          <Skeleton width="60%" />
        </Typography>
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
            <Skeleton width="34px" />
          </Typography>
        </Box>
      </Box>

      <OneIcon
        icon={more}
        title="More"
        fontSize={24}
        iconColor="#202020"
        disabled
      />
    </Box>
  );
}
