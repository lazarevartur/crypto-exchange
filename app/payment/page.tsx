import { Button, Card, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export default function PaymentPage() {
  return (
    <Container
      as="section"
      maxW="container.xl"
      py="44px"
      display="flex"
      flexDir="column"
      gap="24px"
    >
      <Flex gap="15px" fontSize="18px">
        <Text>Ожидание оплаты</Text>
        <Text fontWeight={600}> №191813 от 15.06.2024</Text>
      </Flex>
      <Flex gap="50px">
        <Card padding="16px" maxW="450px">
          <Flex
            flexDir="column"
            gap="16px"
            fontSize="18px"
            fontWeight={500}
            lineHeight="120%"
            color="#212121"
          >
            <Text>
              Вы меняете 37,21872 Binance Coin BNB на 0,33902474 Bitcoin BTC
            </Text>
            <Text>
              Получаете на:{" "}
              <Text color="#fcbf11">
                0xf45F49a56d981b05CA4d915f874693AC02044e0f
              </Text>
            </Text>
            <Text>Политика AML / KYC</Text>
            <Text fontSize="14px">
              Чтобы совершить обмен выполните следующие шаги.{" "}
              <Text fontSize="18px" color="#fcbf11">
                Фиксация курса
              </Text>
            </Text>
          </Flex>
        </Card>

        <Flex flexDir="column" gap="15px" justifyContent="center">
          <Flex alignItems="center" gap="15px">
            <Text>15:00</Text>
            <Spinner
              thickness="6px"
              speed="1s"
              emptyColor="gray.200"
              color="rgb(6, 1, 255)"
              size="xl"
            />
          </Flex>
          <Text fontSize="14px" w="150px">
            Оплатите заявку до окончания этого времени
          </Text>
        </Flex>
      </Flex>
      <Card padding="16px" maxW="700px">
        <Flex flexDir="column" gap="16px" fontSize="16px">
          <Text fontSize="18px">Внимание</Text>
          <Text>
            Уважаемый Клиент, в данном направление мы принимаем по сети BEP2 .
            Курс будет зафиксирован после получения необходимых подтверждений
            сети и зачисления на биржу. В данном направлении мы ожидаем 3
            подтверждений.
          </Text>
          <Text>
            Уважаемый Клиент, обратите внимание что, в данном направлении
            средства Вам будут отправлены по сети BTC.
          </Text>
        </Flex>
      </Card>
      <Card padding="16px" maxW="700px">
        <Flex flexDir="column" gap="16px" fontSize="16px">
          <Text>
            Для совершения обмена Вам необходимо перевести{" "}
            <Text as="span" fontWeight={600}>
              37,21872 BNB
            </Text>{" "}
            на реквизиты
          </Text>
          <Flex flexDir="column" fontSize="16px">
            <Text fontWeight={600}>Адрес получения:</Text>
            <Text color="#fcbf11" fontWeight={600}>
              bnb10tnw5g5n0gvhutyzkxweem3sxsy7xhe89f7au8
            </Text>
          </Flex>
          <Flex gap="10px">
            <Button>Я оплатил</Button>
            <Button>Отмена</Button>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
}