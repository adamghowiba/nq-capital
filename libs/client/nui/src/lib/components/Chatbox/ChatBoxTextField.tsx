import { Icon } from '@iconify/react';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';
import arrowCircleUp12Filled from '@iconify/icons-fluent/arrow-circle-up-12-filled';

export interface ChatBoxTextFieldProps
  extends Omit<TextFieldProps<'outlined'>, 'value'> {
  value?: string;
  /**
   * Triggered when a users clicks enter, or the send button
   * @returns
   */
  onSend?: (message: string) => void;
}

export const ChatBoxTextField: FC<ChatBoxTextFieldProps> = ({
  sx,
  value,
  onSend,
  ...props
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!value?.trim()) return;

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend?.(value);
    }
  };

  return (
    <TextField
      placeholder="Comment.."
      multiline
      value={value}
      fullWidth
      size="medium"
      onKeyDown={handleKeyDown}
      maxRows={13}
      sx={{
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
          py: 0.5,
          pr: 0,
        },
        '& .MuiInputBase-root': {
          bgcolor: 'transparent',
        },
        ...sx,
      }}
      InputProps={{
        endAdornment: (
          <IconButton
            size="small"
            color={value?.trim() ? 'primary' : 'secondary'}
            sx={{
              alignSelf: 'end',
              transition: 'color 0.15s ease',
            }}
            onClick={() => value && onSend?.(value)}
          >
            <Icon icon={arrowCircleUp12Filled} width={25} height={25} />
          </IconButton>
        ),
      }}
      {...props}
    />
  );
};
