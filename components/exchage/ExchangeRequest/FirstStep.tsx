import { Flex, Input, Text } from "@chakra-ui/react";
import { CurrencySelect } from "@/components/exchage/CurrencySelect";
import { InputStyles } from "@/components/exchage/styles";
import { SelectNetwork } from "@/components/exchage/SelectNetwork";
import { useTokens } from "@/http/query/tokens";
import { useEffect, useMemo, useState } from "react";
import { useActiveChangeCurrency } from "@/state/activeChangeCurrency";
import { Controller, useForm } from "react-hook-form";
import { IReserveItem } from "@/lib/types/types";
import { calculateExchangeAmount } from "@/app/api/_utils/utils";

type Inputs = {
  from: string;
  to: string;
  network: string;
};

export const FirstStep = () => {
  const { prepareTokens } = useTokens();
  const tokens = useMemo(() => prepareTokens(), [prepareTokens]);
  const { from, to, setAmount, setNetwork, setActiveCurrency } =
    useActiveChangeCurrency();

  const [direction, setDirection] = useState<"from" | "to">("from");
  const { register, watch, control, setValue } = useForm<Inputs>({
    defaultValues: {
      from: "",
      to: "",
    },
  });
  console.log(from);
  const onChangeHandler =
    (direction: "from" | "to") => (item: IReserveItem) => {
      setActiveCurrency({ direction, ...item });
    };

  const fromAmount = watch("from");
  const toAmount = watch("to");
  const network = watch("network");

  useEffect(() => {
    const direction = "from";
    setAmount({ direction, amount: Number(fromAmount) });
  }, [fromAmount]);

  useEffect(() => {
    const direction = "to";
    setAmount({ direction, amount: Number(toAmount) });
  }, [toAmount]);

  useEffect(() => {
    if (direction === "from") {
      if (from?.price && to?.price) {
        const totalPrice = calculateExchangeAmount({
          amount: Number(fromAmount),
          sourceToUsdRate: from.price,
          targetToUsdRate: to.price,
        });
        setValue("to", totalPrice.toString());
      }
    }
    if (direction === "to") {
      if (from?.price && to?.price) {
        const totalPrice = calculateExchangeAmount({
          amount: Number(toAmount),
          sourceToUsdRate: to.price,
          targetToUsdRate: from.price,
        });
        setValue("from", totalPrice.toString());
      }
    }
  }, [direction, from, to, fromAmount, toAmount]);

  useEffect(() => {
    setNetwork(network);
  }, [network]);

  return (
    <>
      <Flex flexDir="column">
        <Flex flexDir="column" gap="10px">
          <CurrencySelect
            options={tokens}
            defaultValue={from}
            onChange={onChangeHandler("from")}
          />
          <Input
            {...register("from")}
            type="number"
            sx={InputStyles}
            onFocus={() => setDirection("from")}
            isDisabled={!from}
          />
        </Flex>
        <Flex
          flexDir="column"
          my="35px"
          alignItems="center"
          fontSize="14px"
          color="#737373"
        >
          <Text>Скидка: 0 % (0.00 RUB)</Text>
          {from?.min && from?.amount && (
            <Text>
              Минимум: {from?.min} Максимум: {from?.amount}
            </Text>
          )}
        </Flex>
        <Flex flexDir="column" gap="10px">
          <CurrencySelect
            options={tokens}
            defaultValue={to}
            onChange={onChangeHandler("to")}
          />
          <Input
            {...register("to")}
            type="number"
            sx={InputStyles}
            onFocus={() => setDirection("to")}
            isDisabled={!to}
          />
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
