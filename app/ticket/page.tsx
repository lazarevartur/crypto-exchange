"use client";
import { TicketPage } from "@/components/page/TicketPage";
import { Suspense } from "react";

export default function TicketPageWrapper() {
  return (
    <Suspense>
      <TicketPage />
    </Suspense>
  );
}
