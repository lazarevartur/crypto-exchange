import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";

const CryptoExchange = () => {
  return (
    <Box color="white" bg="#0f0965" maxH="300px" w="100%">
      <Container
        display="flex"
        flexDir="column"
        alignItems="center"
        py="50px"
        gap="30px"
        maxW="container.xl"
      >
        <Heading as="h1" fontSize="30px" fontWeight="500">
          Самый реактивный обменник
        </Heading>
        <Text fontSize="18px" lineHeight="120%">
          Быстрый и безопасный способ обменять более 20 популярных криптовалют
        </Text>
        <Flex gap="1px">
          <Flex w="350px" h="60px" bg="white" />
          <Flex w="350px" h="60px" bg="white" />
          <Button h="60px">Обменять</Button>
        </Flex>
      </Container>
    </Box>
  );
};

export { CryptoExchange };