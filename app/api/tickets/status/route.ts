// app/api/admin/tickets/status/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, PaymentStatus, UserRole } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import { authenticateUser, authorizeAdmin } from "@/app/api/_utils/utils";

const prisma = new PrismaClient();

// Определение схемы данных с использованием Zod
const UpdateStatusSchema = z.object({
  ticketId: z.string(),
  status: z.enum([
    PaymentStatus.ACCEPTED,
    PaymentStatus.REJECTED,
    PaymentStatus.PENDING,
  ]),
});

export async function POST(req: NextRequest) {
  try {
    const { userId, error } = authenticateUser(req);

    if (error) {
      return error;
    }

    const { error: roleError } = await authorizeAdmin(userId);

    if (roleError) {
      return roleError;
    }

    // Валидация данных запроса
    const result = UpdateStatusSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.errors },
        { status: 400 },
      );
    }

    const { ticketId, status } = result.data;

    // Обновление статуса тикета
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: status, closedAt: new Date() },
    });

    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/admin/tickets/status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
