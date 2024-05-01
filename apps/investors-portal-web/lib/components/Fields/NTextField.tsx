import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

// declare const Controller: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;

export interface NTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'>,
    Pick<
      TextFieldProps,
      'multiline' | 'rows' | 'minRows' | 'maxRows' | 'fullWidth' | 'type' | "autoFocus"
    > {
  helperText?: ReactNode;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
}

/**
 * Container component to sync react-form-hook and MUI TextField
 */
const NTextField = <
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
}: NTextFieldProps<TFieldValues, TName>) => {
  return (
    <>
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

              <TextField placeholder={placeholder} {...field} {...props} />

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
        defaultValue={defaultValue}
        disabled={disabled}
        rules={rules}
        shouldUnregister={shouldUnregister}
      />
    </>
  );
};

export default NTextField;
