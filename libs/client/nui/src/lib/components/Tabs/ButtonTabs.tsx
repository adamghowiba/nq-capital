import { Tab, TabProps, Tabs, TabsProps, styled } from '@mui/material';
import { FC } from 'react';

export interface ButtonTabProps extends TabsProps {
  size?: 'small' | 'medium';
  colorSchema?: 'dark' | 'light';
}

export const ButtonTabs: FC<ButtonTabProps> = ({
  size,
  colorSchema,
  ...props
}) => {
  return (
    <Tabs
      {...props}
      sx={{
        minHeight: 'unset',
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          height: '100%',
          width: '100%',
          borderRadius: '100px',
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        },
        '& .MuiTabs-indicatorSpan': {
          width: '100%',
          height: '100%',
          backgroundColor:
            colorSchema === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'white',
          borderRadius: 'inherit',
        },
        ...props.sx,
      }}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  );
};

export const ButtonTab = styled((props: TabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14),
  color: '#d0d0d0',
  zIndex: 2,
  minHeight: 'unset',
  lineHeight: '1.3',
  transition: 'color 0.15s ease',
  '&.Mui-selected': {
    color: '#FFFFFF',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
  '&.MuiButtonBase-root': {
    minWidth: '70px',
    padding: '4px 12px',
  },
}));
