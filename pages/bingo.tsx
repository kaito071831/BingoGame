import { NextPage } from "next";
import { Header } from "../src/components/header";
import { BingoCard } from "../src/components/Bingo/bingoCard";
import { Alert, AlertIcon, Box, Center, Container, Flex, Text, useControllableState, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { BingoAccountModal } from "../src/components/modal/bingoAccountModal";
import { BingoModal, BingoModalType, BingoModalTypes } from "../src/components/modal/bingoModal";
import { useContext, useEffect } from "react";
import { BingoContext, BingoProvider } from "../src/contexts/bingo-context";
import { SocketIOContext, SocketIOProvider } from "../src/contexts/socketio-context";
import { BingoMessage } from "../server/message/bingo";
import { PrizeResultMessage } from "../server/message/prize";
import useSound from "use-sound";

const BingoContent: React.FC = () => {
    const {socketio} = useContext(SocketIOContext);
    const {name} = useContext(BingoContext);
    const bingoModal = useDisclosure();
    const [ bingoModalType, setBingoModalType ] = useControllableState<BingoModalType>({defaultValue: BingoModalTypes.Bingo});
    const [ activePrizeResult, setActivePrizeResult ] = useControllableState<PrizeResultMessage>({defaultValue: null!});
    const [play] = useSound("../public/Decision.wav");

    useEffect(() => {
        const handleBingo = (obj: BingoMessage) => {
            play();
            console.log(obj);
            setBingoModalType(BingoModalTypes.Bingo);
            bingoModal.onOpen();
        }
        const handlePrizeResult = (obj: PrizeResultMessage) => {
            console.log(obj);
            setTimeout(() => {
                setActivePrizeResult(obj);
                setBingoModalType(BingoModalTypes.Result);
            }, 2000);
        }
        socketio.on("bingo", handleBingo);
        socketio.on("prizeResult", handlePrizeResult);

        return () => {
            socketio.off("bingo", handleBingo);
            socketio.off("prizeResult", handlePrizeResult);
        }
    }, [socketio, bingoModal, setBingoModalType, setActivePrizeResult, play]);

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
            <BingoModal type={bingoModalType} prizeResult={activePrizeResult} isOpen={bingoModal.isOpen} onClose={bingoModal.onClose} onOpen={bingoModal.onOpen} setBingoModalType={setBingoModalType} />
        </Center>
    );
}

const BingoPage: NextPage = () => {
    return (
        <SocketIOProvider>
            <BingoProvider>
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
            </BingoProvider>
        </SocketIOProvider>
    );
}
export default BingoPage;