// app/api/payment/route.ts
import { NextResponse } from "next/server";
import { sign, decode, verify, JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import dayjs from 'dayjs';

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
});

export async function POST(req: NextRequest) {
  try {
    const result = PaymentDataSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input data", errors: result.error.errors }, { status: 400 });
    }

    const data = result.data;
    const token = req.cookies.get("token")?.value;

    const ttl = dayjs().add(15, 'minute').toDate();  // Установка TTL на 15 минут вперед

    if (!token) {
      // Создаем нового пользователя и генерируем токен
      const user = await prisma.user.create({
        data: {
          payments: {
            create: [{
              fromToken: data.from.tokenNameOrId,
              fromAmount: data.from.amount,
              toToken: data.to.tokenNameOrId,
              toAmount: data.to.amount,
              recipientAddress: data.recipient.address,
              recipientEmail: data.recipient.email,
              ttl: ttl,
            }],
          },
        },
      });

      const token = sign({ userId: user.id }, secret, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({ message: "User created and payment added", user });
      response.headers.append(
          "Set-Cookie",
          serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
          })
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
          return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        await prisma.payment.create({
          data: {
            fromToken: data.from.tokenNameOrId,
            fromAmount: data.from.amount,
            toToken: data.to.tokenNameOrId,
            toAmount: data.to.amount,
            recipientAddress: data.recipient.address,
            recipientEmail: data.recipient.email,
            ttl: ttl,
            user: {
              connect: { id: userId }
            }
          },
        });

        return NextResponse.json({ message: "Payment added successfully" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
      }
    }
  } catch (error) {
    console.error("Error in POST /api/payment:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    const verifyToken = verify(token, secret) as JwtPayload;

    if (verifyToken && verifyToken.userId) {
      const userId = verifyToken.userId;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { payments: true },
      });

      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "User data retrieved successfully", user });
    } else {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
  } catch (error) {
    console.error("Error in GET /api/payment:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}