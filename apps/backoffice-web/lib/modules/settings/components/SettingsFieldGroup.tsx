
import { StackPropsExtended, VStack } from '@nq-capital/nui';
import { FC } from 'react';

export interface SettingsFieldGroupProps extends StackPropsExtended {}

const SettingsFieldGroup: FC<SettingsFieldGroupProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <VStack
        borderBottom="1px solid"
        borderColor="divider"
        py={4}
        sx={{
          ':last-child': {
            borderBottom: 'none',
          },
          ':first-of-type': {
            pt: 0
          },
        }}
        {...props}
      >
        {children}
      </VStack>
    </>
  );
};

export default SettingsFieldGroup;
