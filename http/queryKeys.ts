import { usePaymentById } from "@/http/query/payment";
import {useCreatePayment} from "@/http/mutation/paymentMutation";

export const queryKeys = {
  useTokens: "useTokens",
  useGetTags: "useGetTags",
  usePaymentById: "usePaymentById",
  useCreatePayment: 'useCreatePayment',
  updatePaymentStatus: 'updatePaymentStatus',
};
