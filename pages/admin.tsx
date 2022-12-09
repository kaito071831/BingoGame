import { NextPage } from "next";
import { Header } from "../src/components/header";
import { BingoCard } from "../src/components/Bingo/bingoCard";
import { Alert, AlertIcon, Box, Button, Center, Container, Flex, Grid, GridItem, Text, useControllableState, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { BingoAccountModal } from "../src/components/modal/bingoAccountModal";
import { BingoModal, BingoModalType, BingoModalTypes } from "../src/components/modal/bingoModal";
import { useContext, useEffect } from "react";
import { HeaderAdmin } from "../src/components/headerAdmin";
import { BingoNumber } from "../src/components/Bingo/bingoNumber";
import { ReactIcon } from "../src/components/svg/reactIcon";
import { AdminBingoModal, AdminBingoModalTypes } from "../src/components/modal/adminBingoModal"; 
import { SocketIOContext, SocketIOProvider } from "../src/contexts/socketio-context";
import { BingoContext, BingoProvider } from "../src/contexts/bingo-context";
import { SpinResultMessage } from "../server/message/bingo";

const AdminContent: React.FC = () => {
    const adminBingoModal = useDisclosure();
    const [ adminBingoModalType, setAdminBingoModalType ] = useControllableState<AdminBingoModalTypes>({defaultValue: AdminBingoModalTypes.Bingo})
    const {hitNumbers, setHitNumbers} = useContext(BingoContext);
    const { socketio } = useContext(SocketIOContext);
    const [spinState, setSpinState] = useControllableState<boolean>({defaultValue: false});
    const [ hitNumber, setHitNumber ] = useControllableState<number>({defaultValue: 0});

    const handleSpin = () => {
        setSpinState(true);
        setTimeout(() => {
            socketio.emit("spin");
        }, 2000);
    }
    useEffect(() => {
        const handleSpinResult = (obj: SpinResultMessage) => {
            setSpinState(false);
            setHitNumber(obj.bingoNumber);
            setHitNumbers((prev) => [...prev, obj.bingoNumber]);
        };
        socketio.on("spinResult", handleSpinResult);
        return () => {
            socketio.off("spinResult", handleSpinResult);
        }
    }, [setSpinState, setHitNumber, setHitNumbers, socketio]);

    return (
        <Center flexDirection="column">
            <Text fontSize="10.5em" fontWeight="700" lineHeight={1} color="teal.600">{hitNumber}</Text>
            <Grid w="full" minH="340px" mt="24px" templateColumns="repeat(12, 1fr)">
                <GridItem colSpan={11}>
                    <Flex maxW="full" flexWrap="wrap" minH="full" p="1.5em" flexDir="row" gap="10px" bgColor="white" border="1px solid" borderColor="gray.200" borderRadius="12px">
                        {
                            [...hitNumbers].reverse().map((bingoNumber, index) =>
                                <BingoNumber key={index} type="hitNumber" bingoNumber={bingoNumber} />
                            )
                        }
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} ml="1em">
                    <Button rightIcon={<ReactIcon />} size="lg" w="full" bg="teal.500" color="white" onClick={handleSpin} isLoading={spinState}>Spin</Button>
                </GridItem>
            </Grid>
            <AdminBingoModal isOpen={adminBingoModal.isOpen} onClose={adminBingoModal.onClose} onOpen={adminBingoModal.onOpen} type={adminBingoModalType} setBingoModalType={setAdminBingoModalType} />
        </Center>
    )
}

const AdminPage: NextPage = () => {
    return (
        <BingoProvider>
            <SocketIOProvider>
                <Head>
                    <title>Bingo Admin</title>
                </Head>
                <HeaderAdmin />
                <Box as="main" mt="24px">
                    <Container maxW="container.xl">
                        <AdminContent />
                    </Container>
                </Box>
            </SocketIOProvider>
        </BingoProvider>
    );
}
export default AdminPage;