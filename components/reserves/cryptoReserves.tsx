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

interface ReserveItem {
  id: string;
  name: string;
  icon: string;
  amount: number;
  type: string[];
}

const MockData = Array.from({ length: 34 }).map<ReserveItem>((_, i) => ({
  id: i.toString(),
  name: "Bitcoin",
  amount: 12342142.3123,
  icon: "/btc.svg",
  type: ["USD"],
}));

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

const ReserveItemsList = ({ data }: { data: ReserveItem[] }) => (
  <Flex flexWrap="wrap" gap="30px">
    {data.map(({ id, name, amount, icon }) => (
      <ReserveItem key={id} name={name} amount={amount} icon={icon} />
    ))}
  </Flex>
);

const CryptoReserves = () => {
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
        <TabList gap="8px">
          <Tab>All</Tab>
          <Tab>RUB</Tab>
          <Tab>USD</Tab>
          <Tab>EUR</Tab>
          <Tab>CRYPTO</Tab>
          <Tab>DeFI</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ReserveItemsList data={MockData} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export { CryptoReserves };
