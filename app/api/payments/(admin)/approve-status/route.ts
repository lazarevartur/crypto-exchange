// app/api/payments/approve-status/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, PaymentStatus } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import { authenticateUser, authorizeAdmin } from "@/app/api/_utils/utils";

const prisma = new PrismaClient();

// Определение схемы данных с использованием Zod
const UpdateApproveStatusSchema = z.object({
  paymentId: z.string().uuid(),
  approveStatus: z.enum([PaymentStatus.ACCEPTED, PaymentStatus.REJECTED]),
});

export async function POST(req: NextRequest) {
  try {
    const { userId, error: authError } = authenticateUser(req);

    if (authError) {
      return authError;
    }

    const { user, error: roleError } = await authorizeAdmin(userId);

    if (roleError) {
      return roleError;
    }

    // Валидация данных запроса
    const result = UpdateApproveStatusSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.errors },
        { status: 400 },
      );
    }

    const { paymentId, approveStatus } = result.data;

    // Получение платежа и проверка его существования
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

    // Обновление approveStatus и closedIn платежа
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        approveStatus: approveStatus,
        closedIn: new Date(), // Установка текущей даты для closedIn
      },
    });

    return NextResponse.json(
      {
        message: "Payment approveStatus updated successfully",
        payment: updatedPayment,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST /api/payments/approve-status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
