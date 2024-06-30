import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/http/queryKeys";
import { Token } from "@prisma/client";
import { useForm } from "react-hook-form";
import { ICreateTokenRequest } from "@/lib/types/types";
import { useEffect } from "react";
import { useUpdateTokenById } from "@/http/mutation/tokens";

interface Inputs extends ICreateTokenRequest {}

export function UpdateToken({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}) {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useUpdateTokenById();

  const onSubmit = (data: Inputs) => {
    if (id) {
      mutate({
        id,
        ...data,
        price: Number(data.price),
        min: Number(data.min),
        amount: Number(data.amount),
      });
    }
  };

  const tokensCache = queryClient
    .getQueryCache()
    .find({ queryKey: [queryKeys.useTokens] })?.state.data as
    | Token[]
    | undefined;

  const token = tokensCache?.find((token) => token.id === id);

  useEffect(() => {
    if (token) {
      setValue("name", token.name);
      setValue("address", token.address);
      setValue("symbol", token.symbol);
      setValue("imageUrl", token.imageUrl);
      setValue("infoText", token.infoText ?? "");
      setValue("network", token.network);
      setValue("amount", token.amount);
      setValue("price", token.price);
      setValue("min", token.min);
    }
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  if (!token) {
    return null;
  }

  return (
    <Modal isOpen={isOpen && !!token} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Обновление токена</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="10px" flexDirection="column" w="100%">
            <InputGroup>
              <InputLeftAddon>Имя токена</InputLeftAddon>
              <Input
                {...register("name")}
                type="text"
                placeholder="Name"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Адрес</InputLeftAddon>
              <Input
                {...register("address")}
                type="text"
                placeholder="Address"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Symbol</InputLeftAddon>
              <Input
                {...register("symbol")}
                type="text"
                placeholder="Symbol"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Url картинки</InputLeftAddon>
              <Input
                {...register("imageUrl")}
                type="text"
                placeholder="Url картинки"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Доп. текст (опционально)</InputLeftAddon>
              <Input
                {...register("infoText")}
                type="text"
                placeholder="Доп. текст"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Network</InputLeftAddon>
              <Input
                {...register("network")}
                type="text"
                placeholder="Network"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Количество токенов</InputLeftAddon>
              <Input
                {...register("amount")}
                type="number"
                placeholder="Количество токенов"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Цена</InputLeftAddon>
              <Input
                {...register("price")}
                type="number"
                step="0.0001"
                placeholder="Цена"
                isRequired
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Мин.колов</InputLeftAddon>
              <Input
                {...register("min")}
                type="number"
                step="0.01"
                placeholder="Мин.колов"
                isRequired
              />
            </InputGroup>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3} isLoading={isPending}>
            Обновить токен
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
