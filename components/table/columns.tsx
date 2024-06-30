import { createColumnHelper } from "@tanstack/react-table";
import { AdminHistoryItem, IUserHistoryItem } from "@/lib/types/types";
import { useChangeStatusAdmin } from "@/http/mutation/tickets";
import { Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import {
  dateFormatWithTime,
  numberFormatUS,
  shortenUUID,
} from "@/app/api/_utils/utils";

const ActionButton = ({ ticketId }: { ticketId?: string }) => {
  const { mutate, isPending } = useChangeStatusAdmin();
  const onClickAcceptHandler = () => {
    if (!ticketId) return;
    mutate({ ticketId, status: "ACCEPTED" });
  };
  const onClickRejectHandler = () => {
    if (!ticketId) return;
    mutate({ ticketId, status: "REJECTED" });
  };

  return (
    <Flex gap="5px">
      <Button
        bgColor="green"
        onClick={onClickAcceptHandler}
        isLoading={isPending}
      >
        Accept
      </Button>
      <Button
        bgColor="red"
        onClick={onClickRejectHandler}
        isLoading={isPending}
      >
        Reject
      </Button>
    </Flex>
  );
};

export const adminHistoryConfigColumn = () => {
  const columnHelper = createColumnHelper<AdminHistoryItem>();

  return [
    columnHelper.accessor("ticketId", {}),
    columnHelper.accessor((data) => data, {
      id: "actionButton",
      header: "",
      cell: (info) => {
        const { ticketId, status } = info.getValue();

        if (status !== "PENDING") {
          return null;
        }

        return <ActionButton ticketId={ticketId} />;
      },
    }),
    columnHelper.accessor("tokenToPrice", {}),
    columnHelper.accessor("tokenFromPrice", {}),
    columnHelper.accessor("status", {}),
    columnHelper.accessor("createdAt", {}),
    columnHelper.accessor("closedAt", {}),
  ];
};

export const userHistoryConfigColumn = () => {
  const columnHelper = createColumnHelper<IUserHistoryItem>();

  return [
    columnHelper.accessor("ticketId", {
      header: "id",
      cell: (info) => {
        const id = info.getValue();
        const title = shortenUUID(id);

        return (
          <Tooltip label={id} aria-label="A tooltip" placement="top">
            <Text
              onClick={() => navigator.clipboard.writeText(id)}
              cursor="pointer"
            >
              {title}
            </Text>
          </Tooltip>
        );
      },
    }),
    columnHelper.accessor((data) => data, {
      header: "Отдал",
      cell: (info) => {
        const { from } = info.getValue();

        return (
          <Flex flexDir="column">
            <Text>
              {from.tokenName}: {from.amount}
            </Text>
            <Text>${numberFormatUS(from.price)}</Text>
          </Flex>
        );
      },
    }),
    columnHelper.accessor((data) => data, {
      header: "Получил",
      cell: (info) => {
        const { to } = info.getValue();

        return (
          <Flex flexDir="column">
            <Text>
              {to.tokenName}: {to.amount}
            </Text>
            <Text>${numberFormatUS(to.price)}</Text>
          </Flex>
        );
      },
    }),

    columnHelper.accessor("status", {
      header: "Статус",
    }),
    columnHelper.accessor("createdAt", {
      header: "Создано",
      cell: (info) => {
        const fromDate = dateFormatWithTime(info.getValue());

        return <Text>{fromDate}</Text>;
      },
    }),
    columnHelper.accessor("closedAt", {
      header: "Выполненно",
      cell: (info) => {
        const date = info.getValue();
        const fromDate = date ? dateFormatWithTime(date) : "—";

        return <Text>{fromDate}</Text>;
      },
    }),
  ];
};
