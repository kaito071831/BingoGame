import React, { useContext, useEffect } from "react";
import { Button, Flex, FormControl, FormHelperText, FormLabel, Icon, Input, Stack, Text, useControllableState, useDisclosure, VStack } from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";
import { ModalContent } from "@chakra-ui/react";
import { ModalBody } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { LogoSvg2 } from "../svg/logoSvg2";
import { CheckIcon } from "@chakra-ui/icons";
import { FilterIcon } from "../svg/filterIcon";
import { SocketIOContext } from "../../contexts/socketio-context";
import { BingoContext } from "../../contexts/bingo-context";
import { PrizeResultMessage } from "../../../server/message/prize";

export const BingoModalTypes = {
    Bingo: 1,
    Drawing: 2,
    Result: 3
} as const;
export type BingoModalType = typeof BingoModalTypes[keyof typeof BingoModalTypes];

type BingoModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    type: BingoModalType;
    setBingoModalType: (type: BingoModalType) => void;
    prizeResult: PrizeResultMessage | null;
}

function BingoModalBingo(props: BingoModalProps) {
    const {socketio} = useContext(SocketIOContext);

    const handleClickBingoDraw = () => {
        socketio.emit("requestPrize");
        props.setBingoModalType(BingoModalTypes.Drawing);
    };

    return (
        <VStack>
            <Box>
                <Flex w="48px" h="48px" bg="green.100" borderRadius="50%" justifyContent="center" alignItems="center">
                    <CheckIcon w="24px" h="24px" color="green.500" />
                </Flex>
            </Box>
            <Text fontSize="2xl" fontWeight="bold">BINGO！！</Text>
            <Text color="gray.500" fontSize="sm">「景品抽選」ボタンを押してください</Text>
            <Box mt="2rem" w="100%">
                <Button size="md" w="100%" color="white" bgColor="yellow.500" onClick={handleClickBingoDraw}>景品抽選</Button>
            </Box>
        </VStack>
    )
}

function BingoModalDrawing(props: BingoModalProps) {
    return (
        <VStack>
            <Box>
                <Flex w="48px" h="48px" bg="yellow.500" borderRadius="50%" justifyContent="center" alignItems="center">
                    <Icon as={FilterIcon} w="24px" h="24px" color="white" />
                </Flex>
            </Box>
            <Text fontSize="2xl" fontWeight="bold">景品抽選中...</Text>
            <Text color="gray.500" fontSize="sm">スクリーンにご注目！！</Text>
        </VStack>
    )
}

function BingoModalResult(props: BingoModalProps) {
    const handleClickClose = () => {
        props.onClose();
    };

    return (
        <VStack>
            <Text fontSize="2xl" fontWeight="bold">おめでとうございます！！</Text>
            <Box>
                <Flex w="48px" h="48px" bg="orange.500" color="whiteAlpha.900" fontSize="1.2em" borderRadius="50%" justifyContent="center" alignItems="center">{props.prizeResult?.prizeNumber.prizeNumber}</Flex>
            </Box>
            <Text color="gray.500" fontSize="sm">表示された景品番号の景品と</Text>
            <Text color="gray.500" fontSize="sm">引き換えてください</Text>
            <Box mt="2rem" w="100%">
                <Button size="md" w="100%" bgColor="gray.200" onClick={handleClickClose}>閉じる</Button>
            </Box>
        </VStack>
    )
}

function BingoModalRouter(props: BingoModalProps) {
    switch (props.type) {
        case BingoModalTypes.Bingo:
            return <BingoModalBingo {...props} />
        case BingoModalTypes.Drawing:
            return <BingoModalDrawing {...props} />
        case BingoModalTypes.Result:
            return <BingoModalResult {...props} />
    }
}

export function BingoModal(props: BingoModalProps) {
    return (
        <Modal isOpen={props.isOpen} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent mx="1rem">
                <ModalBody p="2em 0">
                    <Container>
                        <BingoModalRouter {...props} />
                    </Container>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}