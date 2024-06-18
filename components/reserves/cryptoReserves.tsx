"use client";
import {
  Container,
  Flex,
  Heading,
  Image,
  Tab as ChakraTab,
  TabList,
  TabPanel as ChakraTabPanel,
  TabPanelProps,
  TabPanels,
  TabProps,
  Tabs,
} from "@chakra-ui/react";
import { useMemo } from "react";

import { CATEGORIES } from "@/constants";
import { MockData } from "@/mock";

import type { IReserveItem } from "@/lib/types";
import { useTokens } from "@/http/query/useTokens";

const Tab = (props: TabProps) => (
  <ChakraTab
    fontSize="14px"
    color="black"
    border="2px solid"
    borderColor="#d8dadc"
    borderRadius="10px"
    boxShadow="0 1px 4px rgba(0, 0, 0, .2)"
    _hover={{ boxShadow: "0 1px 4px rgba(0, 0, 0, .5)" }}
    _selected={{ boxShadow: "none", borderColor: "#fad753" }}
    textTransform="uppercase"
    {...props}
  />
);

const TabPanel = (props: TabPanelProps) => (
  <ChakraTabPanel px="0px" {...props} />
);

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
          {CATEGORIES.map((item) => (
            <Tab key={item}>{item}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {/*<TabPanel>*/}
          {/*  <ReserveItemsList data={MockData} />*/}
          {/*</TabPanel>*/}
            <TabPanel >
              <ReserveItemsList data={tokens} />
            </TabPanel>
          {/*{CATEGORIES.map((item) => (*/}
          {/*  <TabPanel key={item}>*/}
          {/*    <ReserveItemsList data={MockData} filterBy={item} />*/}
          {/*  </TabPanel>*/}
          {/*))}*/}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export { CryptoReserves };
