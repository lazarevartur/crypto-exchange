"use client";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { CurrencySelect } from "@/components/exchage/CurrencySelect";
import { ExchangeRequest } from "@/components/modals";
import { useTokens } from "@/http/query/tokens";
import { useMemo } from "react";
import { useActiveChangeCurrency } from "@/state/activeChangeCurrency";
import { IReserveItem } from "@/lib/types/types";

const CryptoExchange = () => {
  const { prepareTokens } = useTokens();
  const tokens = useMemo(() => prepareTokens(), [prepareTokens]);

  const setActiveCurrency = useActiveChangeCurrency(
    (state) => state.setActiveCurrency,
  );

  const onChangeHandler = (direction: "from" | "to") => (item: IReserveItem) =>
    setActiveCurrency({ direction, ...item });

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
          <Box w="350px">
            <CurrencySelect
              options={tokens}
              onChange={onChangeHandler("from")}
            />
          </Box>
          <Box w="350px">
            <CurrencySelect options={tokens} onChange={onChangeHandler("to")} />
          </Box>

          <ExchangeRequest />
        </Flex>
      </Container>
    </Box>
  );
};

export { CryptoExchange };
