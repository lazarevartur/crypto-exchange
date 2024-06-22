"use client";
import {
  Container,
  Flex,
  Heading,
  Image,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useMemo } from "react";

import type { IReserveItem } from "@/lib/types/types";
import { useTokens } from "@/http/query/tokens";
import { useGetTags } from "@/http/query/tags";
import { Tab, TabPanel } from "@/components/tabs";

const ReserveItem = ({
  name,
  amount,
  icon,
}: {
  name: string;
  amount: number;
  icon: string;
}) => {
  return (
    <Flex
      bg="white"
      p="20px"
      w="calc(100% / 4 - 30px)"
      gap="20px"
      alignItems="center"
      boxShadow="0 1px 2px rgba(0, 0, 0, .16)"
      borderRadius="4px"
    >
      <Image boxSize="32px" src={icon} alt={name} />
      <Flex flexDir="column">
        <Flex>{name}</Flex>
        <Flex>{amount}</Flex>
      </Flex>
    </Flex>
  );
};

const ReserveItemsList = ({
  data,
  filterBy,
}: {
  data: IReserveItem[];
  filterBy?: string;
}) => {
  const processedData = useMemo(() => {
    if (filterBy) {
      return data.filter((item) => item.type.includes(filterBy));
    }

    return data;
  }, [data, filterBy]);

  return (
    <Flex flexWrap="wrap" gap="30px">
      {processedData.map(({ id, name, amount, icon }) => (
        <ReserveItem key={id} name={name} amount={amount} icon={icon} />
      ))}
    </Flex>
  );
};

const CryptoReserves = () => {
  const { prepareTokens } = useTokens();
  const { prepareTags } = useGetTags();
  const categories = useMemo(() => prepareTags(), [prepareTags]);
  const tokens = useMemo(() => prepareTokens(), [prepareTokens]);

  return (
    <Container as="section" maxW="container.xl" py="44px">
      <Heading
        as="h2"
        fontSize="26px"
        fontWeight={600}
        lineHeight="120%"
        color="#212121"
        mb="10px"
      >
        Резервы
      </Heading>
      <Tabs variant="unstyled">
        <TabList gap="8px" mb="16px">
          <Tab>all</Tab>
          {categories.map((item, i) => (
            <Tab key={i}>{item}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <ReserveItemsList data={tokens} />
          </TabPanel>
          {categories.map((item, i) => (
            <TabPanel key={i}>
              <ReserveItemsList data={tokens} filterBy={item} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export { CryptoReserves };
