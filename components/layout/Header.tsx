"use client";

import { Button, Container, Flex, Icon, Image } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import {LINKS_HEADER} from "@/constants";

const Header = () => {
  return (
    <Container
      as="header"
      h="76px"
      display="flex"
      maxW="container.xl"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex gap="20px" alignItems="center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" />
        </Link>
        <Flex gap="20px">
          {LINKS_HEADER.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              fontSize="16px"
              fontWeight={500}
              lineHeight="120%"
              color="#212121"
              _hover={{
                textDecoration: "none",
                opacity: 0.7,
              }}
            >
              {title}
            </Link>
          ))}
        </Flex>
      </Flex>
      <Button variant="outline">Wallet Connect</Button>
    </Container>
  );
};

export { Header };
