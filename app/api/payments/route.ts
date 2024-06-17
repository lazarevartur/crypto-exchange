// app/api/payments/route.ts
import { NextResponse } from "next/server";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";
import { PrismaClient, PaymentStatus, UserRole } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import dayjs from "dayjs";
import { authenticateUser } from "@/app/api/_utils/utils";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "your-secret-key";

// Определение схемы данных с использованием Zod
const PaymentDataSchema = z.object({
  from: z.object({
    tokenNameOrId: z.string().nonempty(),
    amount: z.string().nonempty(),
  }),
  to: z.object({
    tokenNameOrId: z.string().nonempty(),
    amount: z.string().nonempty(),
  }),
  recipient: z.object({
    address: z.string().nonempty(),
    email: z.string().email(),
  }),
  account: z.string().optional(), // добавлено поле account
});

export async function POST(req: NextRequest) {
  try {
    const result = PaymentDataSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.errors },
        { status: 400 },
      );
    }

    const data = result.data;
    const token = req.cookies.get("token")?.value;

    const expiresIn = dayjs().add(15, "minute").toDate(); // Установка expiresIn на 15 минут вперед
    const createdAt = new Date(); // Установка текущей даты для createdAt

    if (!token) {
      // Создаем нового пользователя и генерируем токен
      const user = await prisma.user.create({
        data: {
          account: data.account, // установим поле account
          createdAt: createdAt,
          role: UserRole.USER, // установим роль по умолчанию
          payments: {
            create: [
              {
                fromToken: data.from.tokenNameOrId,
                fromAmount: data.from.amount,
                toToken: data.to.tokenNameOrId,
                toAmount: data.to.amount,
                recipientAddress: data.recipient.address,
                recipientEmail: data.recipient.email,
                expiresIn: expiresIn,
                createdAt: createdAt,
                status: PaymentStatus.PENDING, // установим статус по умолчанию
                approveStatus: PaymentStatus.PENDING, // установим approveStatus по умолчанию
              },
            ],
          },
        },
      });

      const token = sign({ userId: user.id }, secret, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "User created and payments added",
        user,
      });
      response.headers.append(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        }),
      );

      return response;
    } else {
      const verifyToken = verify(token, secret) as JwtPayload;

      if (verifyToken && verifyToken.userId) {
        const userId = verifyToken.userId;
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) {
          return NextResponse.json(
            { message: "User not found" },
            { status: 404 },
          );
        }

        await prisma.payment.create({
          data: {
            fromToken: data.from.tokenNameOrId,
            fromAmount: data.from.amount,
            toToken: data.to.tokenNameOrId,
            toAmount: data.to.amount,
            recipientAddress: data.recipient.address,
            recipientEmail: data.recipient.email,
            expiresIn: expiresIn,
            createdAt: createdAt,
            status: PaymentStatus.PENDING, // установим статус по умолчанию
            approveStatus: PaymentStatus.PENDING, // установим approveStatus по умолчанию
            user: {
              connect: { id: userId },
            },
          },
        });

        return NextResponse.json(
          { message: "Payment added successfully" },
          { status: 200 },
        );
      } else {
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
      }
    }
  } catch (error) {
    console.error("Error in POST /api/payments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId, error } = authenticateUser(req);

    if (error) {
      return error;
    }

    const url = new URL(req.url);
    const statusParam = url.searchParams.get("status")?.toUpperCase();

    if (
      !statusParam ||
      !Object.values(PaymentStatus).includes(statusParam as PaymentStatus)
    ) {
      return NextResponse.json(
        { message: "Invalid status parameter" },
        { status: 400 },
      );
    }

    const status = statusParam as PaymentStatus;

    // Получение всех платежей по userId и статусу
    const payments = await prisma.payment.findMany({
      where: {
        userId: userId,
        status: status,
      },
    });

    return NextResponse.json(
      { message: "Payments retrieved successfully", payments },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in GET /api/payments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}