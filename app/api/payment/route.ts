// app/api/payment/route.ts
import { NextResponse } from "next/server";
import { sign, decode, verify, JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "your-secret-key";

interface PaymentData {
  from: {
    tokenNameOrId: string;
    amount: string;
  };
  to: {
    tokenNameOrId: string;
    amount: string;
  };
  recipient: {
    address: string;
    email: string;
  };
}

// Обработка POST запросов для создания пользователя и платежей
export async function POST(req: NextRequest) {
  try {
    const data: PaymentData = await req.json();

    if (!data || !data.from || !data.to || !data.recipient ||
        !data.from.tokenNameOrId || !data.from.amount ||
        !data.to.tokenNameOrId || !data.to.amount ||
        !data.recipient.address || !data.recipient.email) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const token = req.cookies.get("token")?.value;

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
              recipientEmail: data.recipient.email
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
            userId,
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

// Обработка GET запросов для проверки пользователя и получения его платежей
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