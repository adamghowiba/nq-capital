import { FormControl, TextField } from '@mui/material';
import React, { FC } from 'react';
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
> extends ControllerProps<TFieldValues, TName> {}

/**
 * Container component to sync react-form-hook and MUI TextField
 */
const NTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  ...props
}: NTextFieldProps<TFieldValues, TName>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormControl>
              <TextField {...field} {...props} />
            </FormControl>
          )
        }}
      />
    </>
  );
};

export default NTextField;
