"use client";
import { Suspense } from "react";
import { PaymentPage } from "@/components/page/PaymentPage";

export default function PaymentPageWrapper() {
  return (
    <Suspense>
      <PaymentPage />
    </Suspense>
  );
}
