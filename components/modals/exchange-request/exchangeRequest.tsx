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

import { FirstStep } from "@/components/exchage/ExchangeRequest/FirstStep";
import { SecondStep } from "@/components/exchage/ExchangeRequest/SecondStep";
import { useEffect } from "react";
import { useActiveChangeCurrency } from "@/state/activeChangeCurrency";
import { IPaymentRequest } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import { useCreatePayment } from "@/http/mutation/paymentMutation";

const steps = [FirstStep, SecondStep];
const titles = ["Создать заявку на обмен", "Введите реквизиты"];

const ExchangeRequest = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, goToNext, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const { from, to, amount, recipient, network } = useActiveChangeCurrency();

  const ActiveStepComponent = steps[activeStep];
  const isLastStep = steps.length - 1 === activeStep;
  const { mutate, data, isPending } = useCreatePayment();

  const onClickHandler = () => {
    if (!isLastStep) {
      goToNext();
    }

    if (isLastStep) {
      const data: IPaymentRequest = {
        network: network ?? "Omni",
        from: {
          amount: amount.from.toString(),
          tokenNameOrId: from!.id,
        },
        to: {
          amount: amount.to.toString(),
          tokenNameOrId: to!.id,
        },
        recipient: {
          address: recipient!.address,
          email: recipient!.email,
        },
      };

      mutate(data);
    }
  };

  useEffect(() => {
    if (data?.id) {
      router.push(`/payment?id=${data?.id}`);
    }
  }, [data]);

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
    }
  }, [isOpen]);

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
            <Button
              bg="#fcbf11"
              w="100%"
              onClick={onClickHandler}
              isLoading={isPending}
            >
              Продолжить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export { ExchangeRequest };
