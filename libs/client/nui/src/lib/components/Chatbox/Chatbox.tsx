import { Typography } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { Box, BoxPropsExtended } from '../Box/Box';
import { StackPropsExtended, VStack } from '../Stack/Stack';

export interface ChatBoxProps extends StackPropsExtended {}

export const ChatBox: FC<ChatBoxProps> = ({ ...props }) => {
  return (
    <VStack
      borderLeft="1px solid #EBEBEB"
      height="100%"
      sx={{ overflow: 'hidden' }}
      {...props}
    >
      {props.children}
    </VStack>
  );
};

export interface ChatBoxHeaderProps extends BoxPropsExtended {
  title?: string;
}

export const ChatBoxHeader: FC<ChatBoxHeaderProps> = ({
  title = 'Conversation',
  children,
  ...props
}) => {
  return (
    <Box p={2} borderBottom="1px solid #EBEBEB" {...props}>
      {children || <Typography>{title}</Typography>}
    </Box>
  );
};

export interface ChatBoxBodyProps extends StackPropsExtended {
  scrollDependency?: any;
}

export const ChatBoxBody: FC<ChatBoxBodyProps> = ({
  scrollDependency,
  ...props
}) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatBoxRef.current) return;

    chatBoxRef.current.scrollTo({
      top: chatBoxRef.current?.scrollHeight,
      behavior: 'instant',
    });
  }, [chatBoxRef, scrollDependency]);

  return (
    <VStack p={2} gap={4} sx={{ overflow: 'auto' }} ref={chatBoxRef}>
      {props.children}
    </VStack>
  );
};

export interface ChatBoxFooterProps extends StackPropsExtended {}

export const ChatBoxFooter: FC<ChatBoxFooterProps> = ({ ...props }) => {
  return (
    <VStack p={2} gap={1} borderTop="1px solid #EBEBEB" mt="auto">
      {props.children}
    </VStack>
  );
};
