import React, { useContext, useEffect } from 'react';
import { Box, Container, Flex } from "@chakra-ui/react";
import { BingoNumber } from './bingoNumber';
import { ArraySplit } from "../../utils/arraySplit";
import { BingoContext } from '../../contexts/bingo-context';



export const BingoCard: React.FC = () => {
    const { bingoCard } = useContext(BingoContext);
    const bingoItems = bingoCard.map((bingoRecord, index1) => {
        return (
            <Flex justifyContent="space-between" gap="8px" key={index1}>
                {bingoRecord.map((bingoRow, index2) => {
                    if(index1 === 2 && index2 === 2) {
                        return <BingoNumber type="center" key={index2} />
                    }
                    return <BingoNumber type={bingoRow.isHit ? "hitNumber" : "normalNumber"} key={index2} bingoNumber={bingoRow.bingoNumber} />
             })}
            </Flex>
        )
    });

    return (
        <Flex w="full" bg="#fff" borderRadius="10px" p="21px" gap="8px" flexDirection="column">{bingoItems}</Flex>
    )
}