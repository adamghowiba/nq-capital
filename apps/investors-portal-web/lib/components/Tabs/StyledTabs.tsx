import { Tab, TabProps, Tabs, TabsProps, styled } from "@mui/material";

export const StyledTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  backgroundColor: '#F1F1F1',
  padding: '2px',
  minHeight: 'unset',
  borderRadius: '8px',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    borderRadius: '6px',
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    border: '1px solid #EBEBEB',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 'inherit',
  },
});

export const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(15),
    color: '#8D8D8D',
    zIndex: 2,
    minHeight: 'unset',
    lineHeight: '1.3',
    '&.Mui-selected': {
      color: '#646464',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
    '&.MuiButtonBase-root': {
      minWidth: '70px',
      padding: '4px 12px',
    },
  })
);
