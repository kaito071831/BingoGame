import React from "react";
import { Alert, AlertIcon, Box, Button, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { LogoSvg } from "./svg/logoSvg";

export const HeaderAdmin: React.FC = () => {
    return (
        <Box as="header" bg="#fff" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" w="full" h="56px">
            <Container maxW="container.lg" h="full">
                <Flex h="full" alignItems="center" justifyContent="space-between">
                    <LogoSvg />
                    <Flex flexDir="row" gap={4} justifyContent="end">
                        <Alert status="info" bg="transparent" flexBasis="max-content" h="35px" border="1px solid" borderColor="gray.200" borderRadius="6px">
                            <AlertIcon color="gray.500" />
                            <Text fontSize="1em" fontWeight="700" color="gray.700">参加中：0人</Text>
                        </Alert>
                        <Button size="lg" variant="outline" w="120px" h="35px" bgColor="gray.100" border="1px solid" borderRadius="6px" borderColor="gray.200" fontSize="1em" fontWeight="600">リセット</Button>
                        <Button size="lg" variant="outline" w="120px" h="35px" bgColor="gray.100" border="1px solid" borderRadius="6px" borderColor="gray.200" fontSize="1em" fontWeight="600">リスタート</Button>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
};