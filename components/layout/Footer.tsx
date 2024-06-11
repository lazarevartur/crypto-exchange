"use client";
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { LINKS_HEADER } from "@/constants";

const Footer = () => {
  return (
    <Box bgColor="#0f0965">
      <Container
        py="75px"
        display="flex"
        h="268px"
        maxW="container.xl"
        gap='50px'
        color="white"
        alignItems="center"
      >
        <Flex flexDir="column" gap="20px">
          <Link href="/">
            <Image src="/foot-logo.svg" alt="logo" />
          </Link>
          <Text w="250px" fontSize="14px" fontWeight={400} lineHeight="120%">
            Самый реактивный обменник. Быстрый и безопасный способ обменять
            более 20 популярных криптовалют
          </Text>
        </Flex>
        <Flex gap="20px">
          {LINKS_HEADER.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              fontSize="16px"
              fontWeight={500}
              lineHeight="120%"
              _hover={{
                textDecoration: "none",
                opacity: 0.7,
              }}
            >
              {title}
            </Link>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export { Footer };
