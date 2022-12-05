import React, { useEffect } from "react";
import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, Stack, Text, useControllableState, useDisclosure, VStack } from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";
import { ModalContent } from "@chakra-ui/react";
import { ModalBody } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { LogoSvg2 } from "../logoSvg2";

const BingoModalTypes = {
    Top: 0,
    Register: 1,
    Login: 2
} as const;
type BingoModalType = typeof BingoModalTypes[keyof typeof BingoModalTypes];

type BingoAccountModalProps = {
    setModalType: React.Dispatch<React.SetStateAction<BingoModalType>>
}

function BingoModalTop(props: BingoAccountModalProps) {
    return (
        <VStack spacing={4}>
            <Button color="blackAlpha.900" bg="gray.100" size="lg" minW="9em" onClick={() => props.setModalType(BingoModalTypes.Register)}>ユーザー登録</Button>
            <Button color="blackAlpha.900" bg="gray.100" size="lg" minW="9em" onClick={() => props.setModalType(BingoModalTypes.Login)}>ログイン</Button>
        </VStack>
    )
}
function BingoModalRegister() {
    return (
        <VStack>
            <FormControl>
                <FormLabel>ユーザー名</FormLabel>
                <Input placeholder="ビンゴ太郎" />
                <FormHelperText>みんなにわかりやすい名前を入力してください</FormHelperText>
                <FormHelperText>本名である必要はありません</FormHelperText>
            </FormControl>
            <Button color="blackAlpha.900" bg="gray.100" size="lg" minW="9em">登録</Button>
        </VStack>
    )
}

function BingoModalLogin() {
    return (
        <VStack>
            <FormControl>
                <FormLabel>ユーザー名</FormLabel>
                <Input placeholder="ビンゴ太郎" />
                <FormHelperText>登録したユーザー名を入力してください</FormHelperText>
                <FormHelperText>わからない場合は新規登録してください</FormHelperText>
            </FormControl>
            <Button color="blackAlpha.900" bg="gray.100" size="lg" minW="9em">登録</Button>
        </VStack>
    )
}

function BingoModalRouter() {
    const [ modalType, setModalType ] = useControllableState<BingoModalType>({defaultValue: BingoModalTypes.Top});

    switch (modalType) {
        case BingoModalTypes.Top:
            return <BingoModalTop setModalType={setModalType} />;
        case BingoModalTypes.Register:
            return <BingoModalRegister />;
        case BingoModalTypes.Login:
            return <BingoModalLogin />;
    }
}

export function BingoAccountModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent mx="1rem">
                <ModalBody>
                    <Stack m="1rem 0" spacing={8}>
                        <Box h="5em">
                            <LogoSvg2 />
                        </Box>
                        <Box>
                            <BingoModalRouter />
                        </Box>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}