import React, { useContext, useEffect } from "react";
import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, Stack, Text, useControllableState, useDisclosure, VStack } from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";
import { ModalContent } from "@chakra-ui/react";
import { ModalBody } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { LogoSvg2 } from "../svg/logoSvg2";
import { SocketIOContext } from "../../contexts/socketio-context";
import { BingoContext } from "../../contexts/bingo-context";

const BingoModalTypes = {
    Top: 0,
    Register: 1,
    Login: 2
} as const;
type BingoModalType = typeof BingoModalTypes[keyof typeof BingoModalTypes];

type BingoAccountModalBaseProps = {
    onClose: () => void
}
type BingoAccountModalProps = BingoAccountModalBaseProps & {
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
function BingoModalRegister(props: BingoAccountModalBaseProps) {
    const {socketio} = useContext(SocketIOContext);
    const [name, setName] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const bingo = useContext(BingoContext);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        socketio.emit("userRegister", {name: name});
        bingo.setName(name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack>
                <FormControl>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input placeholder="ビンゴ太郎" value={name} onChange={handleChangeName} />
                    <FormHelperText>みんなにわかりやすい名前を入力してください</FormHelperText>
                    <FormHelperText>本名である必要はありません</FormHelperText>
                </FormControl>
                <Button color="blackAlpha.900" bg="gray.100" size="lg" minW="9em" type="submit" isLoading={isLoading}>登録</Button>
            </VStack>
        </form>
    )
}

function BingoModalLogin(props: BingoAccountModalBaseProps) {
    const {socketio} = useContext(SocketIOContext);
    const [name, setName] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const bingo = useContext(BingoContext);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        socketio.emit("userAuth", {name: name});
        bingo.setName(name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack>
                <FormControl>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input placeholder="ビンゴ太郎" onChange={handleChangeName} value={name} />
                    <FormHelperText>登録したユーザー名を入力してください</FormHelperText>
                    <FormHelperText>わからない場合は新規登録してください</FormHelperText>
                </FormControl>
                <Button color="blackAlpha.900" bg="gray.100" size="lg" minW="9em" type="submit" isLoading={isLoading}>ログイン</Button>
            </VStack>
        </form>
    )
}

function BingoModalRouter(props: BingoAccountModalBaseProps) {
    const [ modalType, setModalType ] = useControllableState<BingoModalType>({defaultValue: BingoModalTypes.Top});

    switch (modalType) {
        case BingoModalTypes.Top:
            return <BingoModalTop {...props} setModalType={setModalType} />;
        case BingoModalTypes.Register:
            return <BingoModalRegister {...props} />;
        case BingoModalTypes.Login:
            return <BingoModalLogin {...props} />;
    }
}

export function BingoAccountModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { bingoCard } = useContext(BingoContext);

    useEffect(() => {
        onOpen();
    }, [onOpen]);
    useEffect(() => {
        if (isOpen && bingoCard.length > 0) {
            onClose();
        }
    }, [isOpen, bingoCard, onClose]);

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
                            <BingoModalRouter onClose={onClose} />
                        </Box>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}