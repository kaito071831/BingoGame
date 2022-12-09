import { NextPage } from "next";
import { Header } from "../src/components/header";
import { BingoCard } from "../src/components/Bingo/bingoCard";
import { Alert, AlertIcon, Box, Center, Container, Flex, Text, useControllableState, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { BingoAccountModal } from "../src/components/modal/bingoAccountModal";
import { BingoModal, BingoModalType, BingoModalTypes } from "../src/components/modal/bingoModal";
import { useContext, useEffect } from "react";
import { BingoContext, BingoProvider } from "../src/contexts/bingo-context";
import { SocketIOProvider } from "../src/contexts/socketio-context";

const BingoContent: React.FC = () => {
    const {name} = useContext(BingoContext);
    return (
        <Center flexDirection="column">
            <Box p="24px">
                <Text fontSize="lg" fontWeight="bold">{name} さんのビンゴカード</Text>
            </Box>
            <BingoCard />
            <Box w="full" mt="12px">
                <Alert status="info" bg="#E2E8F0" w="full" borderRadius="6px">
                    <AlertIcon color="#718096" />
                    参加中：*人
                </Alert>
            </Box>
        </Center>
    );
}

const BingoPage: NextPage = () => {
    const bingoModal = useDisclosure();
    const [ bingoModalType, setBingoModalType ] = useControllableState<BingoModalType>({defaultValue: BingoModalTypes.Result});

    return (
        <BingoProvider>
            <SocketIOProvider>
                <Head>
                    <title>Bingo</title>
                </Head>
                <Header />
                <Box as="main">
                    <Container>
                        <BingoContent />
                    </Container>
                </Box>
                <BingoAccountModal />
                <BingoModal type={bingoModalType} isOpen={bingoModal.isOpen} onClose={bingoModal.onClose} onOpen={bingoModal.onOpen} setBingoModalType={setBingoModalType} />
            </SocketIOProvider>
        </BingoProvider>
    );
}
export default BingoPage;