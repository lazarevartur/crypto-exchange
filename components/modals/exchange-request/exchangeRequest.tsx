"use client";
import {
  Button,
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
      <Radio value="1">
        Omni
      </Radio>
      <Radio value="2">
        Bep - 20
      </Radio>
    </Stack>
  </RadioGroup>
);

const ExchangeRequest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <Button h="60px" bg="#fcbf11" onClick={onOpen}>
        Обменять
      </Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создать заявку на обмен</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
            <Flex w='100%' mt='20px' justifyContent='center'>
              <SelectNetwork />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button bg="#fcbf11" w="100%" onClick={onClose}>
              Продолжить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ExchangeRequest };
