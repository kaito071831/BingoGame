import React from 'react';
import { Box, Container, Flex, FlexProps } from "@chakra-ui/react";

export type NumberIconProps = {
    children: React.ReactNode;
} & FlexProps;

export const NumberIcon: React.FC<NumberIconProps> = (props) => {
    return (
        <Flex
          bgColor="#EDF2F7"
          border="1px solid #E2E8F0"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
          w="2.5em"
          h="2.5em"
          fontSize="1.3em"
          {...props}>{props.children}</Flex>
    )
};