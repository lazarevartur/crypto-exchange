import { Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import { SecondStepInputGroutStyles } from "@/components/exchage/styles";
import { useActiveChangeCurrency } from "@/state/activeChangeCurrency";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Inputs = {
  email: string;
  address: string;
  checkbox: boolean;
};

export const SecondStep = () => {
  const setRecipient = useActiveChangeCurrency((state) => state.setRecipient);

  const { register, watch } = useForm<Inputs>();

  const email = watch("email");
  const address = watch("address");
  const checkbox = watch("checkbox");

  useEffect(() => {
    setRecipient({ email, address });
  }, [email, address, checkbox]);

  return (
    <Flex flexDir="column" gap="35px">
      <Flex sx={SecondStepInputGroutStyles}>
        <Text>Адрес получателя:</Text>
        <Input {...register("address")} />
      </Flex>
      <Flex sx={SecondStepInputGroutStyles}>
        <Text>E-mail:</Text>
        <Input {...register("email")} />
      </Flex>
      {/*<Flex flexDir="column">Есть промокод?</Flex>*/}
      <Checkbox {...register("checkbox")} defaultChecked isRequired>
        <Text fontSize="14px">
          Вы соглашаетесь с правилами сервиса и регламентом проведения
          AML-проверок
        </Text>
      </Checkbox>
    </Flex>
  );
};
