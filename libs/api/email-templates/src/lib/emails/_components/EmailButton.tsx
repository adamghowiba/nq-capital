import { Button, ButtonProps } from '@react-email/components';
import { FC } from 'react';

export interface EmailButtonProps extends ButtonProps {}

export const EmailButton: FC<EmailButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
      {...props}
    >
      {children}
    </Button>
  );
};
