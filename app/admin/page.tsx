"use client";
import { Container, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { Tab, TabPanel } from "@/components/tabs";
import { Tickets } from "@/components/admin/tickets";
import { useCheck } from "@/http/query/auth";

export default function ContactPage() {
  const { data } = useCheck();

  if (!data) {
    return null;
  }

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
