import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
} from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export interface NCurrencyFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'>,
    Pick<
      NumericFormatProps,
      | 'thousandSeparator'
      | 'prefix'
      | 'customInput'
      | 'thousandSeparator'
      | 'decimalSeparator'
      | 'allowedDecimalSeparators'
      | 'thousandsGroupStyle'
      | 'decimalScale'
      | 'fixedDecimalScale'
      | 'allowNegative'
      | 'allowLeadingZeros'
      | 'suffix'
      | 'prefix'
    > {
  helperText?: ReactNode;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  HelperTextProps?: FormHelperTextProps;
  error?: string;
  fullWidth?: boolean;
}

/**
 * Container component to sync react-form-hook and MUI TextField
 */
export const NCurrencyField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  helperText,
  label,
  placeholder,
  isRequired,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  fullWidth,
  error,
  HelperTextProps,
  ...props
}: NCurrencyFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            error={fieldState.invalid || !!error}
            required={isRequired}
            fullWidth={fullWidth}
            disabled={field.disabled}
          >
            <FormLabel>{label}</FormLabel>

            <NumericFormat
              prefix="$"
              placeholder={placeholder}
              thousandSeparator
              value={field.value || '0'}
              fullWidth
              {...props}
              customInput={TextField}
              onValueChange={(values, sourceInfo) =>
                field.onChange(values.floatValue)
              }
              onBlur={field.onBlur}
              disabled={field.disabled}
            />

            {(fieldState.invalid || helperText) && (
              <FormHelperText {...HelperTextProps}>
                {error ||
                  (fieldState.error?.message
                    ? fieldState.error?.message
                    : helperText)}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
};
