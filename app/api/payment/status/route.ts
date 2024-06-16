// app/api/payment/status/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, PaymentStatus } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";
import dayjs from 'dayjs';

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "your-secret-key";

// Определение схемы данных с использованием Zod
const UpdateStatusSchema = z.object({
  paymentId: z.string().uuid(),
  status: z.enum([PaymentStatus.ACCEPTED, PaymentStatus.REJECTED]),
});

export async function POST(req: NextRequest) {
  try {
    // Проверка токена
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    let decodedToken: JwtPayload;
    try {
      decodedToken = verify(token, secret) as JwtPayload;
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    const userId = decodedToken.userId;

    // Валидация данных запроса
    const result = UpdateStatusSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input data", errors: result.error.errors }, { status: 400 });
    }

    const { paymentId, status } = result.data;

    // Получение платежа и проверка владельца и срока действия
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { user: true },
    });

    if (!payment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    if (payment.userId !== userId) {
      return NextResponse.json({ message: "Forbidden: You do not own this payment" }, { status: 403 });
    }

    if (dayjs(payment.expiresIn).isBefore(dayjs())) {
      return NextResponse.json({ message: "Payment has expired" }, { status: 400 });
    }

    // Обновление статуса платежа
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: status },
    });

    return NextResponse.json({ message: "Payment status updated successfully", payment: updatedPayment }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/payment/status:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}