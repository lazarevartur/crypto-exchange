import { Flex, Input, Text } from "@chakra-ui/react";
import { CurrencySelect } from "@/components/exchage/CurrencySelect";
import { InputStyles } from "@/components/exchage/styles";
import { SelectNetwork } from "@/components/exchage/SelectNetwork";
import { useTokens } from "@/http/query/tokens";
import { useEffect, useMemo } from "react";
import { useActiveChangeCurrency } from "@/state/activeChangeCurrency";
import { Controller, useForm } from "react-hook-form";

type Inputs = {
  from: string;
  to: string;
  network: string;
};

export const FirstStep = () => {
  const { prepareTokens } = useTokens();
  const tokens = useMemo(() => prepareTokens(), [prepareTokens]);
  const { from, to, setAmount, setNetwork } = useActiveChangeCurrency();

  const { register, watch, control } = useForm<Inputs>();

  const fromAmount = watch("from");
  const toAmount = watch("to");
  const network = watch("network");

  useEffect(() => {
    setAmount({ direction: "from", amount: Number(fromAmount) });
    setAmount({ direction: "to", amount: Number(toAmount) });
    setNetwork(network)
  }, [fromAmount, toAmount, network]);

  return (
    <>
      <Flex flexDir="column">
        <Flex flexDir="column" gap="10px">
          <CurrencySelect options={tokens} defaultValue={from} />
          <Input {...register("from")} type="number" sx={InputStyles} />
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
          <CurrencySelect options={tokens} defaultValue={to} />
          <Input {...register("to")} type="number" sx={InputStyles} />
        </Flex>
      </Flex>
      <Flex w="100%" mt="20px" justifyContent="center">
        <Controller
          render={({ field: { onChange } }) => (
            <SelectNetwork onChange={onChange} />
          )}
          control={control}
          name="network"
        />
      </Flex>
    </>
  );
};
