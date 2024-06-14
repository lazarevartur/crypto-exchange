"use client";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  SystemStyleObject,
  Text,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import { MockData } from "@/mock";
import { CurrencySelect } from "@/components/exchage/CurrencySelect";

const InputStyles: SystemStyleObject = {
  border: "0px",
  borderBottom: "1px",
  borderRadius: "none",
  borderColor: "#0500ff",
  pl: "0px",
  textAlign: "center",
  color: "#212121",
  fontWeight: 600,
  fontSize: "24px",
  _hover: { borderColor: "#0500ff" },
  _focusVisible: {
    boxShadow: "none",
  },
};

const SelectNetwork = () => (
  <RadioGroup defaultValue="1" colorScheme="yellow">
    <Stack spacing={5} direction="row">
      <Radio value="1">Omni</Radio>
      <Radio value="2">Bep - 20</Radio>
    </Stack>
  </RadioGroup>
);

const FirstStep = () => (
  <>
    <Flex flexDir="column">
      <Flex flexDir="column" gap="10px">
        <CurrencySelect options={MockData} />
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
        <CurrencySelect options={MockData} />
        <Input type="number" sx={InputStyles} defaultValue={0} />
      </Flex>
    </Flex>
    <Flex w="100%" mt="20px" justifyContent="center">
      <SelectNetwork />
    </Flex>
  </>
);

const SecondStepInputGroutStyles: SystemStyleObject = {
  flexDir: "column",
  fontSize: "16px",
  fontWeight: 600,
  color: "black",
  gap: "10px",
  input: {
    h: "56px",
    bg: "rgba(227, 227, 227, .4)",
    borderRadius: "7px",
  },
};

const SecondStep = () => (
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

const steps = [FirstStep, SecondStep];

const ExchangeRequest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { activeStep, goToNext } = useSteps({
    index: 1,
    count: steps.length,
  });

  const ActiveStepComponent = steps[activeStep];
  const isLastStep = steps.length - 1 === activeStep;

  const titles = ["Создать заявку на обмен", "Введите реквизиты"];

  const onClickHandler = () => {
    if (!isLastStep) {
      goToNext();
    }
    const data = {
      from: {
        tokenNameOrId: "BTC",
        amount: "1",
      },
      to: {
        tokenNameOrId: "AVAX",
        amount: "2178",
      },
      recipient: {
        address: "0xf45F49a56d981b05CA4d915f874693AC02044e0f",
        email: "kek@gmail.com",
      },
    };

    alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <Button h="60px" bg="#fcbf11" onClick={onOpen}>
        Обменять
      </Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titles[activeStep]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActiveStepComponent />
          </ModalBody>
          <ModalFooter>
            <Button bg="#fcbf11" w="100%" onClick={onClickHandler}>
              Продолжить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ExchangeRequest };
