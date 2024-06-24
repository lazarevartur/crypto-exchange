import {useCheck} from "@/http/query/auth";
import {useChangeStatusAdmin} from "@/http/mutation/tickets";

export const queryKeys = {
  useTokens: "useTokens",
  useGetTags: "useGetTags",
  usePaymentById: "usePaymentById",
  useCreatePayment: "useCreatePayment",
  updatePaymentStatus: "updatePaymentStatus",
  useTicketById: "useTicketById",
  useAllPayments: "useAllPayments",
  useAllTickets: "useAllTickets",
  useLogin: "useLogin",
  useAdminAllTickets: "useAdminAllTickets",
  useCheck: "useCheck",
  useChangeStatusAdmin: "useChangeStatusAdmin",
};
