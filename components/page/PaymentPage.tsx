import { useRouter, useSearchParams } from "next/navigation";
import { useUpdatePaymentStatus } from "@/http/mutation/paymentMutation";
import { usePaymentById } from "@/http/query/payment";
import dayjs from "dayjs";
import { Button, Card, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import Countdown from "react-countdown";

const renderer = ({
  minutes,
  seconds,
  completed,
}: {
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    return <Text>Время вышло</Text>;
  } else {
    return (
      <Flex alignItems="center" gap="15px" justifyContent="space-evenly">
        <Text>
          {minutes}:{seconds}
        </Text>
        <Spinner
          thickness="6px"
          speed="1s"
          emptyColor="gray.200"
          color="rgb(6, 1, 255)"
          size="xl"
        />
      </Flex>
    );
  }
};

export const PaymentPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const { mutate, data: ticket, isPending } = useUpdatePaymentStatus();

  const { payment } = usePaymentById(id);
  const fromDate = dayjs(payment?.createdAt).format("DD.MM.YYYY");

  const onAcceptHandler = () => {
    id && mutate({ paymentId: id, status: "ACCEPTED" });
  };

  const onRejectHandler = () => {
    id && mutate({ paymentId: id, status: "REJECTED" });
  };

  if (!payment) {
    return null;
  }
  console.log(ticket);
  if (payment.status === "ACCEPTED" && ticket) {
    router.push(`/ticket?id=${ticket.id}`);
  }

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
        <Text fontWeight={600}>
          ID: {payment?.id} от {fromDate}
        </Text>
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
              Вы меняете {payment?.fromAmount} {payment?.fromToken?.name}{" "}
              {payment?.fromToken?.symbol} на {payment?.toAmount}{" "}
              {payment?.toToken?.name} {payment?.toToken?.symbol}
            </Text>
            <Text>
              Получаете на:{" "}
              <Text color="#fcbf11">{payment?.recipientAddress}</Text>
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
          <Countdown
            renderer={renderer}
            date={new Date(payment?.expiresIn).getTime()}
          />
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
              {payment?.fromAmount} {payment?.fromToken?.symbol}
            </Text>{" "}
            на реквизиты.
          </Text>
          <Flex flexDir="column" fontSize="16px">
            <Text fontWeight={600}>Адрес получения:</Text>
            <Text color="#fcbf11" fontWeight={600}>
              bnb10tnw5g5n0gvhutyzkxweem3sxsy7xhe89f7au8
            </Text>
          </Flex>
          <Flex gap="10px">
            <Button onClick={onAcceptHandler} isLoading={isPending}>
              Я оплатил
            </Button>
            <Button onClick={onRejectHandler} isLoading={isPending}>
              Отмена
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};