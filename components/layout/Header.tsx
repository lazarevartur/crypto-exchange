"use client";

import { Button, Flex, Icon, Image } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

const links = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Правила",
    href: "/rules",
  },
  {
    title: "Контакты",
    href: "/contacts",
  },
];

const Header = () => {
  return (
    <Flex
      as="header"
      h="76px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gap="20px" alignItems="center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" />
        </Link>
        <Flex gap="20px">
          {links.map(({ href, title }) => (
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
      <Flex>
        <Button variant="outline">Wallet Connect</Button>
      </Flex>
    </Flex>
  );
};

export { Header };
