"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import { useCreatePayment } from "@/http/mutation/useCreatePayment";
import { FirstStep } from "@/components/exchage/ExchangeRequest/FirstStep";
import { SecondStep } from "@/components/exchage/ExchangeRequest/SecondStep";

const steps = [FirstStep, SecondStep];

const ExchangeRequest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, goToNext } = useSteps({
    index: 0,
    count: steps.length,
  });

  const ActiveStepComponent = steps[activeStep];
  const isLastStep = steps.length - 1 === activeStep;
  const { mutate } = useCreatePayment();

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

    mutate(data);

    alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <Button h="60px" bg="#fcbf11" onClick={onOpen}>
        Обменять
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
