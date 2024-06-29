"use client";

import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useGetTags } from "@/http/query/tags";
import React, { useMemo } from "react";
import { useCreateTag, useDeleteTagByName } from "@/http/mutation/tags";

interface Inputs {
  name: string;
}

export const Tags = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { prepareTags } = useGetTags();
  const tags = useMemo(() => prepareTags(), [prepareTags]);

  const { mutate, isPending } = useCreateTag();
  const { mutate: deleteTagMutate } = useDeleteTagByName();

  const onSubmit = ({ name }: Inputs) => {
    if (name) {
      mutate(name);
    }
  };

  return (
    <Flex flexDirection="column" gap="20px">
      <Flex flexDirection="column">
        <Heading
          as="h2"
          fontSize="26px"
          fontWeight={600}
          lineHeight="120%"
          color="#212121"
          mb="10px"
        >
          Добавить тег
        </Heading>
        <Flex as="form" gap="10px" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup maxW="30%">
            <InputLeftAddon>Имя тега</InputLeftAddon>
            <Input {...register("name")} type="text" placeholder="Name" />
          </InputGroup>
          <Button type="submit" isLoading={isPending}>
            Сохранить
          </Button>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap="20px">
        <Heading
          as="h2"
          fontSize="26px"
          fontWeight={600}
          lineHeight="120%"
          color="#212121"
          mb="10px"
        >
          Активные теги
        </Heading>
        <UnorderedList>
          {tags.map((item) => (
            <ListItem key={item}>
              <Flex gap="10px">
                {item}
                <Text
                  color="red"
                  fontWeight={600}
                  cursor="pointer"
                  onClick={() => {
                    const isConfirm = confirm(`Удалить ${item}`);
                    if (isConfirm) {
                      deleteTagMutate(item);
                    }
                  }}
                >
                  X
                </Text>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Flex>
  );
};
