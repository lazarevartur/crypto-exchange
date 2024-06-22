import { Container, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { Tab, TabPanel } from "@/components/tabs";
import { Tickets } from "@/components/admin/tickets";

export default function ContactPage() {
  return (
    <Container
      as="section"
      maxW="80%"
      py="44px"
      display="flex"
      flexDir="column"
    >
      <Tabs variant="unstyled">
        <TabList gap="8px" mb="16px">
          <Tab>Тикеты</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tickets />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
