import { Flex } from "@chakra-ui/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import InitServerData from "@/components/init/InitServerData";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Flex flexDir="column" minHeight="100%" className={montserrat.className}>
        <Header />
        <Flex as="main" flex="1 1 auto" w="100%">
          {children}
        </Flex>
        <Footer />
      </Flex>
      <InitServerData />
    </>
  );
};

export { Layout };
