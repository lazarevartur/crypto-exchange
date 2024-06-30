import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  TabList,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useTokens } from "@/http/query/tokens";
import { useMemo, useState } from "react";
import { Tab, TabPanel } from "@/components/tabs";
import { useGetTags } from "@/http/query/tags";
import { ReserveItemsList } from "@/components/reserves";
import { useForm } from "react-hook-form";
import { ICreateTokenRequest } from "@/lib/types/types";
import { useCreateToken, useDeleteTokenById } from "@/http/mutation/tokens";
import { UpdateToken } from "@/components/admin/modal/UpdateToken";

interface Inputs extends ICreateTokenRequest {}

export const Tokens = () => {
  const { prepareTokens } = useTokens();
  const { prepareTags } = useGetTags();
  const tokens = useMemo(() => prepareTokens(), [prepareTokens]);
  const categories = useMemo(() => prepareTags(), [prepareTags]);

  const { mutate, isPending } = useCreateToken();
  const { mutate: deleteTokenById } = useDeleteTokenById();

  const { register, handleSubmit } = useForm<Inputs>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [idForUpdate, setIdForUpdate] = useState<string | undefined>();

  const onSubmit = (data: Inputs) => {
    mutate({
      ...data,
      price: Number(data.price),
      min: Number(data.min),
      amount: Number(data.amount),
    });
  };

  const onDeleteHandler = (id: string) => {
    console.log("onDeleteHandler", id);
    const isConfirm = confirm(`Вы уверены что хотите удалить токен?`);
    if (isConfirm) {
      deleteTokenById(id);
    }
  };
  const onUpdateHandler = (id: string) => {
    console.log("onUpdateHandler", id);
    setIdForUpdate(id);
    onOpen();
  };

  const onCloseHandler = () => {
    onClose();
    setIdForUpdate(undefined);
  };

  return (
    <>
      <UpdateToken isOpen={isOpen} onClose={onCloseHandler} id={idForUpdate} />
      <Flex flexDirection="column" gap="20px">
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Добавить токен
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex
                as="form"
                gap="10px"
                onSubmit={handleSubmit(onSubmit)}
                flexDirection="column"
              >
                <InputGroup maxW="30%">
                  <InputLeftAddon>Имя токена</InputLeftAddon>
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="Name"
                    isRequired
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Адрес</InputLeftAddon>
                  <Input
                    {...register("address")}
                    type="text"
                    placeholder="Address"
                    isRequired
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Symbol</InputLeftAddon>
                  <Input
                    {...register("symbol")}
                    type="text"
                    placeholder="Symbol"
                    isRequired
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Url картинки</InputLeftAddon>
                  <Input
                    {...register("imageUrl")}
                    type="text"
                    placeholder="Url картинки"
                    isRequired
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Доп. текст (опционально)</InputLeftAddon>
                  <Input
                    {...register("infoText")}
                    type="text"
                    placeholder="Доп. текст"
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Network</InputLeftAddon>
                  <Input
                    {...register("network")}
                    type="text"
                    placeholder="Network"
                    isRequired
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Количество токенов</InputLeftAddon>
                  <Input
                    {...register("amount")}
                    type="number"
                    placeholder="Количество токенов"
                    isRequired
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Цена</InputLeftAddon>
                  <Input
                    {...register("price")}
                    type="number"
                    step="0.01"
                    placeholder="Цена"
                    isRequired
                  />
                </InputGroup>
                <InputGroup maxW="30%">
                  <InputLeftAddon>Мин.колов</InputLeftAddon>
                  <Input
                    {...register("min")}
                    type="number"
                    step="0.01"
                    placeholder="Мин.колов"
                    isRequired
                  />
                </InputGroup>
                <Button type="submit" isLoading={isPending}>
                  Создать токен
                </Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Flex flexDirection="column">
          <Heading
            as="h2"
            fontSize="26px"
            fontWeight={600}
            lineHeight="120%"
            color="#212121"
            mb="10px"
          >
            Все токены
          </Heading>
          <Flex flexDirection="column">
            <Tabs variant="unstyled">
              <TabList gap="8px" mb="16px">
                <Tab>all</Tab>
                {categories.map((item, i) => (
                  <Tab key={i}>{item}</Tab>
                ))}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ReserveItemsList
                    data={tokens}
                    onUpdate={onUpdateHandler}
                    onDelete={onDeleteHandler}
                  />
                </TabPanel>
                {categories.map((item, i) => (
                  <TabPanel key={i}>
                    <ReserveItemsList
                      data={tokens}
                      filterBy={item}
                      onUpdate={onUpdateHandler}
                      onDelete={onDeleteHandler}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
