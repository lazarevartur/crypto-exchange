// app/api/payments/status/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, PaymentStatus } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import { authenticateUser } from "@/app/api/_utils/utils";

const prisma = new PrismaClient();

// Определение схемы данных с использованием Zod
const UpdateStatusSchema = z.object({
  paymentId: z.string().uuid(),
  status: z.enum([PaymentStatus.ACCEPTED, PaymentStatus.REJECTED]),
});

export async function POST(req: NextRequest) {
  try {
    const { userId, error } = authenticateUser(req);

    if (error) {
      return error;
    }

    // Валидация данных запроса
    const result = UpdateStatusSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.errors },
        { status: 400 },
      );
    }

    const { paymentId, status } = result.data;

    // Получение платежа и проверка владельца и срока действия
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { user: true },
    });

    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 },
      );
    }

    if (payment.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden: You do not own this payments" },
        { status: 403 },
      );
    }

    // Обновление статуса платежа
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: status },
    });

    return NextResponse.json(updatedPayment, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/payments/status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
