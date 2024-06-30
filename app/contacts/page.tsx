import { Container, Flex, Heading, Text } from "@chakra-ui/react";

export default function ContactPage() {
  return (
    <Container
      as="section"
      maxW="container.xl"
      py="44px"
      display="flex"
      flexDir="column"
      gap="24px"
    >
      <Heading
        textAlign="center"
        as="h2"
        fontSize="26px"
        fontWeight={600}
        lineHeight="120%"
        color="#212121"
        mb="10px"
      >
        Контакты
      </Heading>
      <Flex gap="12px" flexDirection="column">
        <Text fontWeight={600}>Для рекламы и сотрудничества:</Text>
        <Text color="#fcbf11" fontWeight={600}>
          partners@cosmochanger.cc
        </Text>
        <Text fontWeight={600}>Поддержка по почте:</Text>
        <Text color="#fcbf11" fontWeight={600}>
          support@cosmochanger.cc
        </Text>
        <Text fontWeight={600}>Резервная почта:</Text>
        <Text color="#fcbf11" fontWeight={600}>
          reservecosmochanger@protonmail.com
        </Text>
        <Text fontWeight={600}>Для рекламы и сотрудничества:</Text>
        <Text color="#fcbf11" fontWeight={600}>
          partners@cosmochanger.cc
        </Text>
        <Text fontWeight={600}>Для рекламы и сотрудничества:</Text>
        <Text color="#fcbf11" fontWeight={600}>
          partners@cosmochanger.cc
        </Text>
      </Flex>
    </Container>
  );
}
