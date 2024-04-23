import dot from '@iconify/icons-fluent/circle-12-filled';
import info from '@iconify/icons-fluent/info-12-filled';
import { Icon } from '@iconify/react';
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    OutlinedInput,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NewBankData } from '../../onboarding/newBankDialog';
import StepHeader from '../../onboarding/stepHeader';

interface NewWithdrawalFormProps {
  data?: NewWithdrawal;
  onReview: (data: NewWithdrawal) => void;
  isSubmittingTicket: boolean;
  onBack: () => void;
  registeredAccounts: RegisteredAccount[];
  isLoadingRegisteredAccounts: boolean;
}

export interface RegisteredAccount
  extends Omit<NewBankData, 'temp_id' | 'is_default'> {
  id: string;
}

export interface NewWithdrawal {
  accountId: string;
  amount: number;
  withdrawalDate: Date;
  comment?: string;
}
export default function NewWithdrawalForm({
  data,
  onReview,
  onBack,
  isSubmittingTicket,
  isLoadingRegisteredAccounts,
  registeredAccounts,
}: NewWithdrawalFormProps) {
  const initialValues: NewWithdrawal = data ?? {
    accountId: '',
    amount: 0,
    withdrawalDate: new Date(),
    comment: '',
  };

  const accountIds = registeredAccounts.map(({ id }) => id);
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Required field')
      .moreThan(0, 'Must be greater than 0'),
    withdrawalDate: Yup.date()
      .min(new Date(), 'Cannot be earlier than today')
      .default(() => new Date()),
    accountId: Yup.string()
      .required('Required field')
      .oneOf(accountIds, 'Unknown receiver'),
    comment: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onReview(values);
      resetForm();
    },
  });

  function close() {
    formik.resetForm();
    onBack();
  }

  return (
    <Box
      sx={{ width: '604px', display: 'grid', rowGap: 5 }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <StepHeader
        title="New Investment"
        subtitle="Enter details for a new investment"
        gap={1}
      />
      <Box sx={{ display: 'grid', rowGap: 2 }}>
        <Autocomplete
          options={registeredAccounts}
          autoHighlight
          getOptionLabel={({ bank_name, account_type }) =>
            `${bank_name} ( ${account_type} )`
          }
          onChange={(_, selectedAccount) => {
            formik.setFieldValue(
              'accountId',
              selectedAccount ? selectedAccount.id : null
            );
          }}
          value={
            formik.values.accountId
              ? registeredAccounts.find(
                  ({ id }) => id === formik.values.accountId
                )
              : null
          }
          renderOption={(
            props,
            { bank_name, bank_account_number, account_type }
          ) => (
            <Box component="li" {...props}>
              <Box>
                <Typography>
                  {bank_name}
                  <Typography component="span" sx={{ color: '#808080' }}>
                    {` (${account_type})`}
                  </Typography>
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
                          marginLeft:
                            index > 0 && index % 4 === 0 ? '4px' : '2px',
                        }}
                      />
                    ))}
                  </Box>
                  <Typography color="#8D8D8D" fontWeight={400}>
                    {bank_account_number.substring(
                      bank_account_number.length - 4
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <FormControl
              error={
                formik.touched.accountId && Boolean(formik.errors.accountId)
              }
            >
              <FormLabel
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  alignItems: 'center',
                  columnGap: '4px',
                }}
              >
                Registered Account
                <Tooltip
                  arrow
                  title="The account where the withdrawn amount will go to"
                  placement="top-start"
                >
                  <Icon icon={info} color="#DDDDDD" fontSize={16} />
                </Tooltip>
              </FormLabel>
              <TextField
                {...params}
                placeholder="Select account"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'autocomplete',
                }}
                error={
                  formik.touched.accountId && Boolean(formik.errors.accountId)
                }
                {...formik.getFieldProps('accountId')}
                disabled={isSubmittingTicket || isLoadingRegisteredAccounts}
                size="small"
              />
              {formik.touched.accountId && formik.errors.accountId && (
                <FormHelperText>{formik.errors.accountId}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            alignItems: 'start',
            columnGap: 1,
          }}
        >
          <FormControl
            error={formik.touched.amount && Boolean(formik.errors.amount)}
          >
            <FormLabel>Amount</FormLabel>
            <OutlinedInput
              placeholder="Enter your passport number"
              type="number"
              {...formik.getFieldProps('amount')}
              disabled={isSubmittingTicket}
              size="small"
              startAdornment={
                <Typography sx={{ paddingRight: 2 }}>USD</Typography>
              }
            />
            <FormHelperText>
              {formik.touched.amount && formik.errors.amount}
            </FormHelperText>
          </FormControl>

          <FormControl
            error={
              formik.touched.withdrawalDate &&
              Boolean(formik.errors.withdrawalDate)
            }
          >
            <FormLabel>Date of Withdrawal</FormLabel>
            <MobileDatePicker
              openTo="day"
              views={['year', 'month', 'day']}
              orientation="landscape"
              onChange={(value: Dayjs | null) => {
                value && formik.setFieldValue('withdrawalDate', value.toDate());
              }}
              minDate={dayjs(new Date())}
              slotProps={{
                textField: {
                  ...formik.getFieldProps('withdrawalDate'),
                  value: dayjs(formik.values.withdrawalDate),
                  error:
                    formik.touched.withdrawalDate &&
                    Boolean(formik.errors.withdrawalDate),
                  helperText:
                    formik.touched.withdrawalDate &&
                    formik.errors.withdrawalDate &&
                    String(formik.errors.withdrawalDate),
                },
              }}
              disabled={isSubmittingTicket}
            />
          </FormControl>
        </Box>

        <FormControl
          error={formik.touched.comment && Boolean(formik.errors.comment)}
        >
          <FormLabel>
            <Typography>
              Comments
              <Typography component="span" color="#8D8D8D" ml={1}>
                Optional
              </Typography>
            </Typography>
          </FormLabel>
          <OutlinedInput
            placeholder="Additional comments"
            multiline
            rows={5}
            {...formik.getFieldProps('comment')}
            disabled={isSubmittingTicket}
            size="small"
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 1,
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={close}
          disabled={isSubmittingTicket}
        >
          Back
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmittingTicket}
          endIcon={isSubmittingTicket ? <CircularProgress size={20} /> : null}
        >
          Review
        </Button>
      </Box>
    </Box>
  );
}
