"use client";
import { useToast } from "@chakra-ui/react";
import { useAllPayments } from "@/http/query/payment";
import { useEffect } from "react";
import { Link } from "@chakra-ui/next-js";
import { useAllTickets } from "@/http/query/ticket";

export const ToastsHistory = () => {
  const { data } = useAllPayments("PENDING");
  const { data: tickets } = useAllTickets("PENDING");
  const toast = useToast();

  useEffect(() => {
    if (tickets) {
      tickets.forEach((item) => {
        toast({
          position: "bottom-left",
          title: (
            <Link href={`/ticket?id=${item.id}`}>
              Обработака Заявки: #{item.id.split("-")[0]}
            </Link>
          ),
          status: "success",
          duration: null,
          containerStyle: {
            width: "120px",
            maxWidth: "100%",
          },
        });
      });
    }

    return () => toast.closeAll();
  }, [tickets, toast]);

  useEffect(() => {
    if (data) {
      data.forEach((item) => {
        toast({
          position: "bottom-left",
          title: (
            <Link href={`/payment?id=${item.id}`}>
              Заявка: {item.id.split("-")[0]}
            </Link>
          ),
          status: "info",
          duration: null,
          containerStyle: {
            width: "120px",
            maxWidth: "100%",
          },
        });
      });
    }

    return () => toast.closeAll();
  }, [data, toast]);

  return null;
};
