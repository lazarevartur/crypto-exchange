import { Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import { SecondStepInputGroutStyles } from "@/components/exchage/styles";

export const SecondStep = () => (
  <Flex flexDir="column" gap="35px">
    <Flex sx={SecondStepInputGroutStyles}>
      <Text>Реквизиты получателя:</Text>
      <Input />
    </Flex>
    <Flex sx={SecondStepInputGroutStyles}>
      <Text>E-mail:</Text>
      <Input />
    </Flex>
    <Flex flexDir="column">Есть промокод?</Flex>
    <Checkbox defaultChecked>
      <Text fontSize="14px">
        {" "}
        Вы соглашаетесь с правилами сервиса и регламентом проведения
        AML-проверок
      </Text>
    </Checkbox>
  </Flex>
);
