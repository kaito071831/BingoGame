import React, { useEffect } from 'react';
import { Box, Container, Flex } from "@chakra-ui/react";
import { BingoNumber } from './bingoNumber';
import { ArraySplit } from "../../utils/arraySplit";

type BingoRow = {
    bingoNumber: number;
    isHit: boolean;
}

export const BingoCard: React.FC = () => {
    const [bingoCard, setBingoCard] = React.useState<BingoRow[][]>([]);
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

    useEffect(() => {
        // これはデバッグ用のテストデータです
        const newBingoCard = ArraySplit((new Array(25)).fill(Object.assign({}, {bingoNumber: 1, isHit: false}), 0, 25), 5).map((bingoRecord, index1) => {
            return bingoRecord.map((bingoRow, index2) => {
                if(index2 === index1)
                    return {bingoNumber: bingoRow.bingoNumber, isHit: true};
                return bingoRow;
            })
        });
        setBingoCard(newBingoCard);
    }, []);

    return (
        <Flex w="full" bg="#fff" borderRadius="10px" p="21px" gap="8px" flexDirection="column">{bingoItems}</Flex>
    )
}