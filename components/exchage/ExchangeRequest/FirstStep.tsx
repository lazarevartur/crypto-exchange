import { Flex, Input, Text } from "@chakra-ui/react";
import { CurrencySelect } from "@/components/exchage/CurrencySelect";
import { InputStyles } from "@/components/exchage/styles";
import { SelectNetwork } from "@/components/exchage/SelectNetwork";
import { useTokens } from "@/http/query/tokens";
import { useMemo } from "react";

export const FirstStep = () => {
  const { prepareTokens } = useTokens();
  const tokens = useMemo(() => prepareTokens(), [prepareTokens]);

  return (
    <>
      <Flex flexDir="column">
        <Flex flexDir="column" gap="10px">
          <CurrencySelect options={tokens} />
          <Input type="number" sx={InputStyles} defaultValue={0} />
        </Flex>
        <Flex
          flexDir="column"
          my="35px"
          alignItems="center"
          fontSize="14px"
          color="#737373"
        >
          <Text>Скидка: 0 % (0.00 RUB)</Text>
          <Text>Минимум: 30000 Максимум: 900000</Text>
        </Flex>
        <Flex flexDir="column" gap="10px">
          <CurrencySelect options={tokens} />
          <Input type="number" sx={InputStyles} defaultValue={0} />
        </Flex>
      </Flex>
      <Flex w="100%" mt="20px" justifyContent="center">
        <SelectNetwork />
      </Flex>
    </>
  );
};
