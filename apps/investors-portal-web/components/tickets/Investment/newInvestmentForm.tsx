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
  Typography,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StepHeader from '../../onboarding/stepHeader';

export interface InvestmentReceiver {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}
interface NewInvestmentFormProps {
  investmentReceivers: InvestmentReceiver[];
  data?: NewInvestment;
  onReview: (data: NewInvestment) => void;
  isSubmittingTicket: boolean;
  onBack: () => void;
}

export interface NewInvestment {
  receiver: string;
  amount: number;
  investmentDate: Date;
  paymentMode: string;
  comment?: string;
}
export default function NewInvestmentForm({
  investmentReceivers,
  data,
  onReview,
  onBack,
  isSubmittingTicket,
}: NewInvestmentFormProps) {
  const PAYMENT_METHODS = ['Bank Transfer', 'Cheque', 'Zelle'];

  const initialValues: NewInvestment = data ?? {
    amount: 0,
    investmentDate: new Date(),
    paymentMode: '',
    receiver: '',
  };

  const receiverIds = investmentReceivers.map(({ id }) => id);
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Required field')
      .moreThan(0, 'Must be greater than 0'),
    paymentMode: Yup.string()
      .required('Required field')
      .oneOf(PAYMENT_METHODS, 'Unsupported payment mode'),
    investmentDate: Yup.date()
      .min(new Date(), 'Cannot be earlier than today')
      .default(() => new Date()),
    receiver: Yup.string()
      .required('Required field')
      .oneOf(receiverIds, 'Unknown receiver'),
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
          options={investmentReceivers}
          autoHighlight
          getOptionLabel={({ first_name, last_name, email }) =>
            `${first_name} ${last_name} ( ${email} )`
          }
          onChange={(_, selectedReceiver) => {
            formik.setFieldValue(
              'receiver',
              selectedReceiver ? selectedReceiver.id : null
            );
          }}
          value={
            formik.values.receiver
              ? investmentReceivers.find(
                  ({ id }) => id === formik.values.receiver
                )
              : null
          }
          renderOption={(props, { first_name, last_name, email }) => (
            <Box component="li" {...props}>
              {`${first_name} ${last_name} ( ${email} )`}
            </Box>
          )}
          renderInput={(params) => (
            <FormControl
              error={formik.touched.receiver && Boolean(formik.errors.receiver)}
            >
              <FormLabel>Send Investment To</FormLabel>
              <TextField
                {...params}
                placeholder="Select contact"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'autocomplete',
                }}
                error={
                  formik.touched.receiver && Boolean(formik.errors.receiver)
                }
                {...formik.getFieldProps('receiver')}
                disabled={isSubmittingTicket}
                size="small"
              />
              {formik.touched.receiver && formik.errors.receiver && (
                <FormHelperText>{formik.errors.receiver}</FormHelperText>
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
              formik.touched.investmentDate &&
              Boolean(formik.errors.investmentDate)
            }
          >
            <FormLabel>Investment Date</FormLabel>
            <MobileDatePicker
              openTo="day"
              views={['year', 'month', 'day']}
              orientation="landscape"
              onChange={(value: Dayjs | null) => {
                value && formik.setFieldValue('investmentDate', value.toDate());
              }}
              minDate={dayjs(new Date())}
              slotProps={{
                textField: {
                  ...formik.getFieldProps('investmentDate'),
                  value: dayjs(formik.values.investmentDate),
                  error:
                    formik.touched.investmentDate &&
                    Boolean(formik.errors.investmentDate),
                  helperText:
                    formik.touched.investmentDate &&
                    formik.errors.investmentDate &&
                    String(formik.errors.investmentDate),
                },
              }}
              disabled={isSubmittingTicket}
            />
          </FormControl>
        </Box>

        <Autocomplete
          options={PAYMENT_METHODS}
          autoHighlight
          getOptionLabel={(mode) => mode}
          onChange={(_, selectedMode) => {
            formik.setFieldValue('paymentMode', selectedMode);
          }}
          value={formik.values.paymentMode}
          renderOption={(props, mode) => (
            <Box component="li" {...props}>
              {mode}
            </Box>
          )}
          renderInput={(params) => (
            <FormControl
              error={
                formik.touched.paymentMode && Boolean(formik.errors.paymentMode)
              }
            >
              <FormLabel>Payment Mode</FormLabel>
              <TextField
                {...params}
                placeholder="Select payment mode"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'autocomplete',
                }}
                error={
                  formik.touched.paymentMode &&
                  Boolean(formik.errors.paymentMode)
                }
                {...formik.getFieldProps('paymentMode')}
                disabled={isSubmittingTicket}
                size="small"
              />
              <FormHelperText>
                {formik.touched.paymentMode && formik.errors.paymentMode}
              </FormHelperText>
            </FormControl>
          )}
        />

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
