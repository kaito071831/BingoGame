import { NextPage } from "next";
import { Header } from "../components/header";
import { BingoCard } from "../components/Bingo/bingoCard";
import { Alert, AlertIcon, Box, Center, Container, Flex, Text, useControllableState, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { BingoAccountModal } from "../components/modal/bingoAccountModal";
import { BingoModal, BingoModalType, BingoModalTypes } from "../components/modal/bingoModal";
import { useEffect } from "react";

const BingoPage: NextPage = () => {
    const bingoModal = useDisclosure();
    const [ bingoModalType, setBingoModalType ] = useControllableState<BingoModalType>({defaultValue: BingoModalTypes.Result});

    return (
        <>
            <Head>
                <title>Bingo</title>
            </Head>
            <Header />
            <Box as="main">
                <Container>
                    <Center flexDirection="column">
                        <Box p="24px">
                            <Text fontSize="lg" fontWeight="bold">Chakra さんのビンゴカード</Text>
                        </Box>
                        <BingoCard />
                        <Box w="full" mt="12px">
                            <Alert status="info" bg="#E2E8F0" w="full" borderRadius="6px">
                                <AlertIcon color="#718096" />
                                参加中：0人
                            </Alert>
                        </Box>
                    </Center>
                </Container>
            </Box>
            <BingoAccountModal />
            <BingoModal type={bingoModalType} isOpen={bingoModal.isOpen} onClose={bingoModal.onClose} onOpen={bingoModal.onOpen} setBingoModalType={setBingoModalType} />
        </>
    );
}
export default BingoPage;