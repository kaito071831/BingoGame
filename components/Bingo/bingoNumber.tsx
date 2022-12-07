import React from 'react';
import { Box, Container, Flex, LayoutProps } from "@chakra-ui/react";
import { NumberIcon, NumberIconProps } from "./numberIcon";

type BingoNumberProps = {
    type: "normalNumber" | "hitNumber";
    bingoNumber: number;
}
type BingoCenterProps = {
    type: "center";
}
type Props = BingoNumberProps | BingoCenterProps;

const isBingoCenter = (props: Props): props is BingoCenterProps => props.type === "center";

export const BingoNumber: React.FC<Props & NumberIconProps> = (props) => {
    return (
        <NumberIcon bg={props.type === "hitNumber" ? "#319795" : props.type === "center" ? "#D69E2E" : "#EDF2F7"}
          color={props.type !== "normalNumber" ? "#fff" : "#000"} {...props}>
            {
                isBingoCenter(props) ? "＊" : props.bingoNumber
            }
        </NumberIcon>
    )
};