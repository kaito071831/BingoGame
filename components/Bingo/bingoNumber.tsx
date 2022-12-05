import React from 'react';
import { Box, Container, Flex } from "@chakra-ui/react";

type BingoNumberProps = {
    type: "normalNumber" | "hitNumber";
    bingoNumber: number;
}
type BingoCenterProps = {
    type: "center";
}
type Props = BingoNumberProps | BingoCenterProps;

const isBingoCenter = (props: Props): props is BingoCenterProps => props.type === "center";

export const BingoNumber: React.FC<Props> = (props) => {
    return (
        <Flex bg={props.type === "hitNumber" ? "#319795" : props.type === "center" ? "#D69E2E" : "#EDF2F7"}
          border="1px solid #E2E8F0"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
          w="2.5em"
          h="2.5em"
          fontSize="1.3em"
          color={props.type !== "normalNumber" ? "#fff" : "#000"}>
            {
                isBingoCenter(props) ? "＊" : props.bingoNumber
            }
        </Flex>
    )
};