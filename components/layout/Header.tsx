"use client";

import { Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { LINKS_HEADER } from "@/constants";
import { ConnectKitButton, useModal } from "connectkit";
import { useLogin } from "@/http/mutation/auth";
import { cryptoChangeService } from "@/http/services";
import { useConfig } from "@/state/config";

const Header = () => {
  const { mutate } = useLogin();
  const { setIsAuth } = useConfig();

  useModal({
    onConnect: ({ address }) => {
      if (address) {
        mutate(address);
        setIsAuth(true);
      }
    },
    onDisconnect: () => {
      (async () => {
        await cryptoChangeService.logout();
        setIsAuth(false);
        window.location.reload();
      })();
    },
  });

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

      <ConnectKitButton theme="soft" />
    </Container>
  );
};

export { Header };
