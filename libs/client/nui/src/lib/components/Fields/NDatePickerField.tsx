import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import {
  DatePicker,
  DatePickerProps
} from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { ReactNode } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

// declare const Controller: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;

export interface NDateFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render' | 'defaultValue'>,
    Omit<DatePickerProps<DateTime>, 'name'> {
  helperText?: ReactNode;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  fullWidth?: boolean;
}

/**
 * Container component to sync react-form-hook and MUI TextField
 */
export const NDateField = <
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
  ...props
}: NDateFieldProps<TFieldValues, TName>) => {
  return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          return (
            <FormControl
              error={fieldState.invalid}
              required={isRequired}
              fullWidth={fullWidth}
            >
              <FormLabel>{label}</FormLabel>

              <DatePicker
                {...field}
                {...props}
                value={field?.value ? DateTime.fromISO(field?.value) : null}
                onChange={(value, context) => field.onChange(value?.toISO?.())}
                slotProps={{
                  openPickerIcon: {
                    sx: {
                      width: '20px',
                      height: '20px',
                    },
                  },
                  openPickerButton: {
                    size: 'small',
                  },
                }}
              />

              {(fieldState.invalid || helperText) && (
                <FormHelperText>
                  {fieldState.error?.message
                    ? fieldState.error?.message
                    : helperText}
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
        disabled={disabled}
        rules={rules}
        shouldUnregister={shouldUnregister}
      />
  );
};
